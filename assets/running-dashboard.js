const RUNS = [
  { date: "2026-08-01", pace: null, included: false, status: "High-intensity session", note: "High-intensity session; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-08-02", pace: null, included: false, status: "Short high-intensity run", note: "Short high-intensity run; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-08-04", pace: null, included: false, status: "Outside aerobic HR range", note: "Outside aerobic HR range; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-08-06", pace: 743, included: true, status: "Included · v1.1.0", note: "Reprocessed under Grade + Climate 145-bpm v1.1.0 using the existing HR/grade normalization and recovered run-window weather (sWBGT ~28.9°C). No independent wind correction." },
  { date: "2026-08-07", pace: null, included: false, status: "Running fitness test", note: "Running fitness test; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-08-10", pace: 741, included: true, status: "Included · v1.1.0", note: "Reprocessed under Grade + Climate 145-bpm v1.1.0 using the existing HR/grade normalization and recovered run-window weather (sWBGT ~32.3°C). No independent wind correction." },
  { date: "2026-08-13", pace: null, included: false, status: "Threshold session", note: "Threshold session; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-08-15", pace: 744, included: true, status: "Included · v1.1.0", note: "Reprocessed under Grade + Climate 145-bpm v1.1.0 using the existing HR/grade normalization and recovered run-window weather (sWBGT ~32.2°C). No independent wind correction." },
  { date: "2026-08-17", pace: null, included: false, status: "Indoor run", note: "Indoor run; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-08-21", pace: null, included: false, status: "Threshold session", note: "Threshold session; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-08-24", pace: null, included: false, status: "Altitude / travel run", note: "Altitude / travel run; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-08-25", pace: null, included: false, status: "Altitude / travel run", note: "Altitude / travel run; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-08-27", pace: 755, included: true, status: "Included · v1.1.0", note: "Reprocessed under Grade + Climate 145-bpm v1.1.0 using the existing HR/grade normalization and recovered run-window weather (sWBGT ~31.0°C). No independent wind correction." },
  { date: "2026-08-30", pace: 784, included: true, status: "Included · v1.1.0", note: "Reprocessed under Grade + Climate 145-bpm v1.1.0 using the existing HR/grade normalization and local run-window weather (sWBGT ~30.7°C). No independent wind correction." },
  { date: "2026-08-31", pace: 758, included: true, status: "Included · v1.1.0", note: "Reprocessed under Grade + Climate 145-bpm v1.1.0 using the existing HR/grade normalization and recovered run-window weather (sWBGT ~30.9°C). No independent wind correction." },
  { date: "2026-09-02", pace: null, included: false, status: "Threshold session", note: "Threshold session; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-09-05", pace: 725, included: true, status: "Included · v1.1.0", note: "Reprocessed under Grade + Climate 145-bpm v1.1.0 using the existing HR/grade normalization and local run-window weather (sWBGT ~28.9°C). No independent wind correction." },
  { date: "2026-09-06", pace: 743, included: true, status: "Included · v1.1.0", note: "Reprocessed under Grade + Climate 145-bpm v1.1.0 using the existing HR/grade normalization and local run-window weather (sWBGT ~31.3°C). No independent wind correction." },
  { date: "2026-09-08", pace: null, included: false, status: "Threshold session", note: "Threshold session; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-09-10", pace: 732, included: true, status: "Included · v1.1.0", note: "Reprocessed under Grade + Climate 145-bpm v1.1.0 using the existing HR/grade normalization and recovered run-window weather (sWBGT ~30.6°C). No independent wind correction." },
  { date: "2026-09-12", pace: 698, included: true, status: "Included · one lap · v1.1.0", note: "One qualifying lap; reprocessed under Grade + Climate 145-bpm v1.1.0 with sWBGT ~29.3°C. Interpret cautiously. No independent wind correction." },
  { date: "2026-09-15", pace: 843, included: false, status: "Excluded observation", note: "Excluded in the source data; it does not affect the fit." },
  { date: "2026-09-17", pace: 714, included: false, status: "Short-run estimate", note: "Short-run estimate; excluded because it does not meet the qualification rules." },
  { date: "2026-09-18", pace: 763, included: true, status: "Included · one lap · v1.1.0", note: "One qualifying lap; reprocessed under Grade + Climate 145-bpm v1.1.0 with recovered run-window weather (sWBGT ~32.0°C). Interpret cautiously. No independent wind correction." },
  { date: "2026-09-19", pace: null, included: false, status: "Threshold session", note: "Threshold session; excluded under the existing session rules. Grade + Climate 145-bpm pace unavailable; no estimate substituted." },
  { date: "2026-09-20", pace: 731, included: true, status: "Included · four laps · v1.1.0", note: "Four qualifying steady aerobic laps reprocessed under Grade + Climate 145-bpm v1.1.0 with recovered run-window weather (sWBGT ~27.9°C). No independent wind correction." },
  { date: "2026-09-22", pace: 690, included: true, status: "Included · two laps · v1.1.0", note: "Two post-warmup steady aerobic laps qualified. Reprocessed from v1.0.0 to v1.1.0 using the preserved HR/Minetti grade normalization and recovered run-window weather (sWBGT ~27.6°C). Adjusted pace: 11:30/mi. No independent wind correction." },
  { date: "2026-09-24", pace: 743, included: true, status: "Included · four laps · v1.1.0", note: "Four post-warmup steady aerobic laps qualified. Reprocessed from v1.0.0 to v1.1.0 using the preserved HR/Minetti grade normalization and recovered run-window weather (sWBGT ~29.0°C). Adjusted pace: 12:23/mi. No independent wind correction." },
  { date: "2026-09-26", pace: 675, included: true, status: "Included · two laps · v1.1.0", note: "Two post-warmup steady aerobic laps qualified; strides/recoveries remained excluded. Reprocessed from v1.0.0 to v1.1.0 with sWBGT ~23.8°C. Adjusted pace: 11:15/mi. No independent wind correction." },
  { date: "2026-09-27", pace: 709, included: true, status: "Included · five laps · v1.1.0", note: "Five post-warmup steady aerobic laps qualified. Grade + Climate 145-bpm v1.1.0 used the preserved HR/grade normalization and recovered evening run-window weather (sWBGT ~32.0°C). Adjusted pace: 11:49/mi. No independent wind correction." },
  { date: "2026-09-30", pace: 699, included: true, status: "Included · three laps · v1.1.0", note: "Three post-warmup steady aerobic laps qualified. Grade + Climate 145-bpm v1.1.0 used the preserved HR normalization, FIT elevation profile for grade, and NWS Addison Airport run-window observations (sWBGT ~29.4°C). Adjusted pace: 11:39/mi. No independent wind correction." },
];

