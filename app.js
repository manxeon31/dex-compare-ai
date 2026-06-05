const initialCapabilities = [
  {
    id: "endpoint-telemetry",
    name: "Endpoint telemetry",
    group: "Core DEX",
    weight: 8,
    hpScore: 4,
    lenovoScore: 4,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Telemetry data source documentation",
      "Admin console screenshots",
      "Device-level sample output",
      "PoC validation result"
    ]
  },
  {
    id: "ai-recommendations",
    name: "AI recommendations",
    group: "AI / Automation",
    weight: 8,
    hpScore: 4,
    lenovoScore: 4,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Recommendation logic explanation",
      "Real workflow demo",
      "False-positive handling",
      "Admin override proof"
    ]
  },
  {
    id: "automated-remediation",
    name: "Automated remediation",
    group: "AI / Automation",
    weight: 8,
    hpScore: 4,
    lenovoScore: 4,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Before/after remediation logs",
      "Rollback behavior",
      "Approval workflow",
      "PoC test result"
    ]
  },
  {
    id: "lifecycle",
    name: "Hardware refresh / lifecycle",
    group: "Lifecycle",
    weight: 6,
    hpScore: 4,
    lenovoScore: 4,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Warranty/lifecycle integration proof",
      "Battery health data",
      "Asset aging report",
      "Refresh recommendation logic"
    ]
  },
  {
    id: "security",
    name: "Security posture",
    group: "Security",
    weight: 8,
    hpScore: 4,
    lenovoScore: 4,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Security data source",
      "Compliance mapping",
      "Policy enforcement proof",
      "Audit trail"
    ]
  },
  {
    id: "multi-vendor",
    name: "Multi-vendor / OEM-agnostic support",
    group: "Fleet Coverage",
    weight: 10,
    hpScore: 5,
    lenovoScore: 3,
    confidence: "Low",
    evidence: "Claimed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Supported OEM list",
      "API documentation",
      "Known limitations",
      "Mixed-fleet PoC result"
    ]
  },
  {
    id: "employee-sentiment",
    name: "Employee sentiment",
    group: "Experience",
    weight: 8,
    hpScore: 5,
    lenovoScore: 4,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Survey data model",
      "Sentiment scoring method",
      "Privacy model",
      "Sample dashboard"
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft ecosystem integration",
    group: "Integration",
    weight: 8,
    hpScore: 5,
    lenovoScore: 4,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Intune integration proof",
      "Entra ID / RBAC proof",
      "Microsoft Graph integration",
      "Export/reporting proof"
    ]
  },
  {
    id: "reporting",
    name: "Reporting / BI",
    group: "Analytics",
    weight: 4,
    hpScore: 5,
    lenovoScore: 4,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Export format",
      "BI connector proof",
      "Scheduled report demo",
      "Data dictionary"
    ]
  },
  {
    id: "genai-assistant",
    name: "GenAI assistant",
    group: "AI / Automation",
    weight: 8,
    hpScore: 3,
    lenovoScore: 5,
    confidence: "Low",
    evidence: "Claimed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Real workflow demo",
      "Prompt/action boundary",
      "Data access model",
      "Admin controls",
      "Audit logging"
    ]
  },
  {
    id: "servicenow",
    name: "ServiceNow integration",
    group: "Integration",
    weight: 10,
    hpScore: 3,
    lenovoScore: 5,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Ticket creation demo",
      "Ticket update demo",
      "Field mapping",
      "Integration architecture",
      "SLA impact proof"
    ]
  },
  {
    id: "governance",
    name: "Governance / auditability",
    group: "Governance",
    weight: 6,
    hpScore: 3,
    lenovoScore: 4,
    confidence: "Medium",
    evidence: "Demoed",
    evidenceLinks: "",
    notes: "",
    proofNeeded: [
      "Admin audit trail",
      "RBAC model",
      "Change history",
      "Compliance export"
    ]
  }
];

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

let capabilities = load("dex-capabilities-v3", initialCapabilities);
let pocTasks = load("dex-poc-tasks-v3", initialPocTasks);

let barChart;
let radarChart;

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active-panel"));

    button.classList.add("active");

    const panel = document.getElementById(button.dataset.tab);
    if (panel) panel.classList.add("active-panel");

    render();
  });
});

