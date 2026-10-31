/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr';

export interface Beneficiary {
  id: string;
  abhaId?: string; // Ayushman Bharat Health Account mock
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  village: string;
  contactNumber?: string;
  category: 'Maternal (ANC)' | 'Child Immunization' | 'Tuberculosis (Nikshay)' | 'Senior Entitlement';
  lastVisitDate: string;
  nextScheduledDate: string;
  riskStatus: 'Standard' | 'Attention' | 'High Risk';
  gestationalWeeks?: number;
  infantAgeMonths?: number;
  assignedAsha: string;
  phcCenter: string;
  activeFollowUps: string[];
}

export interface GuidelineCitation {
  id: string;
  title: string;
  authority: string; // e.g. "MoHFW - National Health Mission"
  documentName: string;
  section: string;
  url: string;
  lastUpdated: string;
  summary: string;
  keyRule: string;
}

export interface PlannedToolAction {
  id: string;
  toolName: 'schedule_home_visit' | 'generate_bilingual_slip' | 'alert_phc_officer' | 'sync_abdm_careplan' | 'register_poshan_ration';
  label: string;
  description: string;
  parameters: Record<string, any>;
  requiresApproval: boolean;
  status: 'pending_approval' | 'approved' | 'rejected' | 'executing' | 'completed' | 'failed';
  executionResult?: string;
  executionTimestamp?: string;
}

export interface AgentAnalysisPlan {
  beneficiaryId: string;
  beneficiaryName: string;
  intakeSummary: string;
  language: Language;
  extractedFacts: string[];
  missingContext: string[];
  triageLevel: 'Green (Routine)' | 'Amber (Follow-up Required)' | 'Red (High Risk Triage)';
  triageReasoning: string;
  applicableGuidelines: GuidelineCitation[];
  recommendedSteps: string[];
  actions: PlannedToolAction[];
  generatedAt: string;
  confidenceScore: number;
  isAiGenerated: true;
  nonDiagnosticDisclaimer: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  beneficiaryId: string;
  beneficiaryName: string;
  ashaWorker: string;
  encounterType: string;
  userInput: string;
  sourcesRetrieved: string[];
  agentPlanId: string;
  humanApprovalAction: 'APPROVED' | 'MODIFIED' | 'REJECTED' | 'AUTO_ROUTINE';
  humanApproverRole: string;
  toolsExecuted: string[];
  toolPayload?: any;
  verificationOutcome: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  verificationHash: string; // SHA-256 calculation for immutable audit
  offlineSynced: boolean;
}

export interface ImpactTelemetry {
  totalBeneficiariesTracked: number;
  activeEncountersLogged: number;
  immunizationDropoutsPrevented: number;
  highRiskTriagesPrompted: number;
  paperworkHoursSavedEstimate: number;
  bilingualSlipsGenerated: number;
  abdmRecordsSynced: number;
  offlineActionsBuffered: number;
}