const DECOUPLING_BY_DATE = {
  "2026-08-06": { value: -6.15, laps: 2, minutes: 27.2 },
  "2026-08-10": { value: 4.49, laps: 3, minutes: 35.0 },
  "2026-08-27": { value: -2.04, laps: 2, minutes: 27.3 },
  "2026-08-30": { value: 6.64, laps: 4, minutes: 56.2 },
  "2026-08-31": { value: -2.51, laps: 2, minutes: 25.0 },
  "2026-09-05": { value: -1.35, laps: 2, minutes: 23.4 },
  "2026-09-06": { value: -1.10, laps: 4, minutes: 53.2 },
  "2026-09-10": { value: 6.21, laps: 2, minutes: 26.2 },
  "2026-09-20": { value: 4.68, laps: 4, minutes: 50.0 },
  "2026-09-22": { value: 2.39, laps: 2, minutes: 25.5 },
  "2026-09-24": { value: 5.25, laps: 4, minutes: 50.0 },
  "2026-09-26": { value: 0.60, laps: 2, minutes: 23.5 },
  "2026-09-27": { value: 3.71, laps: 5, minutes: 64.5 },
  "2026-09-30": { value: 3.49, laps: 3, minutes: 38.2 },
};

const EFFICIENCY_BASELINE_DATES = ["2026-08-06", "2026-08-10", "2026-08-15", "2026-08-27"];
const METRES_PER_MILE = 1609.344;
const WEEKS = [
  { label: "Aug 10", miles: 8.9, runs: 3 },
  { label: "Aug 17", miles: 8.8, runs: 2 },
  { label: "Aug 24", miles: 16.7, runs: 4 },
  { label: "Aug 31", miles: 12.8, runs: 4 },
  { label: "Sep 7", miles: 8.0, runs: 3 },
  { label: "Sep 14", miles: 16.6, runs: 5 },
  { label: "Sep 21", miles: 17.8, runs: 4 },
  { label: "Sep 28", miles: 4.3, runs: 1 },
  { label: "Oct 5", miles: 0.0, runs: 0, current: true },
];

