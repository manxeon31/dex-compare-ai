const initialCapabilities = [
  [
    "endpoint-telemetry",
    "Endpoint telemetry",
    "Observability",
    4,
    4,
    12,
    "Medium",
    "Documented",
    "",
    "Validate telemetry freshness, sampling, and non-OEM device fidelity."
  ],
  [
    "multi-vendor",
    "Multi-vendor / OEM-agnostic support",
    "Coverage",
    4,
    3,
    10,
    "Low",
    "Claimed",
    "",
    "HP claims broad OEM/OS coverage. Require API/demo proof."
  ],
  [
    "employee-sentiment",
    "Employee sentiment",
    "Experience",
    5,
    3,
    8,
    "Medium",
    "Demoed",
    "",
    "Compare survey methodology and weighting in experience score."
  ],
  [
    "ai-recommendations",
    "AI recommendations",
    "AI",
    4,
    4,
    10,
    "Low",
    "Claimed",
    "",
    "Validate explainability, false positives, and human approval flow."
  ],
  [
    "genai-assistant",
    "GenAI assistant",
    "AI",
    3,
    5,
    8,
    "Low",
    "Claimed",
    "",
    "Lenovo appears stronger in orchestration narrative. Needs proof."
  ],
  [
    "automated-remediation",
    "Automated remediation",
    "Automation",
    4,
    4,
    10,
    "Low",
    "Claimed",
    "",
    "Compare catalog depth, rollback, approvals, and audit logs."
  ],
  [
    "servicenow",
    "ServiceNow integration",
    "Integration",
    3,
    5,
    12,
    "Medium",
    "Demoed",
    "",
    "Validate CMDB, incident workflow, and AI Control Tower touchpoints."
  ],
  [
    "microsoft",
    "Microsoft ecosystem integration",
    "Integration",
    5,
    3,
    8,
    "Medium",
    "Documented",
    "",
    "Validate Intune, Entra, Power BI, Power Automate, and Teams workflows."
  ],
  [
    "reporting",
    "Reporting / BI",
    "Analytics",
    5,
    4,
    8,
    "Medium",
    "Documented",
    "",
    "Check Power BI/Tableau connectors and export model."
  ],
  [
    "lifecycle",
    "Hardware refresh / lifecycle",
    "Lifecycle",
    4,
    4,
    6,
    "Low",
    "Claimed",
    "",
    "Validate refresh recommendations against warranty, performance, and ticket data."
  ],
  [
    "security",
    "Security posture",
    "Security",
    4,
    4,
    5,
    "Low",
    "Claimed",
    "",
    "Compare vulnerability data, remediation paths, and policy controls."
  ],
  [
    "governance",
    "Governance / auditability",
    "Governance",
    3,
    4,
    8,
    "Low",
    "Claimed",
    "",
    "Validate approval trail, rollback records, and change governance."
  ]
].map(
  ([
    id,
    name,
    group,
    hpScore,
    lenovoScore,
    weight,
    confidence,
    evidence,
    evidenceLinks,
    notes
  ]) => ({
    id,
    name,
    group,
    hpScore,
    lenovoScore,
    weight,
    confidence,
    evidence,
    evidenceLinks,
    notes
  })
);

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
  id,
  phase,
  task,
  owner: "",
  dueDate: "",
  done: false
}));

