/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { BeneficiaryList } from './components/BeneficiaryList';
import { AgentWorkflowView } from './components/AgentWorkflowView';
import { AuditLedgerView } from './components/AuditLedgerView';
import { ImpactDashboardView } from './components/ImpactDashboardView';
import { HackathonComplianceView } from './components/HackathonComplianceView';
import { BiLingualCareSlipModal } from './components/BiLingualCareSlipModal';
import { NewEncounterModal } from './components/NewEncounterModal';
import { DownloadZipModal } from './components/DownloadZipModal';
import { INITIAL_BENEFICIARIES } from './data/mockBeneficiaries';
import { Beneficiary, Language, AuditRecord, ImpactTelemetry, AgentAnalysisPlan } from './types';
import { fetchAuditLogs, fetchImpactTelemetry, checkServerHealth } from './services/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('workflow');
  const [language, setLanguage] = useState<Language>('en');
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(INITIAL_BENEFICIARIES);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary>(INITIAL_BENEFICIARIES[0]);
  const [activePlanForCareSlip, setActivePlanForCareSlip] = useState<AgentAnalysisPlan | null>(null);
  const [isEncounterModalOpen, setIsEncounterModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>([]);
  const [telemetry, setTelemetry] = useState<ImpactTelemetry>({
    totalBeneficiariesTracked: 1420,
    activeEncountersLogged: 384,
    immunizationDropoutsPrevented: 96,
    highRiskTriagesPrompted: 42,
    paperworkHoursSavedEstimate: 168.5,
    bilingualSlipsGenerated: 312,
    abdmRecordsSynced: 288,
    offlineActionsBuffered: 0
  });
  const [isOnline, setIsOnline] = useState(true);

  const loadData = async () => {
    try {
      const health = await checkServerHealth();
      setIsOnline(health.status === 'ok');
      const [logs, stats] = await Promise.all([
        fetchAuditLogs(),
        fetchImpactTelemetry()
      ]);
      if (logs && logs.length > 0) setAuditLogs(logs);
      if (stats) setTelemetry(stats);
    } catch (err) {
      console.warn('Network offline or server booting:', err);
      setIsOnline(false);
    }
  };

  useEffect(() => {
    loadData();
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSelectBeneficiaryFromList = (b: Beneficiary) => {
    setSelectedBeneficiary(b);
    setCurrentTab('workflow');
  };

  const handleStartCustomEncounter = (b: Beneficiary, note: string) => {
    setSelectedBeneficiary(b);
    setCurrentTab('workflow');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      {/* Top Bar Contract (Wordmark, Nav links, Primary action) */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onLanguageChange={setLanguage}
        onNewEncounter={() => setIsEncounterModalOpen(true)}
        isOnline={isOnline}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'beneficiaries' && (
          <BeneficiaryList
            beneficiaries={beneficiaries}
            onSelectBeneficiary={handleSelectBeneficiaryFromList}
            onOpenNewModal={() => setIsEncounterModalOpen(true)}
          />
        )}

        {currentTab === 'workflow' && (
          <AgentWorkflowView
            selectedBeneficiary={selectedBeneficiary}
            onSelectBeneficiary={setSelectedBeneficiary}
            beneficiaries={beneficiaries}
            language={language}
            onOpenCareSlip={(plan) => setActivePlanForCareSlip(plan)}
            onAuditLogUpdate={loadData}
          />
        )}

        {currentTab === 'audit' && (
          <AuditLedgerView auditLogs={auditLogs} />
        )}

        {currentTab === 'impact' && (
          <ImpactDashboardView telemetry={telemetry} />
        )}

        {currentTab === 'compliance' && (
          <HackathonComplianceView />
        )}
      </main>

      {/* Citizen Bilingual Care Slip Modal */}
      {activePlanForCareSlip && (
        <BiLingualCareSlipModal
          plan={activePlanForCareSlip}
          beneficiary={selectedBeneficiary}
          onClose={() => setActivePlanForCareSlip(null)}
          language={language}
        />
      )}

      {/* Log Encounter Modal */}
      <NewEncounterModal
        isOpen={isEncounterModalOpen}
        onClose={() => setIsEncounterModalOpen(false)}
        beneficiaries={beneficiaries}
        onStartEncounter={handleStartCustomEncounter}
      />

      {/* Upgraded Source Code ZIP Download Modal */}
      <DownloadZipModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Quiet Clean Footer (Zero telemetry tickers, plain legal/DPG attribution) */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              SevaSetu AI
            </span>
            <span aria-hidden="true">·</span>
            <span>Bharat Agentic-AI Digital Public Good</span>
            <span aria-hidden="true">·</span>
            <span>Apache-2.0 Open Source</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
            >
              Download Repo (.zip)
            </button>
          </div>
          <div className="text-center sm:text-right text-[11px] text-slate-400">
            <span>Code for a Billion 2026 · Code for India · AgentFoundry IDE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
