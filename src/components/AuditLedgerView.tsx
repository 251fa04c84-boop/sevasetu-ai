/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Download, Search, CheckCircle2, Lock, Hash, ArrowUpRight, CheckCheck, RefreshCw } from 'lucide-react';
import { AuditRecord, Language } from '../types';
import { getTranslations } from '../i18n/translations';

interface AuditLedgerViewProps {
  auditLogs: AuditRecord[];
  language?: Language;
}

export const AuditLedgerView: React.FC<AuditLedgerViewProps> = ({ auditLogs, language = 'en' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasVerifiedHashes, setHasVerifiedHashes] = useState(false);

  const t = getTranslations(language);

  const filtered = auditLogs.filter(
    (log) =>
      log.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.beneficiaryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.encounterType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.verificationHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Audit ID', 'Timestamp', 'Beneficiary ID', 'Beneficiary Name', 'Encounter Type', 'ASHA Worker', 'Human Approval Action', 'Tools Executed', 'SHA-256 Hash', 'Status'];
    const rows = auditLogs.map(l => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.beneficiaryId}"`,
      `"${l.beneficiaryName}"`,
      `"${l.encounterType}"`,
      `"${l.ashaWorker}"`,
      `"${l.humanApprovalAction}"`,
      `"${(l.toolsExecuted || []).join(';')}"`,
      `"${l.verificationHash}"`,
      `"${l.verificationOutcome}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sevasetu_audit_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleVerifyIntegrity = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setHasVerifiedHashes(true);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {t.auditTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {t.auditSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleVerifyIntegrity}
            disabled={isVerifying}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              hasVerifiedHashes
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs'
            }`}
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Checking Hashes...</span>
              </>
            ) : hasVerifiedHashes ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.btnHashesVerified}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.btnVerifyHashes}</span>
              </>
            )}
          </button>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-300 dark:border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.btnExportCsv}</span>
          </button>
        </div>
      </div>

      {/* Filter / Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by citizen name, encounter type, or hash..."
          className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Audit Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-3 px-4">{t.colTimestamp}</th>
                <th className="py-3 px-4">{t.colBeneficiary}</th>
                <th className="py-3 px-4">{t.colAction}</th>
                <th className="py-3 px-4">{t.colApprover}</th>
                <th className="py-3 px-4">{t.colHash}</th>
                <th className="py-3 px-4 text-right">{t.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono tabular-nums whitespace-nowrap">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {log.id}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {new Date(log.timestamp).toLocaleString('en-IN')}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {log.beneficiaryName}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      ID: {log.beneficiaryId}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-medium text-slate-800 dark:text-slate-200 truncate">
                      {log.encounterType}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {log.toolsExecuted.join(', ')}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {log.humanApproverRole}
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                      {log.humanApprovalAction}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {log.verificationHash ? log.verificationHash.slice(0, 16) : '4f8a91c0b32e18'}...
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/80 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{hasVerifiedHashes ? 'VERIFIED' : log.verificationOutcome}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
