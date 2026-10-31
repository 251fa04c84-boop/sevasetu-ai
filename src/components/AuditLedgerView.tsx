/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Download, Search, CheckCircle2, Lock, Hash, ArrowUpRight } from 'lucide-react';
import { AuditRecord } from '../types';

interface AuditLedgerViewProps {
  auditLogs: AuditRecord[];
}

export const AuditLedgerView: React.FC<AuditLedgerViewProps> = ({ auditLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);

  const filtered = auditLogs.filter(
    (log) =>
      log.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.beneficiaryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.encounterType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.verificationHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sevasetu_audit_ledger_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Immutable Agentic Audit Ledger
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Every citizen encounter, retrieved MoHFW guideline, agent reasoning plan, human authorization gate, and tool execution outcome is cryptographically hashed with SHA-256 for public-health regulatory accountability.
          </p>
        </div>

        <button
          onClick={exportJSON}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Ledger (.JSON)</span>
        </button>
      </div>

      {/* Filter / Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by beneficiary, encounter, or hash..."
          className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Audit Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-3 px-4">Audit ID & Timestamp</th>
                <th className="py-3 px-4">Beneficiary</th>
                <th className="py-3 px-4">Human Gate Decision</th>
                <th className="py-3 px-4">Tools Executed</th>
                <th className="py-3 px-4">SHA-256 Integrity Hash</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono tabular-nums">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {log.id}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {new Date(log.timestamp).toLocaleString('en-IN')}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {log.beneficiaryName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      ID: {log.beneficiaryId} · {log.encounterType}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{log.humanApprovalAction}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      By: {log.ashaWorker}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <div className="flex flex-wrap gap-1">
                      {log.toolsExecuted.map((t, idx) => (
                        <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                    <span title={log.verificationHash}>
                      {log.verificationHash.slice(0, 16)}...
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedRecord(log)}
                      className="px-2.5 py-1 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No audit records match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Audit Record Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Audit Record: {selectedRecord.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Encounter Observation Input:</span>
                <p className="mt-1 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200">
                  "{selectedRecord.userInput}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block">Human Approver:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {selectedRecord.ashaWorker} ({selectedRecord.humanApproverRole})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Timestamp:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    {selectedRecord.timestamp}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block">Retrieved Authoritative Sources:</span>
                <ul className="mt-1 space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                  {selectedRecord.sourcesRetrieved.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {selectedRecord.toolPayload && (
                <div>
                  <span className="text-slate-400 block">Verified Tool Execution Payload:</span>
                  <pre className="mt-1 p-2.5 bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-200 rounded max-h-36 overflow-x-auto">
                    {JSON.stringify(selectedRecord.toolPayload, null, 2)}
                  </pre>
                </div>
              )}

              <div>
                <span className="text-slate-400 block">Cryptographic Verification Hash (SHA-256):</span>
                <div className="mt-1 p-2 bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300 rounded break-all select-all">
                  {selectedRecord.verificationHash}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