const $ = (selector) => document.querySelector(selector);
const svgNS = "http://www.w3.org/2000/svg";
const dayMs = 86_400_000;
let selectedIndex = RUNS.length - 1;
let view = "all";

function dateValue(run) { return Date.parse(`${run.date}T00:00:00Z`) / dayMs; }
function formatPace(seconds) { if (!Number.isFinite(seconds)) return "—"; return `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`; }
function shortDate(date) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)); }
function longDate(date) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)); }
const EFFICIENCY_BASELINE_SPEED_MPS = (() => {
  const baselineRuns = RUNS.filter((run) => EFFICIENCY_BASELINE_DATES.includes(run.date) && run.included && Number.isFinite(run.pace));
  if (baselineRuns.length !== EFFICIENCY_BASELINE_DATES.length) return null;
  return baselineRuns.reduce((sum, run) => sum + METRES_PER_MILE / run.pace, 0) / baselineRuns.length;
})();
function efficiencyGain(run) {
  if (!run?.included || !Number.isFinite(run.pace) || !Number.isFinite(EFFICIENCY_BASELINE_SPEED_MPS)) return null;
  return (METRES_PER_MILE / run.pace) / EFFICIENCY_BASELINE_SPEED_MPS * 100;
}
function decouplingFor(run) { return run ? (DECOUPLING_BY_DATE[run.date] ?? null) : null; }
function median(values) {
  const sorted = values.filter(Number.isFinite).slice().sort((a, b) => a - b);
  if (!sorted.length) return null;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function regression(runs) {
  const points = runs.filter((run) => run.included);
  if (points.length < 3) return null;
  const meanX = points.reduce((sum, run) => sum + dateValue(run), 0) / points.length;
  const meanY = points.reduce((sum, run) => sum + run.pace, 0) / points.length;
  const sxx = points.reduce((sum, run) => sum + (dateValue(run) - meanX) ** 2, 0);
  const slope = points.reduce((sum, run) => sum + (dateValue(run) - meanX) * (run.pace - meanY), 0) / sxx;
  const intercept = meanY - slope * meanX;
  const sse = points.reduce((sum, run) => sum + (run.pace - (intercept + slope * dateValue(run))) ** 2, 0);
  const slopeSE = Math.sqrt((sse / Math.max(1, points.length - 2)) / sxx);
  // Two-sided Student-t 97.5th percentiles, indexed by residual degrees of freedom.
  const critical = [0,12.706205,4.302653,3.182446,2.776445,2.570582,2.446912,2.364624,2.306004,2.262157,2.228139,2.200985,2.178813,2.160369,2.144787,2.131450,2.119905,2.109816,2.100922,2.093024,2.085963,2.079614,2.073873,2.068658,2.063899,2.059539,2.055529,2.051831,2.048407,2.045230,2.042272];
  const df = points.length - 2;
  const z = 1.95996398454;
  const t = critical[df] ?? (z + (z**3 + z)/(4*df) + (5*z**5 + 16*z**3 + 3*z)/(96*df**2) + (3*z**7 + 19*z**5 + 17*z**3 - 15*z)/(384*df**3));
  return { slope, intercept, monthly: slope * 30.44, low: (slope - t * slopeSE) * 30.44, high: (slope + t * slopeSE) * 30.44, count: points.length, meanX, sxx, residualVariance: sse / (points.length - 2), t };
}

function recentRuns(days) {
  const latest = Math.max(...RUNS.map(dateValue));
  return RUNS.filter((run) => dateValue(run) >= latest - days);
}

const fullFit = regression(recentRuns(56));
const fourWeekFit = regression(recentRuns(28));

function trendEffect(index) {
  const run = RUNS[index];
  if (!run.included) return { label: "No effect", detail: "Excluded from the trend" };
  const without = regression(RUNS.filter((_, i) => i !== index));
  const delta = fullFit.monthly - without.monthly;
  if (Math.abs(delta) < .5) return { label: "<1 sec/mo", detail: "Nearly neutral to the fit" };
  const magnitude = Math.abs(Math.round(delta));
  return delta < 0
    ? { label: `${magnitude} sec/mo faster`, detail: `Makes the monthly trend ${magnitude} sec/mi faster` }
    : { label: `${magnitude} sec/mo slower`, detail: `Makes the monthly trend ${magnitude} sec/mi slower` };
}

function svgEl(name, attrs = {}, text = "") {
  const element = document.createElementNS(svgNS, name);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  if (text) element.textContent = text;
  return element;
}

function drawMetricChart(selector, points, options) {
  const svg = $(selector);
  if (!svg) return;
  svg.replaceChildren();
  if (!points.length) return;
  const width = 960, height = 360;
  const margin = { top: 28, right: 30, bottom: 52, left: 70 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const minX = Math.min(...RUNS.map(dateValue));
  const maxX = Math.max(...RUNS.map(dateValue));
  const x = (value) => margin.left + ((value - minX) / Math.max(1, maxX - minX)) * innerW;
  const y = (value) => margin.top + ((options.maxY - value) / (options.maxY - options.minY)) * innerH;

  if (options.band) {
    const top = y(options.band.max);
    const bottom = y(options.band.min);
    svg.append(svgEl("rect", { x: margin.left, y: top, width: innerW, height: bottom - top, class: "metric-band" }));
  }
  options.ticks.forEach((tick) => {
    svg.append(svgEl("line", { x1: margin.left, y1: y(tick), x2: width - margin.right, y2: y(tick), class: "metric-grid-line" }));
    svg.append(svgEl("text", { x: margin.left - 12, y: y(tick) + 4, "text-anchor": "end", class: "metric-axis-label" }, options.format(tick)));
  });
  if (Number.isFinite(options.guide)) {
    svg.append(svgEl("line", { x1: margin.left, y1: y(options.guide), x2: width - margin.right, y2: y(options.guide), class: "metric-reference-line" }));
  }

  const tickDates = [RUNS[4], RUNS[10], RUNS[16], RUNS[22], RUNS.at(-1)].filter(Boolean);
  tickDates.forEach((run, i) => {
    const anchor = i === 0 ? "start" : i === tickDates.length - 1 ? "end" : "middle";
    svg.append(svgEl("text", { x: x(dateValue(run)), y: height - 16, "text-anchor": anchor, class: "metric-axis-label" }, shortDate(run.date)));
  });

  const ordered = points.slice().sort((a, b) => dateValue(a.run) - dateValue(b.run));
  if (ordered.length > 1) {
    svg.append(svgEl("polyline", { points: ordered.map((p) => `${x(dateValue(p.run))},${y(p.value)}`).join(" "), class: "metric-series-line" }));
  }
  const selected = RUNS[selectedIndex];
  svg.append(svgEl("line", { x1: x(dateValue(selected)), y1: margin.top, x2: x(dateValue(selected)), y2: height - margin.bottom, class: "metric-selected-guide" }));

  ordered.forEach((point) => {
    const index = RUNS.indexOf(point.run);
    const circle = svgEl("circle", {
      cx: x(dateValue(point.run)), cy: y(point.value), r: index === selectedIndex ? 9 : 6.5,
      class: `metric-point${point.extrapolated ? " extrapolated" : ""}${index === selectedIndex ? " selected" : ""}`,
      tabindex: "0", role: "button",
      "aria-label": `${longDate(point.run.date)}, ${options.ariaValue(point.value)}${point.extrapolated ? ", extrapolated beyond the heart-rate calibration range" : ""}`
    });
    circle.append(svgEl("title", {}, `${shortDate(point.run.date)} · ${options.tooltip(point)}`));
    circle.addEventListener("click", () => selectRun(index));
    circle.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectRun(index); } });
    svg.append(circle);
  });
}

