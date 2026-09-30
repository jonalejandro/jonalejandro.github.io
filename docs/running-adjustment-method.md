---
layout: base
seo_title: "Grade + Climate 145-bpm method v1.1"
description: "Versioned methodology and constants for the running aerobic-efficiency dashboard."
---
# Grade + Climate 145-bpm method v1.1

**Version:** 1.1.0  
**Effective:** 2026-09-27  
**Purpose:** make the running adjustment reproducible while allowing an explicitly versioned athlete-specific climate calibration.

## Qualification

Use steady aerobic laps only: duration >= 600 s, average HR 140–150 bpm, and exclude the first lap. Existing session exclusions (warmup/short recording, threshold, trail, indoor, altitude/travel) remain in force.

## 1. Heart-rate normalization

For raw lap speed `v` in m/s and average lap HR `H`:

```
v_hr = v - 0.0116511339 * (H - 145)
```

The coefficient is the original fitted site calibration recovered from repository history. It remains unchanged in v1.1.

## 2. Grade normalization

Use Minetti et al. (2002), with grade `g` expressed as rise/run:

```
Cr(g) = 155.4 g^5 - 30.4 g^4 - 43.3 g^3 + 46.3 g^2 + 19.5 g + 3.6
```

Valid published range: -0.45 <= g <= +0.45. Flat cost is `Cr(0)=3.6 J/kg/m`.

At equal metabolic power:

```
v_grade = v_hr * Cr(g) / Cr(0)
```

Prefer grade from the route elevation profile over net lap ascent/descent. If the profile is unavailable, do not silently substitute net grade; mark the grade input unresolved.

## 3. Climate normalization

### Weather inputs

Use observations covering the actual run window from the nearest reliable station. Store temperature, dew point, RH, wind speed/direction, station identifier/distance, and whether the run was sun-exposed. Public pages must not expose route coordinates or precise start times.

When trustworthy measured/full WBGT is available, use it. Otherwise v1.1 uses the Australian Bureau of Meteorology simplified WBGT proxy from temperature and vapor pressure:

```
e = 6.105 * exp(17.27 * Td / (237.7 + Td))  # hPa, Td in °C
sWBGT = 0.567 * T + 0.393 * e + 3.94       # °C
```

This proxy does not fully model solar load or wind. Wind is retained for audit but still has **no independent pace coefficient**.

### Athlete-specific heat calibration

v1.0 used a marathon-specific literature prior of 0.2% speed loss per °C WBGT above 7.5°C. By September 27, enough same-location low-HR COROS observations existed to test whether that coefficient removed the temperature dependence from the athlete's adjusted pace.

The highest-confidence weather-matched observations used in the calibration were September 12, 22, 24, 26, and 27, 2026, spanning approximately 23.8–32.0°C simplified WBGT. The raw athlete-only fit was materially steeper than the v1.0 coefficient, but the sample is small and is confounded by fatigue, time of day, and route-level noise. To avoid overfitting, v1.1 uses a regularized coefficient of **0.4% speed loss per °C WBGT above 7.5°C**. This is stronger than the prior 0.2%/°C value and matches the cross-event heat slope reported by Mantzios et al. (2022), while remaining below the athlete-only unconstrained estimate.

```
if WBGT > 7.5:
    p = 0.004 * (WBGT - 7.5)
elif WBGT < 7.5:
    p = 0.001 * (7.5 - WBGT)
else:
    p = 0

v_climate = v_grade / (1 - p)
```

Do not extrapolate outside -7°C to 33°C WBGT. The 0.4%/°C coefficient is an athlete-specific regularized estimate, not a universal physiological constant. Re-fit only after materially more matched runs are available and bump the method version for any numeric change.

## 4. Run aggregation

Duration-weight the normalized speeds of qualifying laps, then convert to pace:

```
v_run = sum(v_climate_i * duration_i) / sum(duration_i)
pace_sec_per_mile = 1609.344 / v_run
```

## 5. Aerobic decoupling

The durability companion metric uses only the same chronological post-warm-up laps that pass the aerobic qualification rules, and only when at least two qualifying laps exist. Split the qualifying duration at its midpoint. For each half, calculate a Pa:HR-style efficiency factor from duration-weighted Minetti grade-normalized **observed** speed divided by duration-weighted observed HR.

```
EF_half = mean(grade_normalized_observed_speed) / mean(observed_HR)
decoupling_pct = (EF_first - EF_second) / EF_first * 100
```

Heart rate is deliberately **not** normalized to 145 bpm for this metric because the purpose is to preserve cardiac drift. A single run-window climate multiplier would affect both halves equally and cancels from the ratio. Positive values mean the second half was less efficient; negative values can occur when pacing, terrain, or a stronger finish improves the second-half ratio. The dashboard shows a 5% reference line as a practical visual guide, not a physiological threshold.

## 6. Aerobic Efficiency Gain

The second companion metric keeps heart rate fixed at the same 145-bpm target as the primary analysis and asks a simpler question: how much grade- and climate-adjusted speed is produced now relative to a fixed early baseline?

The baseline is the mean fully adjusted speed of the first four qualifying observations under v1.1.0: August 6, August 10, August 15, and August 27, 2026. Those dates are versioned in `_data/running_adjustment_v1.yml` so future runs do not move the benchmark.

```
v_baseline = mean(1609.344 / baseline_pace_sec_per_mile)
v_run = 1609.344 / adjusted_pace_sec_per_mile
efficiency_index = 100 * v_run / v_baseline
```

Baseline = 100. An index of 106 means approximately 6% more fully adjusted speed at the same 145-bpm target effort than the fixed baseline. Values below 100 mean less adjusted speed than baseline.

The public label is **Aerobic Efficiency Gain**, with the plain-language interpretation **More speed at the same HR**. This is a normalized performance index derived from the existing Grade + Climate 145-bpm pace; it is not a direct measurement of oxygen cost, metabolic efficiency, lactate threshold, or race performance. Unlike the retired fixed-pace standardized-HR chart, this metric does not extrapolate heart rate outside the 140–150 bpm calibration range.

The companion metrics have their own `secondary_metrics.version` in the YAML. Replacing standardized HR with Aerobic Efficiency Gain bumps that secondary version to 1.1.0 but does not change the numeric Grade + Climate 145-bpm v1.1.0 pace calculation.

## Versioning and missing-data rule

The canonical constants are in `_data/running_adjustment_v1.yml`; executable reference code is in `scripts/running_adjustment.py`. Both must change together.

If HR, grade profile, or required weather inputs are missing, **do not invent them**. Preserve available inputs, mark the run pending/excluded, and say exactly what is missing.

Historical points calculated under v1.0 must not be silently relabeled as v1.1. Reprocessing should occur only when the original lap and weather inputs are available.

## Research basis

- Minetti A.E. et al. (2002), *Journal of Applied Physiology* 93:1039–1046, DOI 10.1152/japplphysiol.01177.2001.
- Ely M.R. et al. (2007), *Medicine & Science in Sports & Exercise* 39:487–493, DOI 10.1249/mss.0b013e31802d3aba.
- Mantzios K. et al. (2022), *Medicine & Science in Sports & Exercise* 54:153–161, PMID 34652333. Across endurance events, performance declined about 0.4% per °C WBGT increase beyond optimal conditions; the marathon-specific estimate was about 0.2%/°C.
- Simplified WBGT follows the Australian Bureau of Meteorology approximation widely reproduced in peer-reviewed heat-stress literature.

This method intentionally favors auditability and consistency over fitting each historical run perfectly.
