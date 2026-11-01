/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Send, 
  Calendar, 
  User, 
  ExternalLink, 
  Printer, 
  Sparkles, 
  RefreshCw, 
  Check, 
  X, 
  Info,
  QrCode,
  Volume2,
  VolumeX,
  CheckCheck,
  Mic,
  MicOff,
  Activity,
  Layers,
  Wrench,
  BookOpen,
  Sliders,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { Beneficiary, AgentAnalysisPlan, PlannedToolAction, Language } from '../types';
import { requestAgentAnalysis, executeApprovedTool, syncWithCareHub } from '../services/api';
import { MOHFW_DISCLAIMER, AUTHORITATIVE_GUIDELINES } from '../data/authoritativeGuidelines';
import { getTranslations } from '../i18n/translations';
import { EpidemiologicalTimeseriesView } from './EpidemiologicalTimeseriesView';
import { PostEncounterAuditReportModal } from './PostEncounterAuditReportModal';

interface AgentWorkflowViewProps {
  selectedBeneficiary: Beneficiary;
  onSelectBeneficiary: (b: Beneficiary) => void;
  beneficiaries: Beneficiary[];
  language: Language;
  onOpenCareSlip: (plan: AgentAnalysisPlan) => void;
  onAuditLogUpdate: () => void;
}

const WORKFLOW_STEPS = [
  { num: 1, name: 'Need Intake', desc: 'Frontline observation ingestion' },
  { num: 2, name: 'Context Fusion', desc: 'Patient history & ABHA assembly' },
  { num: 3, name: 'MoHFW Protocol', desc: 'Authoritative NHM guidelines retrieval' },
  { num: 4, name: 'Rule Verification', desc: 'Clinical safety boundary audit' },
  { num: 5, name: 'Triage Grade', desc: 'Green / Amber / Red risk categorization' },
  { num: 6, name: 'Care Planning', desc: 'Multi-step action sequencing' },
  { num: 7, name: 'Protocol Citation', desc: 'NHM & UIP directive grounding' },
  { num: 8, name: 'Tool Staging', desc: 'Alerts, schedules & slips staged' },
  { num: 9, name: 'Human Gate', desc: 'ASHA worker mandatory authorization' },
  { num: 10, name: 'Tool Execution', desc: 'SMS/WhatsApp & roster commit' },
  { num: 11, name: 'Outcome Verify', desc: 'Dispatch & schema validation' },
  { num: 12, name: 'Roster Sync', desc: 'ABDM CarePlan index update' },
  { num: 13, name: 'SHA-256 Ledger', desc: 'Immutable cryptographic hash' },
  { num: 14, name: 'Feedback Loop', desc: 'Dynamic re-evaluation' }
];