function drawSecondaryMetrics() {
  const decouplingPoints = RUNS.map((run) => ({ run, record: decouplingFor(run) }))
    .filter((p) => p.record && Number.isFinite(p.record.value))
    .map((p) => ({ run: p.run, value: p.record.value, record: p.record }));
  drawMetricChart("#decoupling-chart", decouplingPoints, {
    minY: -8, maxY: 10, ticks: [-5, 0, 5, 10], guide: 5,
    format: (v) => `${v}%`,
    ariaValue: (v) => `${v.toFixed(1)} percent aerobic decoupling`,
    tooltip: (p) => `${p.value.toFixed(1)}% decoupling · ${p.record.laps} qualifying laps`
  });

  const efficiencyPoints = RUNS.map((run) => ({ run, value: efficiencyGain(run) }))
    .filter((p) => Number.isFinite(p.value));
  drawMetricChart("#efficiency-gain-chart", efficiencyPoints, {
    minY: 94, maxY: 112, ticks: [95, 100, 105, 110], guide: 100,
    format: (v) => `${v}`,
    ariaValue: (v) => `${v.toFixed(1)} aerobic efficiency index, baseline 100`,
    tooltip: (p) => `${p.value.toFixed(1)} efficiency index · ${(p.value - 100) >= 0 ? "+" : ""}${(p.value - 100).toFixed(1)}% vs baseline`
  });
}

