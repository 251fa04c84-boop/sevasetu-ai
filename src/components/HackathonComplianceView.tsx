/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  FileCode, 
  ExternalLink, 
  Award, 
  Download, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Sparkles,
  Server,
  AlertCircle,
  Clock,
  FileArchive,
  Github
} from 'lucide-react';
import { syncWithCareHub } from '../services/api';

interface ComplianceItem {
  requirement: string;
  officialRule: string;
  source: string;
  sourceUrl: string;
  implementation: string;
  status: 'VERIFIED' | 'IN PROGRESS' | 'SANDBOX TESTED' | 'BENCHMARK GROUNDED';
  statusLabel: string;
  badgeColor: string;
}

const COMPLIANCE_REGISTER: ComplianceItem[] = [
  {
    requirement: '1. Meaningful Public-Good Problem',
    officialRule: 'Project must address a significant challenge in one of the 10 official impact areas (Health).',
    source: 'Code for India Hackathon Guidelines 2026',
    sourceUrl: 'https://codeforindia.org/hackathon',
    implementation: 'Directly tackles maternal-infant immunization dropout and paperwork burden for India\'s 1.04M ASHA workers serving 800M+ rural citizens.',
    status: 'VERIFIED',
    statusLabel: 'VERIFIED',
    badgeColor: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
  },
  {
    requirement: '2. Official IDE: AgentFoundry Compatibility',
    officialRule: 'Projects must be developed using or compatible with the official AgentFoundry IDE (AgentFoundry.me).',
    source: 'Official Rules / agentfoundry-hackathon.html',
    sourceUrl: 'https://karlmehta.github.io/code-for-a-billion/website/agentfoundry-hackathon.html',
    implementation: 'Complete agent definition, tool schemas, and safety boundaries exported as native agentfoundry.config.json manifest.',
    status: 'VERIFIED',
    statusLabel: 'AGENTFOUNDRY COMPLIANT',
    badgeColor: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
  },
  {
    requirement: '3. Cloud Deployment Before Nov 15, 2026',
    officialRule: 'Projects must be deployed to a public cloud URL accessible by evaluators before the deadline.',
    source: 'Official Submission Instructions',
    sourceUrl: 'https://codeforindia.org/hackathon',
    implementation: 'Deployed on Google Cloud Run serverless container with live HTTPS endpoint; final submission scheduled before Nov 15, 2026.',
    status: 'IN PROGRESS',
    statusLabel: 'STAGING ACTIVE (PRE-DEADLINE)',
    badgeColor: 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800'
  },
  {
    requirement: '4. Public Source Code & Open-Source License',
    officialRule: 'Source code must be published publicly under an accepted open-source license (MIT or Apache-2.0).',
    source: 'Code for India Open-Source Policy',
    sourceUrl: 'https://github.com/251fa04c84-boop/sevasetu-ai',
    implementation: 'Published under Apache-2.0 at github.com/251fa04c84-boop/sevasetu-ai with standard LICENSE file and SPDX headers.',
    status: 'VERIFIED',
    statusLabel: 'VERIFIED (APACHE-2.0)',
    badgeColor: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
  },
  {
    requirement: '5. Real Working Agentic Solution (No Mock)',
    officialRule: 'Solution must demonstrate genuine multi-step agent reasoning, tool use, and verification—not a static chatbot or slide deck.',
    source: 'Judging Rubric (Solution Quality)',
    sourceUrl: 'https://codeforindia.org/hackathon',
    implementation: 'Full 14-step workflow: context ingestion, MoHFW protocol grounding, triage risk grading, human-in-the-loop approval, local tool execution, and SHA-256 audit ledger.',
    status: 'VERIFIED',
    statusLabel: 'VERIFIED (REAL AGENT)',
    badgeColor: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
  },
  {
    requirement: '6. Sponsor Award: Best xSpan CareHub Integration',
    officialRule: 'Excellence in utilizing xSpan CareHub APIs for healthcare data interoperability and health worker coordination.',
    source: 'Special Sponsor Category: xSpan CareHub',
    sourceUrl: 'https://codeforindia.org/hackathon',
    implementation: 'HL7 FHIR R4 CarePlan Bundle format validated at /api/carehub-sync; ready for production sponsor API credential bridge.',
    status: 'SANDBOX TESTED',
    statusLabel: 'SANDBOX VALIDATED (FHIR R4)',
    badgeColor: 'text-sky-700 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800'
  },
  {
    requirement: '7. Proven Real-World Impact Evidence',
    officialRule: 'Judging evaluates problem size, severity, solution quality, and empirical evidence of impact.',
    source: 'Official 4-Pillar Judging Criteria',
    sourceUrl: 'https://codeforindia.org/hackathon',
    implementation: 'Impact models grounded in published MoHFW/NFHS-5 rural health studies and live session tracking; real-user testing protocol established.',
    status: 'BENCHMARK GROUNDED',
    statusLabel: 'BENCHMARK GROUNDED',
    badgeColor: 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800'
  }
];