function load(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? normalizeCapabilities(JSON.parse(saved)) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function normalizeCapabilities(data) {
  if (!Array.isArray(data)) return structuredClone(initialCapabilities);

  return data.map((item) => {
    const fallback = initialCapabilities.find((x) => x.id === item.id) || {};

    return {
      ...fallback,
      ...item,
      evidenceLinks: Array.isArray(item.evidenceLinks)
        ? item.evidenceLinks.join(", ")
        : item.evidenceLinks || "",
      notes: item.notes || "",
      proofNeeded: item.proofNeeded || fallback.proofNeeded || []
    };
  });
}

function save() {
  localStorage.setItem("dex-capabilities-v3", JSON.stringify(capabilities));
  localStorage.setItem("dex-poc-tasks-v3", JSON.stringify(pocTasks));
}

function resetData() {
  localStorage.removeItem("dex-capabilities-v2");
  localStorage.removeItem("dex-poc-tasks-v2");
  localStorage.removeItem("dex-capabilities-v3");
  localStorage.removeItem("dex-poc-tasks-v3");

  capabilities = structuredClone(initialCapabilities);
  pocTasks = structuredClone(initialPocTasks);

  save();
  render();
}

const CONFIDENCE_MULTIPLIER = {
  High: 1.0,
  Medium: 0.75,
  Low: 0.45,
  Unknown: 0.25
};

const EVIDENCE_MULTIPLIER = {
  "PoC Validated": 1.0,
  Documented: 0.85,
  Demoed: 0.75,
  Claimed: 0.6,
  Missing: 0.45,
  Unknown: 0.25
};

function confidenceFactor(confidence) {
  return CONFIDENCE_MULTIPLIER[confidence] ?? CONFIDENCE_MULTIPLIER.Unknown;
}

function evidenceFactor(evidence) {
  return EVIDENCE_MULTIPLIER[evidence] ?? EVIDENCE_MULTIPLIER.Unknown;
}

function totalWeight() {
  return capabilities.reduce((sum, item) => sum + Number(item.weight || 0), 0);
}

function rawWeightedScore(vendor) {
  const weightTotal = totalWeight();

  const weighted = capabilities.reduce((sum, item) => {
    const score = vendor === "hp" ? Number(item.hpScore) : Number(item.lenovoScore);
    return sum + score * Number(item.weight);
  }, 0);

  return weightTotal === 0 ? 0 : (weighted / (weightTotal * 5)) * 100;
}

function weightedScore(vendor) {
  const weightTotal = totalWeight();

  const weighted = capabilities.reduce((sum, item) => {
    const score = vendor === "hp" ? Number(item.hpScore) : Number(item.lenovoScore);
    const multiplier = confidenceFactor(item.confidence) * evidenceFactor(item.evidence);

    return sum + score * Number(item.weight) * multiplier;
  }, 0);

  return weightTotal === 0 ? 0 : (weighted / (weightTotal * 5)) * 100;
}

function averageScore(vendor) {
  if (!capabilities.length) return 0;

  const total = capabilities.reduce((sum, item) => {
    return sum + Number(vendor === "hp" ? item.hpScore : item.lenovoScore);
  }, 0);

  return total / capabilities.length;
}

function getDecisionScores() {
  const hpRaw = rawWeightedScore("hp");
  const lenovoRaw = rawWeightedScore("lenovo");
  const hpAdjusted = weightedScore("hp");
  const lenovoAdjusted = weightedScore("lenovo");

  return {
    hpRaw,
    lenovoRaw,
    hpAdjusted,
    lenovoAdjusted,
    scoreGap: Math.abs(hpAdjusted - lenovoAdjusted),
    currentWinner:
      hpAdjusted > lenovoAdjusted
        ? "HP WXP"
        : lenovoAdjusted > hpAdjusted
          ? "Lenovo xIQ"
          : "Tie"
  };
}

function leadText(item) {
  const gap = Number(item.hpScore) - Number(item.lenovoScore);
  if (gap > 0) return `HP +${gap}`;
  if (gap < 0) return `Lenovo +${Math.abs(gap)}`;
  return "Tie";
}

function getWinner() {
  const scores = getDecisionScores();

  if (scores.scoreGap < 2) return "Too close to call";
  return scores.currentWinner;
}

function getCategoryLeader(item) {
  if (Number(item.hpScore) > Number(item.lenovoScore)) return "HP";
  if (Number(item.lenovoScore) > Number(item.hpScore)) return "Lenovo";
  return "Both vendors";
}

function hasEvidenceLink(item) {
  return String(item.evidenceLinks || "").trim().length > 0;
}

function isHighWeight(item) {
  return Number(item.weight) >= 8;
}

function getMissingEvidence() {
  return capabilities
    .filter((item) => {
      const noLinks = !hasEvidenceLink(item);
      const weakConfidence = item.confidence === "Low" || item.confidence === "Unknown";
      const weakEvidence =
        item.evidence === "Claimed" ||
        item.evidence === "Missing" ||
        item.evidence === "Unknown";

      return noLinks || weakConfidence || weakEvidence;
    })
    .map((item) => ({
      id: item.id,
      category: item.name,
      severity: isHighWeight(item) ? "Critical" : "Important",
      confidence: item.confidence,
      evidence: item.evidence,
      needed: item.proofNeeded || proofChecklist[item.id] || ["Provide documentation, demo proof, and PoC result."],
      reason: "Current score is not fully evidence-backed."
    }));
}

function getRiskFlags() {
  const scores = getDecisionScores();
  const risks = [];

  if (scores.scoreGap <= 2) {
    risks.push({
      severity: "High",
      title: "Overall score gap is too narrow",
      detail: `The adjusted score gap is only ${scores.scoreGap.toFixed(1)} points. Treat this as a tie until PoC evidence breaks the deadlock.`,
      owner: "Decision team"
    });
  }

  capabilities.forEach((item) => {
    const highWeight = isHighWeight(item);
    const lowConfidence = item.confidence === "Low" || item.confidence === "Unknown";
    const weakEvidence =
      item.evidence === "Claimed" ||
      item.evidence === "Missing" ||
      item.evidence === "Unknown";
    const tied = Number(item.hpScore) === Number(item.lenovoScore);
    const noLinks = !hasEvidenceLink(item);

    if (highWeight && lowConfidence) {
      risks.push({
        severity: "High",
        title: `Low-confidence evidence in high-weight category: ${item.name}`,
        detail: "This category has enough weight to change the final recommendation if evidence changes.",
        owner: getCategoryLeader(item)
      });
    }

    if (highWeight && weakEvidence) {
      risks.push({
        severity: "High",
        title: `Weak evidence in high-weight category: ${item.name}`,
        detail: "This score should not be treated as decision-grade until validated with documentation, demo proof, or PoC output.",
        owner: getCategoryLeader(item)
      });
    }

    if (highWeight && noLinks) {
      risks.push({
        severity: "High",
        title: `No evidence links attached: ${item.name}`,
        detail: "High-weight category has no supporting link. This creates audit risk and weakens executive defensibility.",
        owner: getCategoryLeader(item)
      });
    }

    if (tied && Number(item.weight) >= 6) {
      risks.push({
        severity: "Medium",
        title: `Tie in meaningful category: ${item.name}`,
        detail: "This category should be converted into a PoC test case instead of staying as a static score tie.",
        owner: "Both vendors"
      });
    }
  });

  return risks;
}

function getDecisionGate() {
  const scores = getDecisionScores();
  const missingEvidence = getMissingEvidence();
  const riskFlags = getRiskFlags();

  const hasCriticalMissingEvidence = missingEvidence.some((item) => item.severity === "Critical");
  const hasHighRisk = riskFlags.some((risk) => risk.severity === "High");
  const lowConfidenceHighWeight = capabilities.some((item) => {
    return isHighWeight(item) && (item.confidence === "Low" || item.confidence === "Unknown");
  });

  if (hasCriticalMissingEvidence && scores.scoreGap <= 2) {
    return {
      status: "BLOCKED",
      label: "Blocked by missing evidence",
      cssClass: "status-no-go",
      message: "Critical proof is missing and the score gap is too narrow. Do not select a vendor until missing evidence is validated."
    };
  }

  if (scores.scoreGap <= 2 || lowConfidenceHighWeight) {
    return {
      status: "POC_REQUIRED",
      label: "PoC required",
      cssClass: "status-conditional",
      message: "The platforms are too close or key categories have low-confidence evidence. Run targeted validation before final selection."
    };
  }

  if (hasHighRisk) {
    return {
      status: "EXEC_REVIEW",
      label: "Executive review required",
      cssClass: "status-conditional",
      message: "One or more high-risk areas may materially change the recommendation. Leadership review is required before vendor selection."
    };
  }

  return {
    status: "READY",
    label: "Ready to select",
    cssClass: "status-ready",
    message: "Evidence quality is sufficient and the adjusted score gap is meaningful enough to support a recommendation."
  };
}

function getSuggestedNextSteps() {
  const gate = getDecisionGate();
  const risks = getRiskFlags();
  const missing = getMissingEvidence();
  const criticalEvidence = missing.filter((item) => item.severity === "Critical");
  const highRisks = risks.filter((risk) => risk.severity === "High");

  const steps = [];

  if (gate.status === "POC_REQUIRED" || gate.status === "BLOCKED") {
    steps.push({
      priority: "P0",
      title: "Run PoC tests for tied high-impact categories",
      detail: "Convert Endpoint telemetry, AI recommendations, Automated remediation, Hardware refresh / lifecycle, and Security posture into measurable PoC test cases."
    });
  }

  if (criticalEvidence.length > 0) {
    steps.push({
      priority: "P0",
      title: "Collect critical missing evidence",
      detail: `Validate ${criticalEvidence.map((item) => item.category).join(", ")} with official docs, admin screenshots, API proof, demo recordings, or PoC output.`
    });
  }

  if (highRisks.length > 0) {
    steps.push({
      priority: "P1",
      title: "Resolve high-risk decision flags",
      detail: "Focus on the risks that could flip the winner: narrow score gap, low-confidence GenAI claims, multi-vendor support proof, and ServiceNow integration proof."
    });
  }

  steps.push({
    priority: "P1",
    title: "Add evidence links to every high-weight category",
    detail: "Every category with weight 8 or higher should have at least one evidence link before it counts as decision-grade."
  });

  steps.push({
    priority: "P2",
    title: "Update confidence after PoC",
    detail: "Move confidence from Low or Medium to High only when the vendor proves the workflow with real devices, real admin controls, and real output."
  });

  steps.push({
    priority: "P2",
    title: "Generate executive report after gate improves",
    detail: "Use the executive report after the gate moves from Blocked or PoC Required to Ready or Executive Review."
  });

  return steps;
}

function getWinnerFlipSensitivity() {
  const scores = getDecisionScores();

  const flipCandidates = capabilities
    .map((item) => {
      const onePointImpact =
        ((Number(item.weight) * confidenceFactor(item.confidence) * evidenceFactor(item.evidence)) /
          (totalWeight() * 5)) *
        100;

      return {
        category: item.name,
        onePointImpact: Number(onePointImpact.toFixed(2)),
        leader: getCategoryLeader(item),
        reason: "A one-point score movement in this category could change or erase the recommendation."
      };
    })
    .filter((item) => item.onePointImpact >= scores.scoreGap * 0.5)
    .sort((a, b) => b.onePointImpact - a.onePointImpact)
    .slice(0, 8);

  return {
    currentWinner: getWinner(),
    scoreGap: Number(scores.scoreGap.toFixed(2)),
    flipCandidates
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
  const scores = getDecisionScores();
  const winner = getWinner();

  setText("hpScore", scores.hpAdjusted.toFixed(1));
  setText("lenovoScore", scores.lenovoAdjusted.toFixed(1));

  setText("hpAverage", `${scores.hpRaw.toFixed(0)}% raw weighted, average score ${averageScore("hp").toFixed(2)} / 5`);
  setText("lenovoAverage", `${scores.lenovoRaw.toFixed(0)}% raw weighted, average score ${averageScore("lenovo").toFixed(2)} / 5`);

  setText("hpAdjusted", `Evidence-adjusted score: ${scores.hpAdjusted.toFixed(1)}`);
  setText("lenovoAdjusted", `Evidence-adjusted score: ${scores.lenovoAdjusted.toFixed(1)}`);

  toggleHidden("hpBadge", winner !== "HP WXP");
  toggleHidden("lenovoBadge", winner !== "Lenovo xIQ");

  const tbody = document.getElementById("scoreTable");
  if (!tbody) return;

  tbody.innerHTML = "";

  capabilities.forEach((item) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <div class="cap-name">${escapeHtml(item.name)}</div>
        <div class="cap-group">${escapeHtml(item.group)}</div>
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
          ${["Low", "Medium", "High"].map((v) => `<option value="${v}" ${item.confidence === v ? "selected" : ""}>${v}</option>`).join("")}
        </select>
      </td>

      <td>
        <select onchange="updateCapability('${item.id}', 'evidence', this.value)">
          ${["Claimed", "Demoed", "Documented", "PoC Validated"]
            .map((v) => `<option value="${v}" ${item.evidence === v ? "selected" : ""}>${v}</option>`)
            .join("")}
        </select>
      </td>

      <td>
        <input class="evidence-links" type="text" placeholder="Paste evidence URL(s)" value="${escapeHtml(item.evidenceLinks || "")}" onchange="updateCapability('${item.id}', 'evidenceLinks', this.value)" />
      </td>

      <td>
        <input type="text" value="${escapeHtml(item.notes || "")}" onchange="updateCapability('${item.id}', 'notes', this.value)" />
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

  if (!barCtx || !radarCtx || typeof Chart === "undefined") return;

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
  if (!heatmap) return;

  heatmap.innerHTML = "";

  capabilities.forEach((item) => {
    const row = document.createElement("div");
    row.className = "heat-row";

    row.innerHTML = `
      <div><strong>${escapeHtml(item.name)}</strong></div>
      <div class="heat-cell" style="background: rgba(2,132,199,${0.25 + item.hpScore * 0.13})">HP: ${item.hpScore}</div>
      <div class="heat-cell" style="background: rgba(220,38,38,${0.25 + item.lenovoScore * 0.13})">Lenovo: ${item.lenovoScore}</div>
    `;

    heatmap.appendChild(row);
  });
}

function renderInsights() {
  const scores = getDecisionScores();
  const winner = getWinner();

  const winnerText = document.getElementById("winnerText");
  if (winnerText) {
    winnerText.innerHTML =
      winner === "Too close to call"
        ? `<strong>Winner: Too close to call.</strong> The two platforms are within ${scores.scoreGap.toFixed(1)} evidence-adjusted points. Let PoC validation break the deadlock.`
        : `<strong>Winner: ${winner}.</strong> ${winner} currently leads based on evidence-adjusted enterprise priorities. Raw score was HP ${scores.hpRaw.toFixed(1)} vs Lenovo ${scores.lenovoRaw.toFixed(1)}.`;
  }

  renderDecisionGateCard();
function renderRiskFlagsCard() {
  const risks = getRiskFlags();
  const container = document.getElementById("riskFlags");
  if (!container) return;

  if (!risks.length) {
    container.innerHTML = `
      <div class="line-item">
        <span class="badge green">Clean</span>
        <strong>No major decision risks detected.</strong>
      </div>
    `;
    return;
  }

  container.innerHTML = risks
    .map(
      (risk) => `
        <div class="decision-line-item">
          <div class="decision-title-line">
            <span class="badge ${risk.severity === "High" ? "red" : risk.severity === "Medium" ? "gray" : "blue"}">
              ${escapeHtml(risk.severity)}
            </span>
            <strong>${escapeHtml(risk.title)}</strong>
          </div>

          <p>${escapeHtml(risk.detail)}</p>
          <small>Owner: ${escapeHtml(risk.owner)}</small>
        </div>
      `
    )
    .join("");
}

function renderMissingEvidenceCard() {
  const missing = getMissingEvidence();
  const container = document.getElementById("missingEvidence");
  if (!container) return;

  if (!missing.length) {
    container.innerHTML = `
      <div class="line-item">
        <span class="badge green">Clean</span>
        <strong>No missing evidence detected.</strong>
      </div>
    `;
    return;
  }

  container.innerHTML = missing
    .map(
      (item) => `
        <div class="decision-line-item">
          <div class="decision-title-line">
            <span class="badge ${item.severity === "Critical" ? "red" : "gray"}">
              ${escapeHtml(item.severity)}
            </span>
            <strong>${escapeHtml(item.category)}</strong>
          </div>

          <p>${escapeHtml(item.reason)}</p>
          <small>Confidence: ${escapeHtml(item.confidence)} | Evidence: ${escapeHtml(item.evidence)}</small>

          <ul class="compact-list">
            ${item.needed.map((need) => `<li>${escapeHtml(need)}</li>`).join("")}
          </ul>
        </div>
      `
    )
    .join("");
}

function renderSuggestedNextStepsCard() {
  const steps = getSuggestedNextSteps();
  const container = document.getElementById("suggestedNextSteps");
  if (!container) return;

  container.innerHTML = steps
    .map(
      (step) => `
        <div class="decision-line-item">
          <div class="decision-title-line">
            <span class="badge blue">${escapeHtml(step.priority)}</span>
            <strong>${escapeHtml(step.title)}</strong>
          </div>

          <p>${escapeHtml(step.detail)}</p>
        </div>
      `
    )
    .join("");
}

function renderWinnerFlipSensitivityCard() {
  const sensitivity = getWinnerFlipSensitivity();
  const container = document.getElementById("winnerFlipSensitivity");
  if (!container) return;

  const candidatesHtml = sensitivity.flipCandidates.length
    ? sensitivity.flipCandidates
        .map(
          (candidate) => `
            <div class="decision-line-item">
              <div class="decision-title-line">
                <span class="badge green">${candidate.onePointImpact}</span>
                <strong>${escapeHtml(candidate.category)}</strong>
              </div>

              <p>${escapeHtml(candidate.reason)}</p>
            </div>
          `
        )
        .join("")
    : `
      <div class="line-item">
        <span class="badge green">Stable</span>
        <strong>No single one-point category movement appears large enough to flip the recommendation.</strong>
      </div>
    `;

  container.innerHTML = `
    <div class="decision-meta">
      <span><strong>Current adjusted winner:</strong> ${escapeHtml(sensitivity.currentWinner)}</span>
      <span><strong>Adjusted score gap:</strong> ${sensitivity.scoreGap}</span>
    </div>
    ${candidatesHtml}
  `;
}

  const hpLeads = capabilities.filter((item) => item.hpScore > item.lenovoScore).map((item) => item.name);
  const lenovoLeads = capabilities.filter((item) => item.lenovoScore > item.hpScore).map((item) => item.name);
  const ties = capabilities.filter((item) => item.hpScore === item.lenovoScore).map((item) => item.name);

  const categoryWinners = document.getElementById("categoryWinners");
  if (categoryWinners) {
    categoryWinners.innerHTML = `
      ${insightLine("HP leads", hpLeads, "blue")}
      ${insightLine("Lenovo leads", lenovoLeads, "red")}
      ${insightLine("Tied", ties, "gray")}
    `;
  }

  const tradeoffs = capabilities
    .map((item) => ({
      ...item,
      impact: Math.abs(item.hpScore - item.lenovoScore) * item.weight * confidenceFactor(item.confidence) * evidenceFactor(item.evidence),
      leader: item.hpScore > item.lenovoScore ? "HP" : item.lenovoScore > item.hpScore ? "Lenovo" : "Tie"
    }))
    .filter((item) => item.impact > 0)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 6);

  const tradeoffsEl = document.getElementById("tradeoffs");
  if (tradeoffsEl) {
    tradeoffsEl.innerHTML = tradeoffs
      .map(
        (item) => `
        <div class="line-item">
          <span class="badge ${item.leader === "HP" ? "blue" : "red"}">${item.leader}</span>
          <strong>${escapeHtml(item.name)}</strong>
          <span class="muted">adjusted impact ${item.impact.toFixed(1)}, confidence ${item.confidence}, evidence ${item.evidence}</span>
        </div>
      `
      )
      .join("");
  }
}

function renderDecisionGateCard() {
  const gate = getDecisionGate();
  const container = document.getElementById("decisionGate");
  if (!container) return;

  container.innerHTML = `
    <div class="decision-summary ${gate.status.toLowerCase()}">
      <span class="status-pill ${gate.status.toLowerCase()}">${escapeHtml(gate.label)}</span>
      <p>${escapeHtml(gate.message)}</p>
    </div>
  `;
}

function renderRiskFlagsCard() {
  const risks = getRiskFlags();
  const container = document.getElementById("riskFlags");
  if (!container) return;

  if (!risks.length) {
    container.innerHTML = `
      <div class="decision-empty">
        <span class="badge green">Clean</span>
        <span>No major decision risks detected.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = risks
    .map(
      (risk) => `
        <div class="decision-row">
          <span class="badge ${risk.severity === "High" ? "red" : risk.severity === "Medium" ? "gray" : "blue"}">
            ${escapeHtml(risk.severity)}
          </span>
          <div class="decision-row-body">
            <strong>${escapeHtml(risk.title)}</strong>
            <p>${escapeHtml(risk.detail)}</p>
            <small>Owner: ${escapeHtml(risk.owner)}</small>
          </div>
        </div>
      `
    )
    .join("");
}

function renderMissingEvidenceCard() {
  const missing = getMissingEvidence();
  const container = document.getElementById("missingEvidence");
  if (!container) return;

  if (!missing.length) {
    container.innerHTML = `
      <div class="decision-empty">
        <span class="badge green">Clean</span>
        <span>No missing evidence detected.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = missing
    .map(
      (item) => `
        <div class="decision-row">
          <span class="badge ${item.severity === "Critical" ? "red" : "gray"}">
            ${escapeHtml(item.severity)}
          </span>
          <div class="decision-row-body">
            <strong>${escapeHtml(item.category)}</strong>
            <p>${escapeHtml(item.reason)}</p>
            <small>Confidence: ${escapeHtml(item.confidence)} | Evidence: ${escapeHtml(item.evidence)}</small>
            <ul class="compact-list">
              ${item.needed.map((need) => `<li>${escapeHtml(need)}</li>`).join("")}
            </ul>
          </div>
        </div>
      `
    )
    .join("");
}

function renderSuggestedNextStepsCard() {
  const steps = getSuggestedNextSteps();
  const container = document.getElementById("suggestedNextSteps");
  if (!container) return;

  container.innerHTML = steps
    .map(
      (step) => `
        <div class="decision-row">
          <span class="badge blue">${escapeHtml(step.priority)}</span>
          <div class="decision-row-body">
            <strong>${escapeHtml(step.title)}</strong>
            <p>${escapeHtml(step.detail)}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function renderWinnerFlipSensitivityCard() {
  const sensitivity = getWinnerFlipSensitivity();
  const container = document.getElementById("winnerFlipSensitivity");
  if (!container) return;

  const candidatesHtml = sensitivity.flipCandidates.length
    ? sensitivity.flipCandidates
        .map(
          (candidate) => `
            <div class="decision-row">
              <span class="badge green">${candidate.onePointImpact}</span>
              <div class="decision-row-body">
                <strong>${escapeHtml(candidate.category)}</strong>
                <p>${escapeHtml(candidate.reason)}</p>
              </div>
            </div>
          `
        )
        .join("")
    : `
      <div class="decision-empty">
        <span class="badge green">Stable</span>
        <span>No single one-point category movement appears large enough to flip the recommendation.</span>
      </div>
    `;

  container.innerHTML = `
    <div class="decision-meta">
      <span><strong>Current adjusted winner:</strong> ${escapeHtml(sensitivity.currentWinner)}</span>
      <span><strong>Adjusted score gap:</strong> ${sensitivity.scoreGap}</span>
    </div>
    ${candidatesHtml}
  `;
}

function insightLine(label, items, color) {
  return `
    <div class="line-item">
      <span class="badge ${color}">${label}</span>
      <span>${items.length ? items.map(escapeHtml).join(", ") : "None"}</span>
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
    .filter((item) => isHighWeight(item) && item.evidence !== "PoC Validated")
    .flatMap((item) => [
      `Capability requiring proof: "${item.name}" | Weight ${item.weight} | Evidence ${item.evidence}`,
      ...(proofChecklist[item.id] || []).map((check) => `- ${check}`)
    ]);

  setHtml("hpQuestions", renderQuestionList(hpQuestions));
  setHtml("lenovoQuestions", renderQuestionList(lenovoQuestions));
  setHtml("probeQuestions", renderQuestionList(probes));
}

function renderQuestionList(questions) {
  return questions.map((q) => `<div class="question">${escapeHtml(q)}</div>`).join("");
}

function renderPoc() {
  const phases = ["Day 0–30: Foundation", "Day 31–60: Workflows", "Day 61–90: Value"];
  const root = document.getElementById("pocPlan");

  if (!root) return;

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
                  <div class="${task.done ? "done" : ""}">${escapeHtml(task.task)}</div>
                  <input type="text" placeholder="Owner" value="${escapeHtml(task.owner)}" onchange="updatePoc('${task.id}', 'owner', this.value)" />
                  <input type="date" value="${escapeHtml(task.dueDate)}" onchange="updatePoc('${task.id}', 'dueDate', this.value)" />
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
  const scores = getDecisionScores();
  const winner = getWinner();
  const gate = getDecisionGate();

  setHtml(
    "snapshot",
    `
      HP WXP adjusted: <strong>${scores.hpAdjusted.toFixed(1)}</strong> |
      Lenovo xIQ adjusted: <strong>${scores.lenovoAdjusted.toFixed(1)}</strong> |
      Winner: <strong>${escapeHtml(winner)}</strong> |
      Gate: <strong>${escapeHtml(gate.label)}</strong>
    `
  );
}

function exportJson() {
  const payload = {
    version: "3.0",
    generatedAt: new Date().toISOString(),
    scores: {
      ...getDecisionScores(),
      winner: getWinner(),
      decisionGate: getDecisionGate()
    },
    risks: getRiskFlags(),
    missingEvidence: getMissingEvidence(),
    suggestedNextSteps: getSuggestedNextSteps(),
    winnerFlipSensitivity: getWinnerFlipSensitivity(),
    capabilities,
    pocTasks
  };

  downloadFile("dex-compare-ai-v3-export.json", JSON.stringify(payload, null, 2), "application/json");
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
    String(item.notes || "").replaceAll(",", ";")
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  downloadFile("dex-compare-ai-v3-scorecard.csv", csv, "text/csv");
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

      capabilities = normalizeCapabilities(data.capabilities);
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
  const scores = getDecisionScores();
  const winner = getWinner();
  const gate = getDecisionGate();
  const risks = getRiskFlags();
  const missing = getMissingEvidence();
  const nextSteps = getSuggestedNextSteps();

  const topTradeoffs = capabilities
    .map((item) => ({
      ...item,
      impact: Math.abs(item.hpScore - item.lenovoScore) * item.weight * confidenceFactor(item.confidence) * evidenceFactor(item.evidence),
      leader: item.hpScore > item.lenovoScore ? "HP" : item.lenovoScore > item.hpScore ? "Lenovo" : "Tie"
    }))
    .filter((item) => item.impact > 0)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 5);

  const report = document.getElementById("executiveReport");
  if (!report) return;

  report.classList.remove("hidden");

  report.innerHTML = `
    <div class="report-title">Executive Decision Report: HP WXP vs Lenovo xIQ</div>

    <div class="report-section">
      <h4>1. Recommendation</h4>
      <p>
        Current evidence-adjusted winner: <strong>${escapeHtml(winner)}</strong>.
        HP WXP scored <strong>${scores.hpAdjusted.toFixed(1)}</strong>.
        Lenovo xIQ scored <strong>${scores.lenovoAdjusted.toFixed(1)}</strong>.
      </p>
      <p class="muted">
        Raw score before evidence and confidence discount: HP ${scores.hpRaw.toFixed(1)} vs Lenovo ${scores.lenovoRaw.toFixed(1)}.
      </p>
    </div>

    <div class="report-section">
      <h4>2. Decision Gate</h4>
      <p><span class="${gate.cssClass}">${escapeHtml(gate.label)}</span></p>
      <p>${escapeHtml(gate.message)}</p>
    </div>

    <div class="report-section">
      <h4>3. Top Tradeoffs</h4>
      <ul>
        ${topTradeoffs
          .map(
            (item) =>
              `<li><strong>${escapeHtml(item.leader)}</strong> leads on ${escapeHtml(item.name)}. Adjusted impact ${item.impact.toFixed(1)}. Confidence: ${escapeHtml(item.confidence)}. Evidence: ${escapeHtml(item.evidence)}.</li>`
          )
          .join("")}
      </ul>
    </div>

    <div class="report-section">
      <h4>4. Risk Flags</h4>
      ${
        risks.length
          ? `<ul>${risks.map((item) => `<li><strong>${escapeHtml(item.severity)}</strong>: ${escapeHtml(item.title)} ${escapeHtml(item.detail)}</li>`).join("")}</ul>`
          : `<p>No major decision risks detected.</p>`
      }
    </div>

    <div class="report-section">
      <h4>5. Missing Evidence</h4>
      ${
        missing.length
          ? `<ul>${missing.slice(0, 10).map((item) => `<li><strong>${escapeHtml(item.category)}</strong>: ${escapeHtml(item.needed[0] || "Provide PoC proof.")}</li>`).join("")}</ul>`
          : `<p>No missing evidence detected.</p>`
      }
    </div>

    <div class="report-section">
      <h4>6. Suggested Next Steps</h4>
      <ul>
        ${nextSteps.map((step) => `<li><strong>${escapeHtml(step.priority)}</strong>: ${escapeHtml(step.title)} - ${escapeHtml(step.detail)}</li>`).join("")}
      </ul>
    </div>

    <div class="report-section">
      <h4>7. Bottom Line</h4>
      <p>
        Use this as a structured negotiation and PoC control system.
        Final vendor selection should wait until the decision gate improves and high-weight claims become documented or PoC validated.
      </p>
    </div>
  `;
}

function printPdf() {
  window.print();
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

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHtml(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function toggleHidden(id, shouldHide) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("hidden", shouldHide);
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

render();
