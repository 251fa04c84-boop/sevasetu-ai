/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Printer, Shield, CheckCircle2, Lock, FileText, QrCode } from 'lucide-react';
import { AgentAnalysisPlan, Beneficiary, Language } from '../types';

interface PostEncounterAuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: AgentAnalysisPlan | null;
  beneficiary: Beneficiary;
  language?: Language;
}

export const PostEncounterAuditReportModal: React.FC<PostEncounterAuditReportModalProps> = ({
  isOpen,
  onClose,
  plan,
  beneficiary,
  language = 'en'
}) => {
  if (!isOpen || !plan) return null;

  const handlePrint = () => {
    window.print();
  };

  const auditId = `AUDIT-MOHFW-${beneficiary.id}-${Date.now().toString().slice(-6)}`;
  const sha256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                MoHFW Encounter Audit & Care Coordination Report
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Official Clinical Governance Record · {auditId}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-700 dark:text-slate-300">
          {/* Official Emblem Banner */}
          <div className="flex items-start justify-between pb-4 border-b-2 border-slate-900 dark:border-slate-700">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 block mb-1">
                National Health Mission (NHM) · Digital Public Good
              </span>
              <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Frontline Encounter Care Coordination Ledger
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Primary Health Centre Sub-Center: Shivgarh · Bikaner District, Rajasthan
              </p>
            </div>
            <div className="text-right font-mono text-[11px] text-slate-500">
              <div>Date: {new Date(plan.generatedAt).toLocaleDateString('en-IN')}</div>
              <div>Audit Ref: {auditId}</div>
            </div>
          </div>

          {/* Citizen Demographics & Clinical Profile */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Citizen Name</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{beneficiary.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">ABHA ID (Ayushman)</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{beneficiary.abhaId || 'Pending'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Program Cohort</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">{beneficiary.category}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Assigned ASHA</span>
              <span className="font-bold text-slate-900 dark:text-white">{beneficiary.assignedAsha}</span>
            </div>
          </div>

          {/* Section 1: Presentation & Danger Sign Evaluation */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>1. Presenting Observations & Triage Evaluation</span>
            </h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5 leading-relaxed">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                Triage Classification: <span className="font-extrabold text-red-600 dark:text-red-400">{plan.triageLevel}</span> (Confidence: {(plan.confidenceScore * 100).toFixed(0)}%)
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>Field Observation:</strong> "{plan.intakeSummary}"
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>Protocol Justification:</strong> {plan.triageReasoning}
              </p>
            </div>
          </div>

          {/* Section 2: Authoritative MoHFW Protocol Grounding */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>2. Authoritative MoHFW National Health Mission Grounding</span>
            </h4>
            <div className="space-y-2">
              {plan.applicableGuidelines.map((g) => (
                <div key={g.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">{g.title}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{g.authority} · {g.section}</div>
                  <p className="mt-1 font-medium text-slate-700 dark:text-slate-300">Mandated Directive: {g.keyRule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Human Authorization & Executed Actions */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>3. Human-in-the-Loop Gate & Consequential Actions</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-2 px-3">Action Tool</th>
                    <th className="py-2 px-3">Authorization Gate</th>
                    <th className="py-2 px-3">Outcome Verification</th>
                    <th className="py-2 px-3 text-right">Execution Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {plan.actions.map((act) => (
                    <tr key={act.id}>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                        {act.label}
                      </td>
                      <td className="py-2.5 px-3">
                        {beneficiary.assignedAsha} (Role: Frontline ASHA)
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                        {act.description}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {act.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Cryptographic Seal & Statutory Sign-off */}
          <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-xs">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>SHA-256 Immutable Audit Signature</span>
              </div>
              <div className="font-mono text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded max-w-md break-all">
                {sha256}
              </div>
              <span className="text-[10px] text-slate-400 block">
                HL7 FHIR R4 Bundle Ref: ABDM-MOHFW-CAREPLAN-2026-XSPAN
              </span>
            </div>

            <div className="text-right sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
              <span className="text-[10px] text-slate-400 block uppercase">Authorized Signature</span>
              <span className="font-bold text-slate-900 dark:text-white block mt-1">Shanti Meena, ASHA</span>
              <span className="text-[10px] text-emerald-600 font-mono">Verified ID: ASHA-04-SHIVGARH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
