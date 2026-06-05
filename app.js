const initialCapabilities = [
  ["endpoint-telemetry", "Endpoint telemetry", "Observability", 4, 4, 12, "Medium", "Validate telemetry freshness, sampling, and non-OEM device fidelity."],
  ["multi-vendor", "Multi-vendor / OEM-agnostic support", "Coverage", 4, 3, 10, "Low", "HP claims broad OEM/OS coverage. Require API/demo proof."],
  ["employee-sentiment", "Employee sentiment", "Experience", 5, 3, 8, "Medium", "Compare survey methodology and weighting in experience score."],
  ["ai-recommendations", "AI recommendations", "AI", 4, 4, 10, "Low", "Validate explainability, false positives, and human approval flow."],
  ["genai-assistant", "GenAI assistant", "AI", 3, 5, 8, "Low", "Lenovo appears stronger in orchestration narrative. Needs proof."],
  ["automated-remediation", "Automated remediation", "Automation", 4, 4, 10, "Low", "Compare catalog depth, rollback, approvals, and audit logs."],
  ["servicenow", "ServiceNow integration", "Integration", 3, 5, 12, "Medium", "Validate CMDB, incident workflow, and AI Control Tower touchpoints."],
  ["microsoft", "Microsoft ecosystem integration", "Integration", 5, 3, 8, "Medium", "Validate Intune, Entra, Power BI, Power Automate, and Teams workflows."],
  ["reporting", "Reporting / BI", "Analytics", 5, 4, 8, "Medium", "Check Power BI/Tableau connectors and export model."],
  ["lifecycle", "Hardware refresh / lifecycle", "Lifecycle", 4, 4, 6, "Low", "Validate refresh recommendations against warranty, performance, and ticket data."],
  ["security", "Security posture", "Security", 4, 4, 5, "Low", "Compare vulnerability data, remediation paths, and policy controls."],
  ["governance", "Governance / auditability", "Governance", 3, 4, 3, "Low", "Validate approval trail, rollback records, and change governance."]
].map(([id, name, group, hpScore, lenovoScore, weight, confidence, notes]) => ({
  id, name, group, hpScore, lenovoScore, weight, confidence, notes
}));

const initialPocTasks = [
  ["deploy-agents", "Day 0–30: Foundation", "Deploy agents on ~500 mixed-vendor devices: Windows + macOS"],
  ["servicenow-cmdb", "Day 0–30: Foundation", "Stand up ServiceNow ticket / CMDB integration"],
  ["telemetry-baseline", "Day 0–30: Foundation", "Baseline telemetry ingestion and data quality"],
  ["remediation", "Day 31–60: Workflows", "Test automated remediation catalog, rollback, and approvals"],
  ["sentiment", "Day 31–60: Workflows", "Run employee sentiment survey and persona mapping"],
  ["bi", "Day 31–60: Workflows", "Validate reporting / BI dashboards and exports"],
  ["ticket-reduction", "Day 61–90: Value", "Measure helpdesk ticket reduction"],
  ["refresh", "Day 61–90: Value", "Validate hardware refresh recommendations"],
  ["roi", "Day 61–90: Value", "ROI analysis and governance / audit review"],
  ["decision", "Day 61–90: Value", "Go / no-go decision with confidence update"]
].map(([id, phase, task]) => ({
  id, phase, task, owner: "", dueDate: "", done: false
}));

let capabilities = load("dex-capabilities", initialCapabilities);
let pocTasks = load("dex-poc-tasks", initialPocTasks);

let barChart;
let radarChart;

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active-panel"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active-panel");

    render();
  });
});

function load(key, fallback) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : structuredClone(fallback);
}

function save() {
  localStorage.setItem("dex-capabilities", JSON.stringify(capabilities));
  localStorage.setItem("dex-poc-tasks", JSON.stringify(pocTasks));
}