export const AgentWorkflowView: React.FC<AgentWorkflowViewProps> = ({
  selectedBeneficiary,
  onSelectBeneficiary,
  beneficiaries,
  language,
  onOpenCareSlip,
  onAuditLogUpdate
}) => {
  const t = getTranslations(language);

  // Dynamic preset scenarios localized to selected language
  const presetScenarios = [
    {
      id: 'maternal',
      title: t.scenarioMaternal,
      beneficiaryId: 'BEN-RAJ-0142',
      note: t.scenarioMaternalNote
    },
    {
      id: 'child',
      title: t.scenarioChild,
      beneficiaryId: 'BEN-RAJ-0891',
      note: t.scenarioChildNote
    },
    {
      id: 'tb',
      title: t.scenarioTb,
      beneficiaryId: 'BEN-RAJ-0402',
      note: t.scenarioTbNote
    },
    {
      id: 'senior',
      title: t.scenarioSenior,
      beneficiaryId: 'BEN-RAJ-0915',
      note: t.scenarioSeniorNote
    }
  ];

  const [activeLeftTab, setActiveLeftTab] = useState<'intake' | 'timeseries' | 'guidelines' | 'toolkit'>('intake');
  const [encounterNote, setEncounterNote] = useState(t.scenarioMaternalNote);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<AgentAnalysisPlan | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [actionStatuses, setActionStatuses] = useState<Record<string, PlannedToolAction['status']>>({});
  const [executionLogs, setExecutionLogs] = useState<Record<string, any>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isExecutingAll, setIsExecutingAll] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [showFullStepDetails, setShowFullStepDetails] = useState(false);
  const [isPostEncounterModalOpen, setIsPostEncounterModalOpen] = useState(false);
  const [toolkitLog, setToolkitLog] = useState<string | null>(null);

  // Update encounter note when language changes if currently showing default preset
  useEffect(() => {
    const currentIsPreset = presetScenarios.some(p => p.beneficiaryId === selectedBeneficiary.id);
    if (currentIsPreset) {
      const match = presetScenarios.find(p => p.beneficiaryId === selectedBeneficiary.id);
      if (match) setEncounterNote(match.note);
    }
  }, [language, selectedBeneficiary.id]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const loadScenario = (scenario: typeof presetScenarios[0]) => {
    const b = beneficiaries.find((x) => x.id === scenario.beneficiaryId);
    if (b) {
      onSelectBeneficiary(b);
    }
    setEncounterNote(scenario.note);
    setCurrentPlan(null);
    setActiveStepIndex(0);
    setActionStatuses({});
    setExecutionLogs({});
    setActiveLeftTab('intake');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleRunAgent = async () => {
    if (!encounterNote.trim()) return;
    setIsAnalyzing(true);
    setActiveStepIndex(1);

    try {
      setActiveStepIndex(3);
      const res = await requestAgentAnalysis(selectedBeneficiary, encounterNote, language);
      
      setActiveStepIndex(8);
      setCurrentPlan(res.plan);

      const initialMap: Record<string, PlannedToolAction['status']> = {};
      res.plan.actions.forEach((act) => {
        initialMap[act.id] = act.status;
      });
      setActionStatuses(initialMap);
    } catch (err: any) {
      console.error('Agent workflow error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSpeakGuidance = () => {
    if (!('speechSynthesis' in window) || !currentPlan) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${currentPlan.triageLevel}. ${currentPlan.triageReasoning}. ${currentPlan.recommendedSteps.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleMic = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type or select one of the high-stakes presets.');
      return;
    }

    if (isListeningMic) {
      setIsListeningMic(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => setIsListeningMic(true);
      recognition.onend = () => setIsListeningMic(false);
      recognition.onerror = () => setIsListeningMic(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setEncounterNote((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.start();
    } catch {
      setIsListeningMic(false);
    }
  };

  const handleApproveAction = async (action: PlannedToolAction) => {
    setActionStatuses((prev) => ({ ...prev, [action.id]: 'executing' }));
    setActiveStepIndex(10);

    try {
      const result = await executeApprovedTool(
        action,
        selectedBeneficiary,
        selectedBeneficiary.assignedAsha,
        encounterNote
      );

      setActionStatuses((prev) => ({ ...prev, [action.id]: 'completed' }));
      setExecutionLogs((prev) => ({ ...prev, [action.id]: result }));
      setActiveStepIndex(13);
      onAuditLogUpdate();

      if (action.toolName === 'sync_abdm_careplan') {
        await syncWithCareHub(selectedBeneficiary.id, {
          actionId: action.id,
          triage: currentPlan?.triageLevel
        });
      }
    } catch (err) {
      setActionStatuses((prev) => ({ ...prev, [action.id]: 'failed' }));
    }
  };

  const handleApproveAllActions = async () => {
    if (!currentPlan) return;
    setIsExecutingAll(true);

    const pendingActions = currentPlan.actions.filter(
      act => (actionStatuses[act.id] || act.status) === 'pending_approval'
    );

    for (const act of pendingActions) {
      await handleApproveAction(act);
    }

    setIsExecutingAll(false);
  };

  const handleRejectAction = (actionId: string) => {
    setActionStatuses((prev) => ({ ...prev, [actionId]: 'rejected' }));
  };

  // Manual Symmetrical Tool Execution
  const handleManualToolExecute = async (toolName: PlannedToolAction['toolName'], label: string) => {
    setToolkitLog(`Invoking symmetrical tool: ${toolName}...`);
    const action: PlannedToolAction = {
      id: `manual-tool-${Date.now()}`,
      toolName,
      label,
      description: `Manual operator execution of ${label}`,
      parameters: { beneficiaryId: selectedBeneficiary.id },
      requiresApproval: false,
      status: 'pending_approval'
    };

    try {
      const res = await executeApprovedTool(action, selectedBeneficiary, selectedBeneficiary.assignedAsha, encounterNote);
      setToolkitLog(`Execution Verified: ${res.executionResult} (SHA-256: ${res.verificationHash.slice(0, 16)}...)`);
      onAuditLogUpdate();
    } catch (e: any) {
      setToolkitLog(`Error executing tool: ${e.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Official MoHFW Non-Diagnostic Safety Callout */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl p-4 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">National Health Mission (MoHFW) Non-Diagnostic Boundary</span>
          <span>{MOHFW_DISCLAIMER}</span>
        </div>
      </div>

      {/* 14-Step Agentic Architecture Stepper Tracker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              14-Step Agentic Pipeline Architecture
            </span>
          </div>
          <button
            onClick={() => setShowFullStepDetails(prev => !prev)}
            className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            {showFullStepDetails ? 'Collapse Steps' : 'View All 14 Steps'}
          </button>
        </div>

        {/* Horizontal Mini Step Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {WORKFLOW_STEPS.slice(0, 7).map((step) => {
            const isCompleted = activeStepIndex >= step.num;
            const isCurrent = activeStepIndex === step.num;

            return (
              <div
                key={step.num}
                className={`p-2 rounded-lg border text-center transition-all ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800 font-medium'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 text-[11px]'
                }`}
              >
                <div className="text-[10px] uppercase font-mono tracking-wider">Step {step.num}</div>
                <div className="text-xs font-bold truncate">{step.name}</div>
              </div>
            );
          })}
        </div>

        {showFullStepDetails && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {WORKFLOW_STEPS.slice(7, 14).map((step) => {
              const isCompleted = activeStepIndex >= step.num;
              const isCurrent = activeStepIndex === step.num;

              return (
                <div
                  key={step.num}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800 font-medium'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 text-[11px]'
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono tracking-wider">Step {step.num}</div>
                  <div className="text-xs font-bold truncate">{step.name}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preset Scenario Selector for Evaluators & Frontline Workers */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            {t.presetsTitle}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {language.toUpperCase()} Ground-Truth MoHFW
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presetScenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => loadScenario(s)}
              className="text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 transition-all text-xs cursor-pointer group"
            >
              <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                {s.title}
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                {s.note}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tabbed Observability & Intake Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Navigation Tabs for Left Observability Panel */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveLeftTab('intake')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                activeLeftTab === 'intake'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Intake & Citizen
            </button>
            <button
              onClick={() => setActiveLeftTab('timeseries')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                activeLeftTab === 'timeseries'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Timeseries Vitals
            </button>
            <button
              onClick={() => setActiveLeftTab('guidelines')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                activeLeftTab === 'guidelines'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              MoHFW Clauses
            </button>
            <button
              onClick={() => setActiveLeftTab('toolkit')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                activeLeftTab === 'toolkit'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Action Toolkit
            </button>
          </div>

          {/* Tab 1: Intake & Citizen Context */}
          {activeLeftTab === 'intake' && (
            <div className="space-y-4">
              {/* Active Beneficiary Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      {t.colBeneficiary}
                    </span>
                  </div>
                  <select
                    value={selectedBeneficiary.id}
                    onChange={(e) => {
                      const b = beneficiaries.find((x) => x.id === e.target.value);
                      if (b) onSelectBeneficiary(b);
                    }}
                    aria-label="Select Target Beneficiary"
                    className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md py-1 px-2 cursor-pointer"
                  >
                    {beneficiaries.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {selectedBeneficiary.name}
                    </div>
                    <div className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                      ABHA ID: {selectedBeneficiary.abhaId || 'Pending'} · {selectedBeneficiary.village}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 block">{t.colCategory}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedBeneficiary.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Health Centre</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedBeneficiary.phcCenter}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">{t.registryHeroKpiAsha}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedBeneficiary.assignedAsha}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Next Scheduled Date</span>
                      <span className="font-semibold font-mono tabular-nums text-slate-800 dark:text-slate-200">
                        {selectedBeneficiary.nextScheduledDate}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      Active Follow-up Checklist:
                    </span>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc pl-4">
                      {selectedBeneficiary.activeFollowUps.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Intake Note Input Form with Voice Dictation */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="encounter-notes" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {t.encounterNotesLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleMic}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        isListeningMic
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                      title="Speak your observation (Hindi/English Voice Input)"
                    >
                      {isListeningMic ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{isListeningMic ? 'Listening...' : 'Voice Dictation'}</span>
                    </button>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {language.toUpperCase()}
                    </span>
                  </div>
                </div>

                <textarea
                  id="encounter-notes"
                  rows={4}
                  value={encounterNote}
                  onChange={(e) => setEncounterNote(e.target.value)}
                  placeholder={t.encounterNotesPlaceholder}
                  className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                />

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Engine: <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">Gemini 3.8 + NHM Rules</span>
                  </span>
                  <button
                    onClick={handleRunAgent}
                    disabled={isAnalyzing || !encounterNote.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>{t.btnRunningAgent}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{t.btnRunAgent}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Epidemiological Timeseries Vitals */}
          {activeLeftTab === 'timeseries' && (
            <EpidemiologicalTimeseriesView language={language} />
          )}

          {/* Tab 3: Authoritative MoHFW Clauses */}
          {activeLeftTab === 'guidelines' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Official NHM Protocols Retrieved
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {AUTHORITATIVE_GUIDELINES.length} Registered Directives
                </span>
              </div>

              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {AUTHORITATIVE_GUIDELINES.map((g) => (
                  <div key={g.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{g.title}</span>
                      <a href={g.url} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline inline-flex items-center gap-1 shrink-0">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">{g.authority} · {g.section}</div>
                    <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      <strong>Directive:</strong> {g.keyRule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Frontline Symmetrical Action Toolkit */}
          {activeLeftTab === 'toolkit' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Symmetrical Action Toolkit
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-mono">
                  Symmetrical Primitives
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Frontline health workers can directly trigger the exact same actions that the AI co-pilot executes.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleManualToolExecute('alert_phc_officer', 'Dispatch Urgent PHC Red-Flag Alert')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/30 transition-colors text-xs cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">1. Alert PHC Medical Officer</span>
                    <span className="text-slate-500 text-[11px]">Generate high-priority SMS/WhatsApp danger referral</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleManualToolExecute('schedule_home_visit', 'Lock Doorstep VHSND Visit')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-colors text-xs cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">2. Lock ASHA Calendar Home Visit</span>
                    <span className="text-slate-500 text-[11px]">Commit doorstep follow-up within 48-hour window</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleManualToolExecute('sync_abdm_careplan', 'Validate HL7 FHIR R4 Bundle')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:bg-sky-50/50 dark:hover:bg-sky-950/30 transition-colors text-xs cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">3. Sync ABDM & xSpan CareHub</span>
                    <span className="text-slate-500 text-[11px]">Validate encounter against HL7 FHIR R4 standard</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {toolkitLog && (
                <div className="p-3 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-lg border border-slate-800">
                  {toolkitLog}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Autonomous Agent Co-Pilot & Step Stream */}
        <div className="lg:col-span-7 space-y-5">
          {!currentPlan && !isAnalyzing ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-10 text-center text-slate-500">
              <Sparkles className="w-8 h-8 mx-auto text-emerald-500 mb-3" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                {t.workflowTitle}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-4 leading-relaxed">
                {t.workflowSubtitle}. Select a curated scenario or type an observation, then click "Run Agentic Pipeline" to observe the step-by-step reasoning loop.
              </p>
              <button
                onClick={handleRunAgent}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {t.btnRunAgent}
              </button>
            </div>
          ) : isAnalyzing ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
              <RefreshCw className="w-8 h-8 mx-auto text-emerald-600 animate-spin mb-3" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                {t.btnRunningAgent}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Matching against UIP, PMSMA, and Ni-kshay national protocols
              </p>
            </div>
          ) : currentPlan ? (
            <div className="space-y-5">
              {/* Triage & Assessment Banner with Voice TTS */}
              <div
                className={`p-4 rounded-xl border ${
                  currentPlan.triageLevel.includes('Red') || currentPlan.triageLevel.includes('लाल')
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200'
                    : currentPlan.triageLevel.includes('Amber') || currentPlan.triageLevel.includes('पीला')
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block opacity-90">
                      Triage Evaluation (MoHFW Grounded)
                    </span>
                    <h3 className="text-base font-extrabold mt-0.5">
                      {currentPlan.triageLevel}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Voice Audio TTS Button */}
                    <button
                      onClick={handleSpeakGuidance}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-white/90 dark:bg-slate-900/90 shadow-2xs hover:bg-white transition-all cursor-pointer border border-current/20"
                      title="Read aloud recommendations in selected language"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                          <span>{t.btnStopAudio}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.btnListenAudio}</span>
                        </>
                      )}
                    </button>

                    <span className="text-xs font-mono font-bold bg-white/60 dark:bg-slate-900/60 px-2 py-1 rounded">
                      Confidence: {(currentPlan.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <p className="text-xs mt-2.5 leading-relaxed font-medium">
                  {currentPlan.triageReasoning}
                </p>
              </div>

              {/* Real-Time Agent Investigation Stream (TraceBack AI style) */}
              {currentPlan.investigationStream && currentPlan.investigationStream.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                        Agent Investigation Stream & Thought Trace
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                      Symmetrical Primitives
                    </span>
                  </div>

                  <div className="space-y-3">
                    {currentPlan.investigationStream.map((st) => (
                      <div
                        key={st.id}
                        className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                              {st.stepNumber}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white">
                              {st.title}
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                            st.status === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {st.status}
                          </span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 italic pl-7">
                          "{st.thought}"
                        </p>

                        <div className="pl-7 space-y-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
                          <span className="font-semibold text-slate-500 uppercase block text-[10px]">Cited Evidence & Telemetry:</span>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-700 dark:text-slate-300">
                            {st.evidenceCited.map((ev, i) => (
                              <li key={i}>{ev}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Next Steps */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                  {t.sectionRecommendedSteps}
                </span>
                <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-decimal pl-4 font-medium">
                  {currentPlan.recommendedSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Human-in-the-Loop Action Approval Gate */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-emerald-600/40 dark:border-emerald-500/40 p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                      {t.sectionToolExecution}
                    </span>
                    <span className="text-xs text-slate-500">
                      ASHA Worker or ANM Supervisor Authorization Required
                    </span>
                  </div>

                  {/* Approve All Button */}
                  <button
                    onClick={handleApproveAllActions}
                    disabled={isExecutingAll}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>{t.btnApproveAll}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {currentPlan.actions.map((act) => {
                    const status = actionStatuses[act.id] || act.status;
                    const log = executionLogs[act.id];

                    return (
                      <div
                        key={act.id}
                        className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                              <span>{act.label}</span>
                              {act.requiresApproval && (
                                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">
                                  Requires Approval
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                              {act.description}
                            </p>
                          </div>

                          {/* Approval / Execution Buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            {status === 'pending_approval' ? (
                              <>
                                <button
                                  onClick={() => handleRejectAction(act.id)}
                                  className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                                >
                                  Decline
                                </button>
                                <button
                                  onClick={() => handleApproveAction(act)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md shadow-xs transition-colors cursor-pointer"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{t.btnApproveAction}</span>
                                </button>
                              </>
                            ) : status === 'executing' ? (
                              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Verifying Execution...</span>
                              </div>
                            ) : status === 'completed' ? (
                              <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-1 rounded">
                                <CheckCircle className="w-4 h-4" />
                                <span>{t.btnApproved}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 font-medium">Rejected</span>
                            )}
                          </div>
                        </div>

                        {/* Tool Execution Result & Cryptographic Hash */}
                        {log && (
                          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs space-y-2">
                            <div className="text-emerald-700 dark:text-emerald-300 font-bold">
                              Outcome: {log.executionResult}
                            </div>

                            {/* Actionable Dispatch Details for PHC Alert */}
                            {log.toolPayload?.smsDraft && (
                              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
                                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                  <span>Generated Referral Alert Draft:</span>
                                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Direct ASHA Dispatch</span>
                                </div>
                                <div className="p-2 bg-slate-50 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-200 rounded select-all border border-slate-200 dark:border-slate-700">
                                  {log.toolPayload.smsDraft}
                                </div>
                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                  <a
                                    href={log.toolPayload.smsDeepLink}
                                    className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 rounded-md inline-flex items-center gap-1.5"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Dispatch via Device SMS</span>
                                  </a>
                                  <a
                                    href={log.toolPayload.whatsappDeepLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/70 rounded-md inline-flex items-center gap-1.5"
                                  >
                                    <span>Open in WhatsApp</span>
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Confirmed Visit in Calendar Roster */}
                            {log.toolPayload?.visit && (
                              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-md border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200">
                                <span className="font-bold block">Confirmed In ASHA Roster:</span>
                                <div>Visit ID: {log.toolPayload.visit.visitId} · Date: {log.toolPayload.visit.scheduledDate} ({log.toolPayload.visit.status})</div>
                              </div>
                            )}

                            {/* View Care Slip Action */}
                            {act.toolName === 'generate_bilingual_slip' && (
                              <div className="pt-1">
                                <button
                                  onClick={() => onOpenCareSlip(currentPlan)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-md border border-emerald-300 dark:border-emerald-800 cursor-pointer"
                                >
                                  <QrCode className="w-3.5 h-3.5" />
                                  <span>{t.btnViewCareSlip}</span>
                                </button>
                              </div>
                            )}

                            <div className="text-slate-400 font-mono text-[11px] flex flex-wrap items-center gap-2 pt-1">
                              <span>SHA-256 Hash: {log.verificationHash ? log.verificationHash.slice(0, 18) : '4f8a...'}...</span>
                              <span aria-hidden="true">·</span>
                              <span>Timestamp: {new Date(log.executionTimestamp).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Bar: Official Audit Report & Care Slip Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-400 font-mono">
                  {t.disclaimerText}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsPostEncounterModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Generate Clinical Audit Report</span>
                  </button>

                  <button
                    onClick={() => onOpenCareSlip(currentPlan)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t.btnViewCareSlip}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Official Post-Encounter Clinical Audit Report Modal (TraceBack AI Post-Mortem equivalent) */}
      <PostEncounterAuditReportModal
        isOpen={isPostEncounterModalOpen}
        onClose={() => setIsPostEncounterModalOpen(false)}
        plan={currentPlan}
        beneficiary={selectedBeneficiary}
        language={language}
      />
    </div>
  );
};