const proofChecklist = {
  "endpoint-telemetry": [
    "Show telemetry schema and refresh rate.",
    "Validate Windows and macOS data completeness.",
    "Measure agent CPU, memory, and network overhead.",
    "Compare telemetry fidelity across HP, Lenovo, Dell, and Apple devices."
  ],
  "multi-vendor": [
    "Provide OEM parity matrix.",
    "Demo non-native device onboarding.",
    "Confirm feature gaps for Dell, Apple, and mixed Windows fleet.",
    "Validate support contract language for non-native devices."
  ],
  "employee-sentiment": [
    "Show survey methodology.",
    "Explain how sentiment affects experience score.",
    "Validate privacy and segmentation controls.",
    "Correlate sentiment with ticket and telemetry data."
  ],
  "ai-recommendations": [
    "Show root-cause explanation.",
    "Show confidence score logic.",
    "Test false-positive handling.",
    "Validate human approval workflow."
  ],
  "genai-assistant": [
    "Run natural-language admin queries live.",
    "Show guardrails and prohibited actions.",
    "Validate audit trail for generated actions.",
    "Confirm data isolation and prompt logging policy."
  ],
  "automated-remediation": [
    "Test five common issues end-to-end.",
    "Validate rollback.",
    "Validate approval workflow.",
    "Confirm ticket update after remediation."
  ],
  "servicenow": [
    "List ServiceNow tables touched.",
    "Demo incident creation and update.",
    "Validate CMDB sync.",
    "Confirm bidirectional workflow support."
  ],
  "microsoft": [
    "Demo Intune integration.",
    "Demo Entra ID mapping.",
    "Export DEX data to Power BI.",
    "Trigger workflow via Power Automate."
  ],
  "reporting": [
    "Export raw data.",
    "Schedule executive reports.",
    "Validate BI connector support.",
    "Create custom dashboard by persona or department."
  ],
  "lifecycle": [
    "Show refresh recommendation logic.",
    "Separate hardware issue from software/image issue.",
    "Include warranty and repair history.",
    "Validate recommendation against ticket history."
  ],
  "security": [
    "Show patch and firmware posture.",
    "Validate vulnerability signal source.",
    "Confirm security tool integration.",
    "Demo remediation workflow."
  ],
  "governance": [
    "Show approval history.",
    "Show role-based access control.",
    "Export audit logs.",
    "Validate rollback and change history."
  ]
};

let capabilities = load("dex-capabilities-v2", initialCapabilities);
let pocTasks = load("dex-poc-tasks-v2", initialPocTasks);

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
  localStorage.setItem("dex-capabilities-v2", JSON.stringify(capabilities));
  localStorage.setItem("dex-poc-tasks-v2", JSON.stringify(pocTasks));
}

function evidenceMultiplier(evidence) {
  if (evidence === "PoC Validated") return 1.0;
  if (evidence === "Documented") return 0.85;
  if (evidence === "Demoed") return 0.75;
  return 0.60;
}

function rawWeightedScore(vendor) {
  const totalWeight = capabilities.reduce((sum, item) => sum + Number(item.weight), 0);

  const weighted = capabilities.reduce((sum, item) => {
    const score = vendor === "hp" ? Number(item.hpScore) : Number(item.lenovoScore);
    return sum + score * Number(item.weight);
  }, 0);

  return totalWeight === 0 ? 0 : (weighted / (totalWeight * 5)) * 100;
}