function drawChart() {
  const svg = $("#pace-chart");
  svg.replaceChildren();
  const width = 960, height = 430;
  const margin = { top: 30, right: 28, bottom: 58, left: 76 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const minX = Math.min(...RUNS.map(dateValue));
  const maxX = Math.max(...RUNS.map(dateValue));
  const minY = 650, maxY = 870;
  const x = (value) => margin.left + ((value - minX) / (maxX - minX)) * innerW;
  const y = (value) => margin.top + ((value - minY) / (maxY - minY)) * innerH;

  const yTicks = [660, 690, 720, 750, 780, 810, 840, 870];
  yTicks.forEach((tick) => {
    svg.append(svgEl("line", { x1: margin.left, y1: y(tick), x2: width - margin.right, y2: y(tick), class: "grid-line" }));
    svg.append(svgEl("text", { x: margin.left - 12, y: y(tick) + 4, "text-anchor": "end", class: "axis-label" }, formatPace(tick)));
  });

  const xTickIndexes = Array.from({ length: 6 }, (_, i) => Math.round(i * (RUNS.length - 1) / 5));
  xTickIndexes.forEach((index, tickIndex) => {
    const run = RUNS[index];
    const anchor = tickIndex === 0 ? "start" : tickIndex === xTickIndexes.length - 1 ? "end" : "middle";
    svg.append(svgEl("text", { x: x(dateValue(run)), y: height - 18, "text-anchor": anchor, class: "axis-label" }, shortDate(run.date)));
  });
  svg.append(svgEl("text", { x: 17, y: height / 2, transform: `rotate(-90 17 ${height / 2})`, "text-anchor": "middle", class: "axis-title" }, "pace at 145 bpm · faster ↑"));

  const trendRuns = recentRuns(56).filter((run) => run.included);
  const trendStartX = dateValue(trendRuns[0]);
  const trendEndX = dateValue(trendRuns.at(-1));
  // Pointwise 95% confidence interval for the fitted mean, not prediction intervals.
  const bandPoints = Array.from({ length: 81 }, (_, i) => {
    const day = trendStartX + (trendEndX - trendStartX) * i / 80;
    const fitted = fullFit.intercept + fullFit.slope * day;
    const halfWidth = fullFit.t * Math.sqrt(fullFit.residualVariance *
      (1 / fullFit.count + (day - fullFit.meanX) ** 2 / fullFit.sxx));
    return { day, lower: fitted - halfWidth, upper: fitted + halfWidth };
  });
  svg.append(svgEl("polygon", {
    points: [...bandPoints.map(p => [x(p.day), y(p.lower)]),
      ...bandPoints.slice().reverse().map(p => [x(p.day), y(p.upper)])]
      .map(p => p.join(",")).join(" "),
    fill: "var(--warm)", "fill-opacity": "0.16", "pointer-events": "none",
    "aria-label": "95% confidence band for the eight-week fitted mean pace"
  }));
  svg.append(svgEl("line", {
    x1: x(trendStartX), y1: y(fullFit.intercept + fullFit.slope * trendStartX),
    x2: x(trendEndX), y2: y(fullFit.intercept + fullFit.slope * trendEndX), class: "trend-line"
  }));

  const selected = RUNS[selectedIndex];
  svg.append(svgEl("line", { x1: x(dateValue(selected)), y1: margin.top, x2: x(dateValue(selected)), y2: height - margin.bottom, class: "selected-guide" }));

  RUNS.forEach((run, index) => {
    if (!Number.isFinite(run.pace)) return;
    const circle = svgEl("circle", {
      cx: x(dateValue(run)), cy: y(run.pace), r: index === selectedIndex ? 10 : 7,
      class: `chart-point ${run.included ? "included" : "excluded"}${index === selectedIndex ? " selected" : ""}${view === "trend" && !run.included ? " hidden" : ""}`,
      tabindex: view === "trend" && !run.included ? "-1" : "0", role: "button",
      "aria-label": `${longDate(run.date)}, ${formatPace(run.pace)} per mile, ${run.included ? "included in trend" : "excluded from trend"}`
    });
    circle.append(svgEl("title", {}, `${shortDate(run.date)} · ${formatPace(run.pace)}/mi · ${run.status}`));
    circle.addEventListener("click", () => selectRun(index));
    circle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectRun(index); }
    });
    svg.append(circle);
  });
}

