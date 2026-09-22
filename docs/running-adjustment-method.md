## Grade + Climate 145-bpm method v1

**Version:** 1.0.0  
**Effective:** 2026-09-22  
**Purpose:** make the public running dashboard reproducible. A future update must not alter any numeric constant below without a version bump.

## Qualification

Use steady aerobic laps only: duration >= 600 s, average HR 140–150 bpm, and exclude the first lap. Existing session exclusions (warmup/short recording, threshold, trail, indoor, altitude/travel) remain in force.

## 1. Heart-rate normalization

For raw lap speed `v` in m/s and average lap HR `H`:

```
v_hr = v - 0.0116511339 * (H - 145)
```

The coefficient is the original fitted site calibration recovered from repository history. It is intentionally frozen in v1.

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

When trustworthy measured/full WBGT is available, use it. Otherwise v1 uses the Australian Bureau of Meteorology simplified WBGT proxy from temperature and vapor pressure:

```
e = 6.105 * exp(17.27 * Td / (237.7 + Td))  # hPa, Td in °C
sWBGT = 0.567 * T + 0.393 * e + 3.94       # °C
```

This proxy does not fully model solar load or wind. Wind is therefore stored for audit but has **no independent v1 pace coefficient**. Adding one without route-relative exposure would create false precision.

### Performance factor

The endurance-running literature places optimal WBGT around 7.5°C for the marathon and reports a marathon-specific heat decrement around 0.2% per °C above optimum; a smaller ~0.1%/°C cold decrement is retained below optimum.

```
if WBGT > 7.5:
    p = 0.002 * (WBGT - 7.5)
elif WBGT < 7.5:
    p = 0.001 * (7.5 - WBGT)
else:
    p = 0

v_climate = v_grade / (1 - p)
```

Do not extrapolate v1 outside -7°C to 33°C WBGT. The heat coefficient is a research-based population proxy, not an individualized causal estimate. Sensitivity checks may use 0.1%–0.6% per °C, but the public point estimate is fixed at 0.2%/°C so the time series remains reproducible.

## 4. Run aggregation

Duration-weight the normalized speeds of qualifying laps, then convert to pace:

```
v_run = sum(v_climate_i * duration_i) / sum(duration_i)
pace_sec_per_mile = 1609.344 / v_run
```

## Versioning and missing-data rule

The canonical constants are in `_data/running_adjustment_v1.yml`; executable reference code is in `scripts/running_adjustment.py`. Both must change together.

If HR, grade profile, or required weather inputs are missing, **do not invent them**. Preserve available inputs, mark the run pending/excluded, and say exactly what is missing. A formula change requires a new method version; historical values must not be silently recomputed under a new version.

## Research basis

- Minetti A.E. et al. (2002), *Journal of Applied Physiology* 93:1039–1046, DOI 10.1152/japplphysiol.01177.2001.
- Ely M.R. et al. (2007), *Medicine & Science in Sports & Exercise* 39:487–493, DOI 10.1249/mss.0b013e31802d3aba.
- Mantzios K. et al. (2022), *Medicine & Science in Sports & Exercise* 54:153–161, PMID 34652333. Their cross-event analysis found optimum endurance conditions around 7.5–15°C WBGT; marathon-specific heat decrement was ~0.2%/°C above optimum.
- Simplified WBGT follows the Australian Bureau of Meteorology approximation widely reproduced in peer-reviewed heat-stress literature.

This method intentionally favors auditability and consistency over fitting each historical run perfectly.