function weightedScore(vendor) {
  const totalWeight = capabilities.reduce((sum, item) => sum + Number(item.weight), 0);
  const weighted = capabilities.reduce((sum, item) => {
    const score = vendor === "hp" ? Number(item.hpScore) : Number(item.lenovoScore);
    return sum + score * Number(item.weight);
  }, 0);

  return totalWeight === 0 ? 0 : (weighted / (totalWeight * 5)) * 100;
}

function averageScore(vendor) {
  const total = capabilities.reduce((sum, item) => {
    return sum + Number(vendor === "hp" ? item.hpScore : item.lenovoScore);
  }, 0);

  return total / capabilities.length;
}

function leadText(item) {
  const gap = Number(item.hpScore) - Number(item.lenovoScore);
  if (gap > 0) return `HP +${gap}`;
  if (gap < 0) return `Lenovo +${Math.abs(gap)}`;
  return "Tie";
}

function getWinner() {
  const hp = weightedScore("hp");
  const lenovo = weightedScore("lenovo");
  const gap = Math.abs(hp - lenovo);

  if (gap < 2) return "Too close to call";
  return hp > lenovo ? "HP WXP" : "Lenovo xIQ";
}

function render() {
  save();
  renderDashboard();
  renderCharts();
  renderInsights();
  renderQuestions();
  renderPoc();
  renderExport();
}