function renderTable() {
  const body = $("#run-rows");
  body.replaceChildren();
  [...RUNS].reverse().forEach((run) => {
    const index = RUNS.indexOf(run);
    const effect = trendEffect(index);
    const row = document.createElement("tr");
    row.className = `run-row ${run.included ? "" : "excluded"}${index === selectedIndex ? " selected" : ""}`;
    row.tabIndex = 0;
    row.setAttribute("aria-label", `Inspect ${longDate(run.date)}`);
    row.innerHTML = `<td>${shortDate(run.date)}</td><td><strong>${formatPace(run.pace)}</strong>${Number.isFinite(run.pace) ? "/mi" : ""}</td><td><span class="status-mini">${run.included ? "Included" : "Excluded"}</span></td><td class="effect-cell">${effect.label}</td>`;
    row.addEventListener("click", () => selectRun(index));
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectRun(index); }
    });
    body.append(row);
  });
}

function renderInspector() {
  const run = RUNS[selectedIndex];
  const effect = trendEffect(selectedIndex);
  $("#selected-status").textContent = run.included ? "Included" : "Excluded";
  $("#selected-status").className = `status-pill${run.included ? "" : " excluded"}`;
  $("#selected-laps").textContent = run.status;
  $("#selected-date").textContent = longDate(run.date);
  $("#selected-pace").innerHTML = `${formatPace(run.pace)}${Number.isFinite(run.pace) ? "<span>/mi</span>" : "<span>Adjusted pace unavailable</span>"}`;
  $("#selected-qualification").textContent = run.included ? "Qualifying · included in trend" : `${run.status} · excluded from trend`;
  $("#selected-effect").textContent = effect.detail;
  const decoupling = decouplingFor(run);
  $("#selected-decoupling").textContent = decoupling ? `${decoupling.value.toFixed(1)}% · ${decoupling.laps} qualifying laps · ${decoupling.minutes.toFixed(1)} min` : run.included ? "Unavailable · fewer than two qualifying laps" : "Not calculated · run excluded";
  const gain = efficiencyGain(run);
  $("#selected-efficiency-gain").textContent = Number.isFinite(gain) ? `${gain.toFixed(1)} index · ${gain >= 100 ? "+" : ""}${(gain - 100).toFixed(1)}% vs baseline` : "Unavailable";
  $("#selected-note").textContent = run.note;
}

function selectRun(index) {
  selectedIndex = index;
  renderTable();
  renderInspector();
  drawChart();
  drawSecondaryMetrics();
}