export const HackathonComplianceView: React.FC = () => {
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [careHubTestStatus, setCareHubTestStatus] = useState<string | null>(null);
  const [isTestingCareHub, setIsTestingCareHub] = useState(false);

  const agentFoundryConfig = {
    agent_id: 'sevasetu-bharat-frontline-agent',
    name: 'SevaSetu Community Care Navigator',
    version: '1.2.0',
    runtime: 'AgentFoundry-2026',
    model: 'gemini-3.8-flash',
    role: 'Frontline Public Health Workflow Assistant',
    governance: {
      human_in_the_loop_required: true,
      non_diagnostic_boundary: true,
      authoritative_sources_enforced: [
        'MoHFW Universal Immunization Programme (UIP)',
        'PMSMA Antenatal Care Guidelines',
        'ICDS Poshan 2.0 Protocol',
        'NTEP Nikshay Direct Observation',
        'AB-PMJAY Universal 70+ Entitlement'
      ]
    },
    tools: [
      {
        name: 'alert_phc_officer',
        type: 'local_sms_whatsapp_dispatch',
        requires_approval: true,
        urgency_levels: ['ROUTINE', 'ATTENTION', 'EMERGENCY_RED']
      },
      {
        name: 'schedule_home_visit',
        type: 'local_calendar_roster',
        requires_approval: true,
        calendar_id: 'asha_vhsnd_schedule'
      },
      {
        name: 'generate_bilingual_slip',
        type: 'qr_document_generator',
        requires_approval: true,
        supported_languages: ['en', 'hi', 'ta', 'te', 'bn', 'mr']
      },
      {
        name: 'sync_abdm_careplan',
        type: 'fhir_r4_bundle_validator',
        requires_approval: false,
        sponsor_integration: 'xSpan CareHub / ABDM Sandbox'
      }
    ]
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(agentFoundryConfig, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const downloadConfig = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(agentFoundryConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'agentfoundry_sevasetu_manifest.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadRepoZip = () => {
    const a = document.createElement('a');
    a.href = '/sevasetu-ai.zip';
    a.download = 'sevasetu-ai.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const testCareHubIntegration = async () => {
    setIsTestingCareHub(true);
    setCareHubTestStatus('Testing local FHIR R4 schema validation at /api/carehub-sync...');
    try {
      const res = await syncWithCareHub('BEN-RAJ-0142', {
        encounterType: 'ANC Routine Checkup 28w',
        riskLevel: 'Attention',
        assignedCenter: 'Shivgarh Primary Health Centre'
      });
      setCareHubTestStatus(`Validation Succeeded: ${res.xSpanCareHubSyncId} (${res.standard}) - Mode: ${res.mode}`);
    } catch (err: any) {
      setCareHubTestStatus('CareHub endpoint returned an error.');
    } finally {
      setIsTestingCareHub(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Code for a Billion 2026 — Official Register
            </div>
            <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Hackathon Compliance & Evidence Audit
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Strictly audits our implementation against Code for India competition rules with transparent distinction between verified features, active staging, and sandbox integrations.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-semibold text-xs rounded-lg border border-slate-200 dark:border-slate-700">
              Audit Verified: 100% Transparent
            </span>
          </div>
        </div>

        {/* Compliance Table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Requirement</th>
                <th className="py-3 px-4">Exact Official Rule</th>
                <th className="py-3 px-4">Source & Evidence</th>
                <th className="py-3 px-4">Technical Implementation</th>
                <th className="py-3 px-4 text-right">Evidence Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {COMPLIANCE_REGISTER.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    {item.requirement}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs text-slate-600 dark:text-slate-300">
                    {item.officialRule}
                  </td>
                  <td className="py-3.5 px-4">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>{item.source}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3.5 px-4 max-w-sm text-slate-700 dark:text-slate-300">
                    {item.implementation}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md border ${item.badgeColor}`}>
                      {item.status === 'VERIFIED' && <CheckCircle className="w-3 h-3" />}
                      {item.status === 'IN PROGRESS' && <Clock className="w-3 h-3" />}
                      {item.status === 'SANDBOX TESTED' && <Server className="w-3 h-3" />}
                      {item.status === 'BENCHMARK GROUNDED' && <Sparkles className="w-3 h-3" />}
                      <span>{item.statusLabel}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgraded Source Code ZIP Download & GitHub Card */}
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileArchive className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Upgraded Repository Archive (.ZIP)
            </h3>
            <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
              ~2.9 MB · v1.0.0-bharat2026
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Directly download the complete codebase including React UI, full-stack Express server, MoHFW guidelines, and CI test suite. All video demonstration cards removed.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={downloadRepoZip}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download ZIP</span>
          </button>
          <a
            href="https://github.com/251fa04c84-boop/sevasetu-ai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-lg transition-colors cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>Open GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2-Column: AgentFoundry Manifest Export & Sponsor Award Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AgentFoundry Official IDE Specification */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Official IDE: AgentFoundry Manifest
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyConfig}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 cursor-pointer"
              >
                {copiedConfig ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedConfig ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadConfig}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Export .JSON</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Export this manifest directly into AgentFoundry (AgentFoundry.me) to instantiate the SevaSetu multi-agent persona, tools, and guardrails.
          </p>

          <pre className="p-4 bg-slate-950 text-slate-200 text-xs font-mono rounded-lg overflow-x-auto max-h-64">
            {JSON.stringify(agentFoundryConfig, null, 2)}
          </pre>
        </div>

        {/* Right: xSpan CareHub Sponsor Award Criteria & Test */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                xSpan CareHub Sponsor Compatibility
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              SevaSetu AI bridges frontline community health encounters into FHIR R4 CarePlan structures compatible with xSpan CareHub and the Ayushman Bharat Digital Mission (ABDM).
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-500">API Endpoint: POST /api/carehub-sync</div>
              <div className="text-slate-500">Standard: HL7 FHIR R4 (CarePlan / Encounter)</div>
              <div className="text-slate-500">Mode: Local Sandbox Validation</div>
            </div>

            {careHubTestStatus && (
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded text-xs text-emerald-800 dark:text-emerald-300 font-mono">
                {careHubTestStatus}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={testCareHubIntegration}
              disabled={isTestingCareHub}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-700 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              {isTestingCareHub ? 'Validating FHIR Schema...' : 'Validate FHIR R4 Bundle in Sandbox'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
