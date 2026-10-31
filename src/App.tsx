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
import { NewBeneficiaryModal } from './components/NewBeneficiaryModal';
import { INITIAL_BENEFICIARIES } from './data/mockBeneficiaries';
import { Beneficiary, Language, AuditRecord, ImpactTelemetry, AgentAnalysisPlan } from './types';
import { fetchAuditLogs, fetchImpactTelemetry, checkServerHealth } from './services/api';
import { getTranslations } from './i18n/translations';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('workflow');
  const [language, setLanguage] = useState<Language>('en');
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(() => {
    try {
      const stored = localStorage.getItem('sevasetu_beneficiaries');
      return stored ? JSON.parse(stored) : INITIAL_BENEFICIARIES;
    } catch {
      return INITIAL_BENEFICIARIES;
    }
  });
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary>(INITIAL_BENEFICIARIES[0]);
  const [activePlanForCareSlip, setActivePlanForCareSlip] = useState<AgentAnalysisPlan | null>(null);
  const [isEncounterModalOpen, setIsEncounterModalOpen] = useState(false);
  const [isNewBeneficiaryModalOpen, setIsNewBeneficiaryModalOpen] = useState(false);
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

  const t = getTranslations(language);

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

  const handleAddBeneficiary = (newB: Beneficiary) => {
    const updated = [newB, ...beneficiaries];
    setBeneficiaries(updated);
    try {
      localStorage.setItem('sevasetu_beneficiaries', JSON.stringify(updated));
    } catch {}
    setSelectedBeneficiary(newB);
    setCurrentTab('workflow');
  };

  const handleToggleSimulatedOffline = () => {
    setIsOnline((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      {/* Top Bar with Language Selector and Primary Action */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onLanguageChange={setLanguage}
        onNewEncounter={() => setIsEncounterModalOpen(true)}
        isOnline={isOnline}
        onToggleOffline={handleToggleSimulatedOffline}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'beneficiaries' && (
          <BeneficiaryList
            beneficiaries={beneficiaries}
            onSelectBeneficiary={handleSelectBeneficiaryFromList}
            onOpenNewModal={() => setIsNewBeneficiaryModalOpen(true)}
            language={language}
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
          <AuditLedgerView auditLogs={auditLogs} language={language} />
        )}

        {currentTab === 'impact' && (
          <ImpactDashboardView telemetry={telemetry} language={language} />
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
        language={language}
      />

      {/* Register New Beneficiary Modal */}
      <NewBeneficiaryModal
        isOpen={isNewBeneficiaryModalOpen}
        onClose={() => setIsNewBeneficiaryModalOpen(false)}
        onAddBeneficiary={handleAddBeneficiary}
        language={language}
      />

      {/* Clean Legal & Attribution Footer (Zero Zip/Export clutter) */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {t.appName}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t.appSubtitle}</span>
            <span aria-hidden="true">·</span>
            <span>Apache-2.0 Open Source Public Good</span>
            <span aria-hidden="true">·</span>
            <span>MoHFW Clinical Protocol Grounding</span>
          </div>
          <div className="text-center sm:text-right text-[11px] text-slate-400">
            <span>Code for India · Code for a Billion 2026 · AgentFoundry IDE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
