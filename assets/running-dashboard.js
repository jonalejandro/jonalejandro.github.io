const RUNS = [
  { date: "2026-07-12", pace: 747, included: false, status: "Early baseline", note: "Early baseline outside the recent trend window." },
  { date: "2026-08-06", pace: 778, included: true, status: "Included", note: "Qualifying run included in the recent fit." },
  { date: "2026-08-10", pace: 782, included: true, status: "Included", note: "Qualifying run included in the recent fit." },
  { date: "2026-08-15", pace: 785, included: true, status: "Included", note: "Qualifying run included in the recent fit." },
  { date: "2026-08-27", pace: 794, included: true, status: "Included", note: "Qualifying run included in the recent fit." },
  { date: "2026-08-30", pace: 824, included: true, status: "Included", note: "Qualifying run included in the recent fit." },
  { date: "2026-08-31", pace: 797, included: true, status: "Included", note: "Qualifying run included in the recent fit." },
  { date: "2026-09-05", pace: 759, included: true, status: "Included", note: "Qualifying run included in the recent fit." },
  { date: "2026-09-06", pace: 782, included: true, status: "Included", note: "Qualifying run included in the recent fit." },
  { date: "2026-09-10", pace: 769, included: true, status: "Included", note: "Qualifying run included in the recent fit." },
  { date: "2026-09-12", pace: 731, included: true, status: "Included · one lap", note: "One qualifying lap; interpret cautiously." },
  { date: "2026-09-15", pace: 843, included: false, status: "Excluded observation", note: "Excluded in the source data; it does not affect the fit." },
  { date: "2026-09-17", pace: 714, included: false, status: "Short-run estimate", note: "Short-run estimate; excluded because it does not meet the qualification rules." },
  { date: "2026-09-18", pace: 805, included: true, status: "Included · one lap", note: "One qualifying lap; interpret cautiously." },
  { date: "2026-09-20", pace: 763, included: true, status: "Included · four laps", note: "Four qualifying steady aerobic laps; grade, climate, and heart rate normalized to 145 bpm." },
];

const WEEKS = [
  { label: "Jul 27", miles: 4.1, runs: 2 },
  { label: "Aug 3", miles: 10.2, runs: 3 },
  { label: "Aug 10", miles: 8.9, runs: 3 },
  { label: "Aug 17", miles: 8.8, runs: 2 },
  { label: "Aug 24", miles: 16.7, runs: 4 },
  { label: "Aug 31", miles: 12.8, runs: 4 },
  { label: "Sep 7", miles: 8.0, runs: 3 },
  { label: "Sep 14", miles: 16.6, runs: 5 },
];

const $ = (selector) => document.querySelector(selector);
const svgNS = "http://www.w3.org/2000/svg";
const dayMs = 86_400_000;
let selectedIndex = RUNS.length - 1;
let view = "all";

function dateValue(run) { return Date.parse(`${run.date}T00:00:00Z`) / dayMs; }
function formatPace(seconds) { return `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`; }
function shortDate(date) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)); }
function longDate(date) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)); }

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

function drawChart() {
  const svg = $("#pace-chart");
  svg.replaceChildren();
  const width = 960, height = 430;
  const margin = { top: 30, right: 28, bottom: 58, left: 76 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const minX = Math.min(...RUNS.map(dateValue));
  const maxX = Math.max(...RUNS.map(dateValue));
  const minY = 690, maxY = 870;
  const x = (value) => margin.left + ((value - minX) / (maxX - minX)) * innerW;
  const y = (value) => margin.top + ((value - minY) / (maxY - minY)) * innerH;

  const yTicks = [690, 720, 750, 780, 810, 840, 870];
  yTicks.forEach((tick) => {
    svg.append(svgEl("line", { x1: margin.left, y1: y(tick), x2: width - margin.right, y2: y(tick), class: "grid-line" }));
    svg.append(svgEl("text", { x: margin.left - 12, y: y(tick) + 4, "text-anchor": "end", class: "axis-label" }, formatPace(tick)));
  });

  const xTickIndexes = [0, 1, 4, 7, 10, 13];
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
    row.innerHTML = `<td>${shortDate(run.date)}</td><td><strong>${formatPace(run.pace)}</strong>/mi</td><td><span class="status-mini">${run.included ? "Included" : "Excluded"}</span></td><td class="effect-cell">${effect.label}</td>`;
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
  $("#selected-pace").innerHTML = `${formatPace(run.pace)}<span>/mi</span>`;
  $("#selected-qualification").textContent = run.included ? "Qualifying · included in trend" : `${run.status} · excluded from trend`;
  $("#selected-effect").textContent = effect.detail;
  $("#selected-note").textContent = run.note;
}

function selectRun(index) {
  selectedIndex = index;
  renderTable();
  renderInspector();
  drawChart();
}

function renderSummary() {
  const monthly = Math.round(fullFit.monthly);
  const latest = RUNS.at(-1);
  const recentWeeks = WEEKS.slice(-4);
  const average = recentWeeks.reduce((sum, week) => sum + week.miles, 0) / recentWeeks.length;
  const meaningful = fullFit.high < 0 || fullFit.low > 0;
  $("#latest-pace").innerHTML = `${formatPace(latest.pace)}<small>/mi</small>`;
  $("#latest-date").textContent = `${longDate(latest.date)} · ${latest.status}`;
  $("#trend-value").innerHTML = `${monthly < 0 ? "−" : "+"}${Math.abs(monthly)}<small> sec/mi/mo</small>`;
  $("#trend-meaning").textContent = meaningful ? "Statistically directional" : "Directionally improving · uncertainty includes flat";
  $("#weekly-total").innerHTML = `${WEEKS.at(-1).miles.toFixed(1)}<small> mi</small>`;
  $("#weekly-detail").textContent = `${WEEKS.at(-1).runs} runs · ${average.toFixed(1)} mi four-week average`;
  $("#fit-count").innerHTML = `${fullFit.count}<small> observations</small>`;
  $("#confidence-summary").textContent = `95% slope range: ${Math.round(fullFit.low)} to ${Math.round(fullFit.high)} sec/mi/month`;
  $("#trend-4").textContent = fourWeekFit ? `${Math.round(fourWeekFit.monthly)} sec/mo` : "Not enough data";
  $("#trend-8").textContent = `${Math.round(fullFit.monthly)} sec/mo`;
  $("#signal-label").textContent = fullFit.high < 0 ? "Improvement signal" : fullFit.low > 0 ? "Regression signal" : "Mostly weather / run-to-run noise";
  $("#data-status").textContent = `Snapshot verified · Current through ${longDate(latest.date)}`;
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
