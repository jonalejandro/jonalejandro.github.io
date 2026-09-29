"""Versioned Grade + Climate 145-bpm adjustment.

The numeric constants are mirrored in _data/running_adjustment_v1.yml.
Do not change behavior without bumping METHOD_VERSION and the YAML version.
"""
from __future__ import annotations

from dataclasses import dataclass
from math import exp
from typing import Iterable

METHOD_VERSION = "1.1.0"
SECONDARY_METRICS_VERSION = "1.0.0"
TARGET_HR = 145.0
HR_SPEED_COEFF = 0.0116511339  # m/s per bpm
METRES_PER_MILE = 1609.344

MINETTI = (155.4, -30.4, -43.3, 46.3, 19.5, 3.6)
FLAT_COST = 3.6
GRADE_MIN, GRADE_MAX = -0.45, 0.45

VP_A, VP_B, VP_C = 6.105, 17.27, 237.7
SWBGT_T, SWBGT_E, SWBGT_INTERCEPT = 0.567, 0.393, 3.94
OPTIMAL_WBGT_C = 7.5
# v1.1 athlete-specific regularized calibration from same-location steady aerobic COROS runs.
HEAT_PENALTY_PER_C = 0.004
COLD_PENALTY_PER_C = 0.001
WBGT_MIN_C, WBGT_MAX_C = -7.0, 33.0


@dataclass(frozen=True)
class Lap:
    duration_s: float
    pace_s_per_km: float
    avg_hr_bpm: float
    grade: float


def minetti_cost(grade: float) -> float:
    if not GRADE_MIN <= grade <= GRADE_MAX:
        raise ValueError(f"grade {grade:.4f} outside validated Minetti range")
    a5, a4, a3, a2, a1, a0 = MINETTI
    return (((((a5 * grade + a4) * grade + a3) * grade + a2) * grade + a1) * grade + a0)


def vapor_pressure_hpa_from_dewpoint(dewpoint_c: float) -> float:
    return VP_A * exp(VP_B * dewpoint_c / (VP_C + dewpoint_c))


def simplified_wbgt_c(temp_c: float, dewpoint_c: float) -> float:
    e = vapor_pressure_hpa_from_dewpoint(dewpoint_c)
    return SWBGT_T * temp_c + SWBGT_E * e + SWBGT_INTERCEPT


def climate_speed_penalty(wbgt_c: float) -> float:
    if not WBGT_MIN_C <= wbgt_c <= WBGT_MAX_C:
        raise ValueError("WBGT outside v1.1 research validation range")
    if wbgt_c > OPTIMAL_WBGT_C:
        return (wbgt_c - OPTIMAL_WBGT_C) * HEAT_PENALTY_PER_C
    if wbgt_c < OPTIMAL_WBGT_C:
        return (OPTIMAL_WBGT_C - wbgt_c) * COLD_PENALTY_PER_C
    return 0.0


def normalize_lap_speed_mps(lap: Lap, wbgt_c: float) -> float:
    if lap.duration_s < 600:
        raise ValueError("lap shorter than qualification minimum")
    if not 140 <= lap.avg_hr_bpm <= 150:
        raise ValueError("lap heart rate outside qualification range")

    raw_speed = 1000.0 / lap.pace_s_per_km
    hr_speed = raw_speed - HR_SPEED_COEFF * (lap.avg_hr_bpm - TARGET_HR)

    # Same metabolic power on flat ground: P = Cr(g) * v;
    # therefore flat-equivalent v = v * Cr(g) / Cr(0).
    grade_speed = hr_speed * minetti_cost(lap.grade) / FLAT_COST

    # If heat/cold reduces observed speed by p, ideal-condition speed is v/(1-p).
    p = climate_speed_penalty(wbgt_c)
    if p >= 1.0:
        raise ValueError("invalid climate penalty")
    return grade_speed / (1.0 - p)


def adjusted_run_pace_s_per_mile(laps: Iterable[Lap], wbgt_c: float) -> float:
    laps = list(laps)
    if not laps:
        raise ValueError("at least one qualifying lap is required")
    total = sum(l.duration_s for l in laps)
    speed = sum(normalize_lap_speed_mps(l, wbgt_c) * l.duration_s for l in laps) / total
    return METRES_PER_MILE / speed


def grade_normalized_observed_speed_mps(lap: Lap) -> float:
    """Flat-equivalent observed speed, preserving the lap's measured HR."""
    raw_speed = 1000.0 / lap.pace_s_per_km
    return raw_speed * minetti_cost(lap.grade) / FLAT_COST


def aerobic_decoupling_percent(laps: Iterable[Lap]) -> float:
    """Pa:HR-style decoupling across the first and second halves by duration.

    The caller passes already-qualified post-warm-up aerobic laps in
    chronological order. A single run-level climate factor multiplies both
    halves equally, so it cancels from this within-run ratio.
    """
    laps = list(laps)
    if len(laps) < 2:
        raise ValueError("decoupling requires at least two qualifying laps")
    total = sum(l.duration_s for l in laps)
    if total <= 0:
        raise ValueError("qualifying duration must be positive")
    midpoint = total / 2.0

    def half_efficiency(start_s: float, end_s: float) -> float:
        cursor = 0.0
        speed_time = 0.0
        hr_time = 0.0
        duration = 0.0
        for lap in laps:
            lap_start, lap_end = cursor, cursor + lap.duration_s
            overlap = max(0.0, min(lap_end, end_s) - max(lap_start, start_s))
            if overlap:
                speed_time += grade_normalized_observed_speed_mps(lap) * overlap
                hr_time += lap.avg_hr_bpm * overlap
                duration += overlap
            cursor = lap_end
        if duration <= 0:
            raise ValueError("empty decoupling half")
        mean_speed = speed_time / duration
        mean_hr = hr_time / duration
        return mean_speed / mean_hr

    first = half_efficiency(0.0, midpoint)
    second = half_efficiency(midpoint, total)
    return (first - second) / first * 100.0


def standardized_hr_at_adjusted_pace(
    adjusted_pace_s_per_mile: float,
    reference_pace_s_per_mile: float = 720.0,
) -> float:
    """Derived equivalent-HR index at a fixed already-adjusted pace.

    This intentionally reuses the preserved speed-per-bpm coefficient from the
    145-bpm model. Values outside 140-150 bpm are extrapolations and must be
    labeled as such in presentation.
    """
    if adjusted_pace_s_per_mile <= 0 or reference_pace_s_per_mile <= 0:
        raise ValueError("pace must be positive")
    adjusted_speed = METRES_PER_MILE / adjusted_pace_s_per_mile
    reference_speed = METRES_PER_MILE / reference_pace_s_per_mile
    return TARGET_HR + (reference_speed - adjusted_speed) / HR_SPEED_COEFF