function weightedScore(vendor) {
  const totalWeight = capabilities.reduce((sum, item) => sum + Number(item.weight), 0);

  const weighted = capabilities.reduce((sum, item) => {
    const score = vendor === "hp" ? Number(item.hpScore) : Number(item.lenovoScore);
    const multiplier = evidenceMultiplier(item.evidence);

    return sum + score * Number(item.weight) * multiplier;
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

function riskFlags() {
  return capabilities
    .filter((item) => Number(item.weight) >= 8 && item.evidence !== "PoC Validated")
    .map((item) => ({
      name: item.name,
      weight: item.weight,
      evidence: item.evidence,
      risk:
        item.evidence === "Claimed"
          ? "High"
          : item.evidence === "Demoed"
          ? "Medium"
          : "Low"
    }));
}

function decisionGate() {
  const highWeightClaimed = capabilities.filter(
    (item) => Number(item.weight) >= 8 && item.evidence === "Claimed"
  );

  const highWeightUnvalidated = capabilities.filter(
    (item) => Number(item.weight) >= 8 && item.evidence !== "PoC Validated"
  );

  if (highWeightClaimed.length > 0) {
    return {
      status: "No-go for final decision",
      cssClass: "status-no-go",
      reason: "High-weight capabilities are still only claimed.",
      blockers: highWeightClaimed.map((item) => item.name)
    };
  }

  if (highWeightUnvalidated.length > 0) {
    return {
      status: "Conditional go",
      cssClass: "status-conditional",
      reason: "Some high-weight capabilities still need PoC validation.",
      blockers: highWeightUnvalidated.map((item) => item.name)
    };
  }

  return {
    status: "Ready for final decision",
    cssClass: "status-ready",
    reason: "High-weight capabilities have PoC validation.",
    blockers: []
  };
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
  const hpRaw = rawWeightedScore("hp");
  const lenovoRaw = rawWeightedScore("lenovo");
  const hpAdjusted = weightedScore("hp");
  const lenovoAdjusted = weightedScore("lenovo");
  const winner = getWinner();

  document.getElementById("hpScore").textContent = hpAdjusted.toFixed(1);
  document.getElementById("lenovoScore").textContent = lenovoAdjusted.toFixed(1);

  document.getElementById("hpAverage").textContent =
    `${hpRaw.toFixed(0)}% raw weighted, average score ${averageScore("hp").toFixed(2)} / 5`;

  document.getElementById("lenovoAverage").textContent =
    `${lenovoRaw.toFixed(0)}% raw weighted, average score ${averageScore("lenovo").toFixed(2)} / 5`;

  document.getElementById("hpAdjusted").textContent =
    `Evidence-adjusted score: ${hpAdjusted.toFixed(1)}`;

  document.getElementById("lenovoAdjusted").textContent =
    `Evidence-adjusted score: ${lenovoAdjusted.toFixed(1)}`;

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
        <select onchange="updateCapability('${item.id}', 'evidence', this.value)">
          ${["Claimed", "Demoed", "Documented", "PoC Validated"]
            .map((v) => `<option ${item.evidence === v ? "selected" : ""}>${v}</option>`)
            .join("")}
        </select>
      </td>

      <td>
        <input class="evidence-links" type="text" placeholder="Paste evidence URL(s)" value="${escapeHtml(item.evidenceLinks || "")}" onchange="updateCapability('${item.id}', 'evidenceLinks', this.value)" />
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
      ${[1, 2, 3, 4, 5]
        .map((score) => `<option value="${score}" ${Number(value) === score ? "selected" : ""}>${score}</option>`)
        .join("")}
    </select>
  `;
}

function updateCapability(id, field, value) {
  capabilities = capabilities.map((item) => (item.id === id ? { ...item, [field]: value } : item));
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
      datasets: [
        {
          label: "Evidence-Adjusted Score",
          data: [hp, lenovo],
          backgroundColor: ["rgba(2,132,199,0.85)", "rgba(220,38,38,0.85)"]
        }
      ]
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
  const hpRaw = rawWeightedScore("hp");
  const lenovoRaw = rawWeightedScore("lenovo");
  const winner = getWinner();

  const winnerText = document.getElementById("winnerText");
  const gap = Math.abs(hp - lenovo).toFixed(1);

  winnerText.innerHTML =
    winner === "Too close to call"
      ? `<strong>Winner: Too close to call.</strong> The two platforms are within ${gap} evidence-adjusted points. Let PoC validation break the deadlock.`
      : `<strong>Winner: ${winner}.</strong> ${winner} currently leads based on evidence-adjusted enterprise priorities. Raw score was HP ${hpRaw.toFixed(1)} vs Lenovo ${lenovoRaw.toFixed(1)}.`;

  const gate = decisionGate();

  document.getElementById("decisionGate").innerHTML = `
    <span class="${gate.cssClass}">${gate.status}</span><br />
    <span class="muted">${gate.reason}</span>
    ${
      gate.blockers.length
        ? `<div class="line-item"><strong>Blockers:</strong> ${gate.blockers.join(", ")}</div>`
        : ""
    }
  `;

  const risks = riskFlags();

  document.getElementById("riskFlags").innerHTML = risks.length
    ? risks
        .map(
          (item) => `
            <div class="line-item">
              <span class="badge ${item.risk === "High" ? "red" : item.risk === "Medium" ? "gray" : "blue"}">${item.risk}</span>
              <strong>${item.name}</strong>
              <span class="muted">weight ${item.weight}, evidence ${item.evidence}</span>
            </div>
          `
        )
        .join("")
    : `<div class="line-item"><span class="badge green">Clean</span> All high-weight items are PoC validated.</div>`;

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
      impact: Math.abs(item.hpScore - item.lenovoScore) * item.weight * evidenceMultiplier(item.evidence),
      leader: item.hpScore > item.lenovoScore ? "HP" : item.lenovoScore > item.hpScore ? "Lenovo" : "Tie"
    }))
    .filter((item) => item.impact > 0)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 6);

  document.getElementById("tradeoffs").innerHTML = tradeoffs
    .map(
      (item) => `
      <div class="line-item">
        <span class="badge ${item.leader === "HP" ? "blue" : "red"}">${item.leader}</span>
        <strong>${item.name}</strong>
        <span class="muted">adjusted impact ${item.impact.toFixed(1)}, evidence ${item.evidence}</span>
      </div>
    `
    )
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
    .filter((item) => Number(item.weight) >= 8 && item.evidence !== "PoC Validated")
    .flatMap((item) => [
      `Capability requiring proof: "${item.name}" | Weight ${item.weight} | Evidence ${item.evidence}`,
      ...(proofChecklist[item.id] || []).map((check) => `- ${check}`)
    ]);

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

  root.innerHTML = phases
    .map((phase) => {
      const tasks = pocTasks.filter((task) => task.phase === phase);

      return `
      <div class="poc-phase">
        <h3>${phase}</h3>
        ${tasks
          .map(
            (task) => `
          <div class="poc-task">
            <input type="checkbox" ${task.done ? "checked" : ""} onchange="updatePoc('${task.id}', 'done', this.checked)" />
            <div class="${task.done ? "done" : ""}">${task.task}</div>
            <input type="text" placeholder="Owner" value="${escapeHtml(task.owner)}" onchange="updatePoc('${task.id}', 'owner', this.value)" />
            <input type="date" value="${task.dueDate}" onchange="updatePoc('${task.id}', 'dueDate', this.value)" />
          </div>
        `
          )
          .join("")}
      </div>
    `;
    })
    .join("");
}

function updatePoc(id, field, value) {
  pocTasks = pocTasks.map((task) => (task.id === id ? { ...task, [field]: value } : task));
  render();
}

function renderExport() {
  const hp = weightedScore("hp");
  const lenovo = weightedScore("lenovo");
  const winner = getWinner();
  const gate = decisionGate();

  document.getElementById("snapshot").innerHTML = `
    HP WXP adjusted: <strong>${hp.toFixed(1)}</strong> |
    Lenovo xIQ adjusted: <strong>${lenovo.toFixed(1)}</strong> |
    Winner: <strong>${winner}</strong> |
    Gate: <strong>${gate.status}</strong>
  `;
}

function exportJson() {
  const payload = {
    version: "2.0",
    generatedAt: new Date().toISOString(),
    scores: {
      hpRawWeighted: rawWeightedScore("hp"),
      lenovoRawWeighted: rawWeightedScore("lenovo"),
      hpEvidenceAdjusted: weightedScore("hp"),
      lenovoEvidenceAdjusted: weightedScore("lenovo"),
      hpAverage: averageScore("hp"),
      lenovoAverage: averageScore("lenovo"),
      winner: getWinner(),
      decisionGate: decisionGate()
    },
    capabilities,
    pocTasks
  };

  downloadFile("dex-compare-ai-v2-export.json", JSON.stringify(payload, null, 2), "application/json");
}

function exportCsv() {
  const header = [
    "Capability",
    "Group",
    "HP Score",
    "Lenovo Score",
    "Lead",
    "Weight",
    "Confidence",
    "Evidence",
    "Evidence Links",
    "Notes"
  ];

  const rows = capabilities.map((item) => [
    item.name,
    item.group,
    item.hpScore,
    item.lenovoScore,
    leadText(item),
    item.weight,
    item.confidence,
    item.evidence,
    String(item.evidenceLinks || "").replaceAll(",", ";"),
    item.notes.replaceAll(",", ";")
  ]);

  const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
  downloadFile("dex-compare-ai-v2-scorecard.csv", csv, "text/csv");
}

function importJson(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {
    try {
      const data = JSON.parse(reader.result);

      if (!Array.isArray(data.capabilities)) {
        alert("Invalid file: missing capabilities array.");
        return;
      }

      capabilities = data.capabilities;
      pocTasks = Array.isArray(data.pocTasks) ? data.pocTasks : pocTasks;

      save();
      render();

      alert("Import complete.");
    } catch (error) {
      alert("Import failed. The JSON file could not be parsed.");
    }
  };

  reader.readAsText(file);
}

function generateExecutiveReport() {
  const hp = weightedScore("hp");
  const lenovo = weightedScore("lenovo");
  const hpRaw = rawWeightedScore("hp");
  const lenovoRaw = rawWeightedScore("lenovo");
  const winner = getWinner();
  const gate = decisionGate();
  const risks = riskFlags();

  const topTradeoffs = capabilities
    .map((item) => ({
      ...item,
      impact: Math.abs(item.hpScore - item.lenovoScore) * item.weight * evidenceMultiplier(item.evidence),
      leader: item.hpScore > item.lenovoScore ? "HP" : item.lenovoScore > item.hpScore ? "Lenovo" : "Tie"
    }))
    .filter((item) => item.impact > 0)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 5);

  const report = document.getElementById("executiveReport");
  report.classList.remove("hidden");

  report.innerHTML = `
    <div class="report-title">Executive Decision Report: HP WXP vs Lenovo xIQ</div>

    <div class="report-section">
      <h4>1. Recommendation</h4>
      <p>
        Current evidence-adjusted winner: <strong>${winner}</strong>.
        HP WXP scored <strong>${hp.toFixed(1)}</strong> after evidence adjustment.
        Lenovo xIQ scored <strong>${lenovo.toFixed(1)}</strong> after evidence adjustment.
      </p>
      <p class="muted">
        Raw score before evidence discount: HP ${hpRaw.toFixed(1)} vs Lenovo ${lenovoRaw.toFixed(1)}.
      </p>
    </div>

    <div class="report-section">
      <h4>2. Decision Gate</h4>
      <p><span class="${gate.cssClass}">${gate.status}</span></p>
      <p>${gate.reason}</p>
      ${
        gate.blockers.length
          ? `<p><strong>Blockers:</strong> ${gate.blockers.join(", ")}</p>`
          : `<p>No high-weight blockers remain.</p>`
      }
    </div>

    <div class="report-section">
      <h4>3. Top Tradeoffs</h4>
      <ul>
        ${topTradeoffs
          .map(
            (item) =>
              `<li><strong>${item.leader}</strong> leads on ${item.name}. Adjusted impact ${item.impact.toFixed(
                1
              )}. Evidence: ${item.evidence}.</li>`
          )
          .join("")}
      </ul>
    </div>

    <div class="report-section">
      <h4>4. Risk Flags</h4>
      ${
        risks.length
          ? `<ul>${risks
              .map(
                (item) =>
                  `<li><strong>${item.risk}</strong>: ${item.name}, weight ${item.weight}, evidence ${item.evidence}.</li>`
              )
              .join("")}</ul>`
          : `<p>All high-weight categories are PoC validated.</p>`
      }
    </div>

    <div class="report-section">
      <h4>5. Required Next Proof</h4>
      <ul>
        ${capabilities
          .filter((item) => Number(item.weight) >= 8 && item.evidence !== "PoC Validated")
          .slice(0, 8)
          .map(
            (item) =>
              `<li><strong>${item.name}</strong>: ${proofChecklist[item.id]?.[0] || "Provide PoC proof."}</li>`
          )
          .join("")}
      </ul>
    </div>

    <div class="report-section">
      <h4>6. Bottom Line</h4>
      <p>
        Use this result as a structured negotiation and PoC control system.
        Do not make the final platform decision until high-weight claimed capabilities move to documented or PoC validated status.
      </p>
    </div>
  `;
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
