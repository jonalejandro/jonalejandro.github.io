from running_adjustment import (
    Lap, adjusted_run_pace_s_per_mile, climate_speed_penalty,
    minetti_cost, simplified_wbgt_c
)

def test_flat_cost():
    assert abs(minetti_cost(0.0) - 3.6) < 1e-12

def test_heat_penalty_central_coefficient():
    assert abs(climate_speed_penalty(17.5) - 0.02) < 1e-12

def test_swbgt_monotonic_with_dewpoint():
    assert simplified_wbgt_c(25, 20) > simplified_wbgt_c(25, 10)

def test_hr_normalization_direction():
    cool = 7.5
    low_hr = Lap(600, 480, 140, 0.0)
    high_hr = Lap(600, 480, 150, 0.0)
    assert adjusted_run_pace_s_per_mile([low_hr], cool) < adjusted_run_pace_s_per_mile([high_hr], cool)

if __name__ == "__main__":
    test_flat_cost()
    test_heat_penalty_central_coefficient()
    test_swbgt_monotonic_with_dewpoint()
    test_hr_normalization_direction()
    print("running_adjustment v1 tests passed")
