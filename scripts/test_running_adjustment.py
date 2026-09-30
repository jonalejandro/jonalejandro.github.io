from running_adjustment import (
    Lap, adjusted_run_pace_s_per_mile, aerobic_decoupling_percent,
    climate_speed_penalty, minetti_cost, simplified_wbgt_c,
    aerobic_efficiency_gain_index
)

def test_flat_cost():
    assert abs(minetti_cost(0.0) - 3.6) < 1e-12

def test_heat_penalty_personal_coefficient():
    assert abs(climate_speed_penalty(17.5) - 0.04) < 1e-12

def test_swbgt_monotonic_with_dewpoint():
    assert simplified_wbgt_c(25, 20) > simplified_wbgt_c(25, 10)

def test_hr_normalization_direction():
    cool = 7.5
    low_hr = Lap(600, 480, 140, 0.0)
    high_hr = Lap(600, 480, 150, 0.0)
    assert adjusted_run_pace_s_per_mile([low_hr], cool) < adjusted_run_pace_s_per_mile([high_hr], cool)

def test_decoupling_zero_for_identical_halves():
    laps = [Lap(600, 480, 145, 0.0), Lap(600, 480, 145, 0.0)]
    assert abs(aerobic_decoupling_percent(laps)) < 1e-12

def test_decoupling_positive_when_hr_rises_at_same_speed():
    laps = [Lap(600, 480, 142, 0.0), Lap(600, 480, 148, 0.0)]
    assert aerobic_decoupling_percent(laps) > 0

def test_efficiency_gain_baseline_identity():
    baseline = [743, 741, 744, 755]
    baseline_mean_speed_pace = len(baseline) / sum(1 / p for p in baseline)
    assert abs(aerobic_efficiency_gain_index(baseline_mean_speed_pace, baseline) - 100) < 1e-12

def test_faster_adjusted_pace_has_higher_efficiency_gain():
    baseline = [743, 741, 744, 755]
    assert aerobic_efficiency_gain_index(690, baseline) > aerobic_efficiency_gain_index(750, baseline)

if __name__ == "__main__":
    test_flat_cost()
    test_heat_penalty_personal_coefficient()
    test_swbgt_monotonic_with_dewpoint()
    test_hr_normalization_direction()
    test_decoupling_zero_for_identical_halves()
    test_decoupling_positive_when_hr_rises_at_same_speed()
    test_efficiency_gain_baseline_identity()
    test_faster_adjusted_pace_has_higher_efficiency_gain()
    print("running_adjustment v1.1 + secondary metrics v1.1 tests passed")