function renderDashboard() {
  const hp = weightedScore("hp");
  const lenovo = weightedScore("lenovo");
  const winner = getWinner();

  document.getElementById("hpScore").textContent = hp.toFixed(1);
  document.getElementById("lenovoScore").textContent = lenovo.toFixed(1);

  document.getElementById("hpAverage").textContent = `${hp.toFixed(0)}% weighted average, average score ${averageScore("hp").toFixed(2)} / 5`;
  document.getElementById("lenovoAverage").textContent = `${lenovo.toFixed(0)}% weighted average, average score ${averageScore("lenovo").toFixed(2)} / 5`;

  document.getElementById("hpBadge").classList.toggle("hidden", winner !== "HP WXP");
  document.getElementById("lenovoBadge").classList.toggle("hidden", winner !== "Lenovo xIQ");

  const tbody = document.getElementById("scoreTable");
  tbody.innerHTML = "";

  capabilities.forEach((item) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <div class="cap-name">${item.name}</div>
        <div class="cap-group">${item.group}</div>
      </td>

      <td>${scoreSelect(item.id, "hpScore", item.hpScore)}</td>
      <td>${scoreSelect(item.id, "lenovoScore", item.lenovoScore)}</td>

      <td>
        <strong class="${leadText(item).startsWith("HP") ? "hp-text" : leadText(item).startsWith("Lenovo") ? "lenovo-text" : ""}">
          ${leadText(item)}
        </strong>
      </td>

      <td>
        <input type="range" min="1" max="15" value="${item.weight}" onchange="updateCapability('${item.id}', 'weight', Number(this.value))" />
        <strong>${item.weight}</strong>
      </td>

      <td>
        <select onchange="updateCapability('${item.id}', 'confidence', this.value)">
          ${["Low", "Medium", "High"].map((v) => `<option ${item.confidence === v ? "selected" : ""}>${v}</option>`).join("")}
        </select>
      </td>

      <td>
        <input type="text" value="${escapeHtml(item.notes)}" onchange="updateCapability('${item.id}', 'notes', this.value)" />
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function scoreSelect(id, field, value) {
  return `
    <select onchange="updateCapability('${id}', '${field}', Number(this.value))">
      ${[1, 2, 3, 4, 5].map((score) => `<option value="${score}" ${Number(value) === score ? "selected" : ""}>${score}</option>`).join("")}
    </select>
  `;
}

function updateCapability(id, field, value) {
  capabilities = capabilities.map((item) => item.id === id ? { ...item, [field]: value } : item);
  render();
}

function renderCharts() {
  const hp = Number(weightedScore("hp").toFixed(1));
  const lenovo = Number(weightedScore("lenovo").toFixed(1));

  const barCtx = document.getElementById("barChart");
  const radarCtx = document.getElementById("radarChart");

  if (!barCtx || !radarCtx) return;

  if (barChart) barChart.destroy();
  if (radarChart) radarChart.destroy();

  barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["HP WXP", "Lenovo xIQ"],
      datasets: [{
        label: "Weighted Score",
        data: [hp, lenovo],
        backgroundColor: ["rgba(2,132,199,0.85)", "rgba(220,38,38,0.85)"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { min: 0, max: 100 }
      }
    }
  });

  radarChart = new Chart(radarCtx, {
    type: "radar",
    data: {
      labels: capabilities.map((item) => item.name),
      datasets: [
        {
          label: "HP WXP",
          data: capabilities.map((item) => item.hpScore),
          borderColor: "rgba(2,132,199,1)",
          backgroundColor: "rgba(2,132,199,0.22)"
        },
        {
          label: "Lenovo xIQ",
          data: capabilities.map((item) => item.lenovoScore),
          borderColor: "rgba(220,38,38,1)",
          backgroundColor: "rgba(220,38,38,0.22)"
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        r: { min: 0, max: 5, ticks: { stepSize: 1 } }
      }
    }
  });

  const heatmap = document.getElementById("heatmap");
  heatmap.innerHTML = "";

  capabilities.forEach((item) => {
    const row = document.createElement("div");
    row.className = "heat-row";

    row.innerHTML = `
      <div><strong>${item.name}</strong></div>
      <div class="heat-cell" style="background: rgba(2,132,199,${0.25 + item.hpScore * 0.13})">HP: ${item.hpScore}</div>
      <div class="heat-cell" style="background: rgba(220,38,38,${0.25 + item.lenovoScore * 0.13})">Lenovo: ${item.lenovoScore}</div>
    `;

    heatmap.appendChild(row);
  });
}

function renderInsights() {
  const hp = weightedScore("hp");
  const lenovo = weightedScore("lenovo");
  const winner = getWinner();

  const winnerText = document.getElementById("winnerText");
  const gap = Math.abs(hp - lenovo).toFixed(1);

  winnerText.innerHTML =
    winner === "Too close to call"
      ? `<strong>Winner: Too close to call.</strong> The two platforms are within ${gap} points. Treat this as a tie and let the PoC break the deadlock.`
      : `<strong>Winner: ${winner}.</strong> ${winner} currently leads based on weighted enterprise priorities.`;

  const hpLeads = capabilities.filter((item) => item.hpScore > item.lenovoScore).map((item) => item.name);
  const lenovoLeads = capabilities.filter((item) => item.lenovoScore > item.hpScore).map((item) => item.name);
  const ties = capabilities.filter((item) => item.hpScore === item.lenovoScore).map((item) => item.name);

  document.getElementById("categoryWinners").innerHTML = `
    ${insightLine("HP leads", hpLeads, "blue")}
    ${insightLine("Lenovo leads", lenovoLeads, "red")}
    ${insightLine("Tied", ties, "gray")}
  `;

  const tradeoffs = capabilities
    .map((item) => ({
      ...item,
      impact: Math.abs(item.hpScore - item.lenovoScore) * item.weight,
      leader: item.hpScore > item.lenovoScore ? "HP" : item.lenovoScore > item.hpScore ? "Lenovo" : "Tie"
    }))
    .filter((item) => item.impact > 0)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 6);

  document.getElementById("tradeoffs").innerHTML = tradeoffs
    .map((item) => `
      <div class="line-item">
        <span class="badge ${item.leader === "HP" ? "blue" : "red"}">${item.leader}</span>
        <strong>${item.name}</strong>
        <span class="muted">impact ${item.impact}, confidence ${item.confidence}</span>
      </div>
    `)
    .join("");
}

function insightLine(label, items, color) {
  return `
    <div class="line-item">
      <span class="badge ${color}">${label}</span>
      <span>${items.length ? items.join(", ") : "None"}</span>
    </div>
  `;
}

function renderQuestions() {
  const hpQuestions = [
    "Can WXP ingest telemetry from non-HP Windows and macOS devices at full fidelity?",
    "What remediation actions are available out of the box, and which require human approval?",
    "How does WXP integrate with ServiceNow CMDB and incident workflows?",
    "What data is used to calculate the Workforce Experience score, and how is sentiment weighted?",
    "Which BI connectors are supported, and what is exportable?"
  ];

  const lenovoQuestions = [
    "Is xIQ fully available standalone, or only as part of Lenovo Managed Endpoint?",
    "What ServiceNow tables, workflows, and AI Control Tower features are used?",
    "How does xIQ handle non-Lenovo endpoint telemetry and at what fidelity?",
    "What controls exist for GenAI-generated remediation actions: approval, rollback, audit?",
    "How are SaaS integrations licensed and supported?"
  ];

  const probes = capabilities
    .filter((item) => item.weight >= 8 && item.confidence !== "High")
    .map((item) => `Provide API docs, demo evidence, and customer reference for "${item.name}" with weight ${item.weight}.`);

  document.getElementById("hpQuestions").innerHTML = renderQuestionList(hpQuestions);
  document.getElementById("lenovoQuestions").innerHTML = renderQuestionList(lenovoQuestions);
  document.getElementById("probeQuestions").innerHTML = renderQuestionList(probes);
}

function renderQuestionList(questions) {
  return questions.map((q) => `<div class="question">${q}</div>`).join("");
}

function renderPoc() {
  const phases = ["Day 0–30: Foundation", "Day 31–60: Workflows", "Day 61–90: Value"];
  const root = document.getElementById("pocPlan");

  root.innerHTML = phases.map((phase) => {
    const tasks = pocTasks.filter((task) => task.phase === phase);

    return `
      <div class="poc-phase">
        <h3>${phase}</h3>
        ${tasks.map((task) => `
          <div class="poc-task">
            <input type="checkbox" ${task.done ? "checked" : ""} onchange="updatePoc('${task.id}', 'done', this.checked)" />
            <div class="${task.done ? "done" : ""}">${task.task}</div>
            <input type="text" placeholder="Owner" value="${escapeHtml(task.owner)}" onchange="updatePoc('${task.id}', 'owner', this.value)" />
            <input type="date" value="${task.dueDate}" onchange="updatePoc('${task.id}', 'dueDate', this.value)" />
          </div>
        `).join("")}
      </div>
    `;
  }).join("");
}

function updatePoc(id, field, value) {
  pocTasks = pocTasks.map((task) => task.id === id ? { ...task, [field]: value } : task);
  render();
}

function renderExport() {
  const hp = weightedScore("hp");
  const lenovo = weightedScore("lenovo");
  const winner = getWinner();

  document.getElementById("snapshot").innerHTML = `
    HP WXP: <strong>${hp.toFixed(1)}</strong> |
    Lenovo xIQ: <strong>${lenovo.toFixed(1)}</strong> |
    Winner: <strong>${winner}</strong>
  `;
}

function exportJson() {
  const payload = {
    generatedAt: new Date().toISOString(),
    scores: {
      hpWeighted: weightedScore("hp"),
      lenovoWeighted: weightedScore("lenovo"),
      hpAverage: averageScore("hp"),
      lenovoAverage: averageScore("lenovo"),
      winner: getWinner()
    },
    capabilities,
    pocTasks
  };

  downloadFile("dex-compare-ai-export.json", JSON.stringify(payload, null, 2), "application/json");
}

function exportCsv() {
  const header = ["Capability", "Group", "HP Score", "Lenovo Score", "Lead", "Weight", "Confidence", "Notes"];

  const rows = capabilities.map((item) => [
    item.name,
    item.group,
    item.hpScore,
    item.lenovoScore,
    leadText(item),
    item.weight,
    item.confidence,
    item.notes.replaceAll(",", ";")
  ]);

  const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
  downloadFile("dex-compare-ai-scorecard.csv", csv, "text/csv");
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

function resetData() {
  capabilities = structuredClone(initialCapabilities);
  pocTasks = structuredClone(initialPocTasks);
  save();
  render();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

render();