function renderSummary() {
  const monthly = Math.round(fullFit.monthly);
  const latestRun = RUNS.at(-1);
  const latest = [...RUNS].reverse().find((run) => Number.isFinite(run.pace));
  const completedWeeks = WEEKS.filter((week) => !week.current);
  const recentWeeks = completedWeeks.slice(-4);
  const lastCompletedWeek = completedWeeks.at(-1);
  const average = recentWeeks.reduce((sum, week) => sum + week.miles, 0) / recentWeeks.length;
  const meaningful = fullFit.high < 0 || fullFit.low > 0;
  $("#latest-pace").innerHTML = `${formatPace(latest.pace)}<small>/mi</small>`;
  $("#latest-date").textContent = `${longDate(latest.date)} · ${latest.status}`;
  $("#trend-value").innerHTML = `${monthly < 0 ? "−" : "+"}${Math.abs(monthly)}<small> sec/mi/mo</small>`;
  $("#trend-meaning").textContent = meaningful ? "Statistically directional" : "Directionally improving · uncertainty includes flat";
  $("#weekly-total").innerHTML = `${lastCompletedWeek.miles.toFixed(1)}<small> mi</small>`;
  $("#weekly-detail").textContent = `${lastCompletedWeek.runs} runs · ${average.toFixed(1)} mi four-week average`;
  $("#fit-count").innerHTML = `${fullFit.count}<small> observations</small>`;
  $("#confidence-summary").textContent = `95% slope range: ${Math.round(fullFit.low)} to ${Math.round(fullFit.high)} sec/mi/month`;
  $("#trend-4").textContent = fourWeekFit ? `${Math.round(fourWeekFit.monthly)} sec/mo` : "Not enough data";
  $("#trend-8").textContent = `${Math.round(fullFit.monthly)} sec/mo`;
  $("#signal-label").textContent = fullFit.high < 0 ? "Improvement signal" : fullFit.low > 0 ? "Regression signal" : "Mostly weather / run-to-run noise";
  $("#data-status").textContent = `Snapshot verified · Current through ${longDate(latestRun.date)}`;
  const latestDecouplingRun = [...RUNS].reverse().find((run) => decouplingFor(run));
  const latestDecoupling = decouplingFor(latestDecouplingRun);
  $("#latest-decoupling").innerHTML = latestDecoupling ? `${latestDecoupling.value.toFixed(1)}<small>%</small>` : "—";
  $("#latest-decoupling-detail").textContent = latestDecoupling ? `${longDate(latestDecouplingRun.date)} · ${latestDecoupling.laps} qualifying laps · ${latestDecoupling.minutes.toFixed(1)} min` : "Not enough qualifying lap data";
  const decouplingMedian = median(RUNS.map((run) => decouplingFor(run)?.value).filter(Number.isFinite));
  $("#decoupling-median").innerHTML = Number.isFinite(decouplingMedian) ? `${decouplingMedian.toFixed(1)}<small>%</small>` : "—";
  const latestIncluded = [...RUNS].reverse().find((run) => run.included && Number.isFinite(run.pace));
  const latestGain = efficiencyGain(latestIncluded);
  $("#latest-efficiency-gain").innerHTML = Number.isFinite(latestGain) ? `${(latestGain - 100) >= 0 ? "+" : ""}${(latestGain - 100).toFixed(1)}<small>%</small>` : "—";
  $("#efficiency-gain-status").textContent = Number.isFinite(latestGain) ? `${longDate(latestIncluded.date)} · index ${latestGain.toFixed(1)} · baseline = 100` : "More speed at the same 145-bpm effort";
}

function renderWeekly() {
  const chart = $("#weekly-chart");
  const max = 22;
  WEEKS.forEach((week) => {
    const item = document.createElement("div");
    item.className = `week-bar${week.current ? " current" : ""}`;
    item.style.setProperty("--bar-h", `${Math.max(4, (week.miles / max) * 100)}%`);
    item.setAttribute("title", `${week.label}: ${week.miles.toFixed(1)} miles across ${week.runs} runs`);
    item.innerHTML = `<strong>${week.miles.toFixed(1)}</strong><i></i><span>${week.label}</span>`;
    chart.append(item);
  });
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    view = button.dataset.view;
    document.querySelectorAll("[data-view]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    drawChart();
  });
});

renderSummary();
renderWeekly();
renderTable();
renderInspector();
drawChart();
drawSecondaryMetrics();
