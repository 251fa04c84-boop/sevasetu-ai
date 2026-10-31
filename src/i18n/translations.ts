/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

export interface Translations {
  // Navigation & Branding
  appName: string;
  appSubtitle: string;
  tabRegistry: string;
  tabWorkflow: string;
  tabAudit: string;
  tabImpact: string;
  tabCompliance: string;
  btnLogEncounter: string;
  statusOnline: string;
  statusOffline: string;

  // Beneficiary Registry
  registryHeroTitle: string;
  registryHeroSubtitle: string;
  registryHeroKpiSubcentre: string;
  registryHeroKpiAsha: string;
  registryHeroKpiTotal: string;
  searchPlaceholder: string;
  filterAllCategories: string;
  filterAllRisks: string;
  colName: string;
  colAgeGender: string;
  colCategory: string;
  colVillagePhc: string;
  colRisk: string;
  colNextAction: string;
  btnStartTriage: string;
  btnRegisterNew: string;
  maternalCategory: string;
  childCategory: string;
  tbCategory: string;
  seniorCategory: string;
  riskHigh: string;
  riskAttention: string;
  riskStandard: string;

  // Agent Workflow
  workflowTitle: string;
  workflowSubtitle: string;
  presetsTitle: string;
  scenarioMaternal: string;
  scenarioMaternalNote: string;
  scenarioChild: string;
  scenarioChildNote: string;
  scenarioTb: string;
  scenarioTbNote: string;
  scenarioSenior: string;
  scenarioSeniorNote: string;
  encounterNotesLabel: string;
  encounterNotesPlaceholder: string;
  btnRunAgent: string;
  btnRunningAgent: string;
  btnListenAudio: string;
  btnStopAudio: string;
  sectionGuidelineCitations: string;
  sectionExtractedFacts: string;
  sectionMissingContext: string;
  sectionRecommendedSteps: string;
  sectionToolExecution: string;
  triageHighRisk: string;
  triageAttention: string;
  triageRoutine: string;
  btnApproveAction: string;
  btnApproved: string;
  btnViewCareSlip: string;
  btnApproveAll: string;
  disclaimerText: string;

  // Audit Ledger
  auditTitle: string;
  auditSubtitle: string;
  btnVerifyHashes: string;
  btnHashesVerified: string;
  btnExportCsv: string;
  colTimestamp: string;
  colBeneficiary: string;
  colAction: string;
  colApprover: string;
  colHash: string;
  colStatus: string;

  // Impact Telemetry
  impactTitle: string;
  impactSubtitle: string;
  kpiBeneficiaries: string;
  kpiEncounters: string;
  kpiDropoutsPrevented: string;
  kpiHighRiskTriages: string;
  kpiHoursSaved: string;
  kpiSlipsGenerated: string;
  kpiAbdmSynced: string;

  // Modals
  newEncounterTitle: string;
  selectBeneficiaryLabel: string;
  notesLabel: string;
  btnCancel: string;
  btnStartEncounter: string;
  careSlipTitle: string;
  careSlipPrint: string;
  careSlipClose: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'SevaSetu AI',
    appSubtitle: 'Bharat DPG',
    tabRegistry: 'Beneficiary Registry',
    tabWorkflow: 'Agentic Workflow',
    tabAudit: 'Audit Ledger',
    tabImpact: 'Impact Telemetry',
    tabCompliance: 'Hackathon Compliance',
    btnLogEncounter: '+ Log Encounter',
    statusOnline: 'Online',
    statusOffline: 'Offline Cache',

    registryHeroTitle: 'Community Health Worker & Citizen Follow-up Registry',
    registryHeroSubtitle: 'Assistive decision support for India\'s 1.04 million ASHA workers with verified MoHFW protocol grounding, non-diagnostic triage, and auditable care coordination.',
    registryHeroKpiSubcentre: 'Village Sub-centre',
    registryHeroKpiAsha: 'Assigned ASHA',
    registryHeroKpiTotal: 'Active Personas',
    searchPlaceholder: 'Search by citizen name, village, or ABHA ID...',
    filterAllCategories: 'All Health Categories',
    filterAllRisks: 'All Risk Priorities',
    colName: 'Beneficiary / ABHA',
    colAgeGender: 'Age / Gender',
    colCategory: 'Category',
    colVillagePhc: 'Village / PHC Sub-Centre',
    colRisk: 'Risk Priority',
    colNextAction: 'Next Action & Care Steps',
    btnStartTriage: 'Launch Triage',
    btnRegisterNew: '+ Register New Citizen',
    maternalCategory: 'Maternal (ANC)',
    childCategory: 'Child Immunization',
    tbCategory: 'Tuberculosis (Nikshay)',
    seniorCategory: 'Senior Entitlement',
    riskHigh: 'High Risk',
    riskAttention: 'Attention',
    riskStandard: 'Standard',

    workflowTitle: '14-Step Agentic Care & Triage Pipeline',
    workflowSubtitle: 'MoHFW Protocol-Grounded Assistive Decision Support with Human-in-the-Loop Safeguards',
    presetsTitle: 'Quick High-Stakes Field Scenarios (One-Click Test):',
    scenarioMaternal: 'Maternal ANC Danger Sign (Sunita Devi, 28w)',
    scenarioMaternalNote: 'Beneficiary complains of persistent severe frontal headache for 2 days, swelling in both feet and ankles, and feeling dizzy when standing up. Missed 3rd routine ANC checkup.',
    scenarioChild: 'Child Immunization Dropout (Aarav Kumar, 11m)',
    scenarioChildNote: 'Family returned from seasonal brick kiln migration. Child is 11 months old and has not received Measles-Rubella (MR-1) or Vitamin A oral drops due at 9 months.',
    scenarioTb: 'TB Treatment Interruption (Ramesh Patel)',
    scenarioTbNote: 'Patient stopped taking morning 4FD tablets 4 days ago due to severe stomach upset and nausea. Ni-kshay Poshan DBT assistance of ₹500 is not arriving in bank account.',
    scenarioSenior: 'Senior Citizen PM-JAY Universal 70+ (Kamala Bai)',
    scenarioSeniorNote: '72-year-old widow with chronic knee osteoarthritis. Needs guidance and mobile e-KYC assistance to generate Ayushman Bharat Golden Card for ₹5 lakh cashless cover.',
    encounterNotesLabel: 'ASHA Field Notes & Citizen Observations',
    encounterNotesPlaceholder: 'Enter symptoms, observations, or field questions...',
    btnRunAgent: 'Run Agentic Pipeline',
    btnRunningAgent: 'Evaluating MoHFW Protocols...',
    btnListenAudio: 'Listen (Audio TTS)',
    btnStopAudio: 'Stop Audio',
    sectionGuidelineCitations: 'Authoritative MoHFW Guideline Citations',
    sectionExtractedFacts: 'Extracted Clinical Observations',
    sectionMissingContext: 'Identified Missing Context',
    sectionRecommendedSteps: 'Recommended Protocol Actions',
    sectionToolExecution: 'Planned Actions & Tool Approvals (Human-in-the-Loop)',
    triageHighRisk: 'Red (High Risk Triage - Urgent Escalation)',
    triageAttention: 'Amber (Attention - Active Follow-up Needed)',
    triageRoutine: 'Green (Routine Community Protocol)',
    btnApproveAction: 'Approve & Execute',
    btnApproved: 'Executed & Verified',
    btnViewCareSlip: 'View Bilingual Care Slip',
    btnApproveAll: 'Approve & Execute All Actions',
    disclaimerText: 'Strictly non-diagnostic assistive support. All clinical authority remains with Medical Officers.',

    auditTitle: 'Cryptographic SHA-256 Audit Ledger',
    auditSubtitle: 'Tamper-proof verifiable log of every AI plan, human approval gate, and executed action.',
    btnVerifyHashes: 'Verify Cryptographic Integrity',
    btnHashesVerified: 'All Hashes Cryptographically Verified',
    btnExportCsv: 'Export Audit Log (.csv)',
    colTimestamp: 'Timestamp',
    colBeneficiary: 'Beneficiary',
    colAction: 'Encounter / Action Executed',
    colApprover: 'Human Gate / Role',
    colHash: 'SHA-256 Integrity Hash',
    colStatus: 'Verification Status',

    impactTitle: 'National Health Mission Impact Telemetry',
    impactSubtitle: 'Real-time quantified outcomes demonstrating dropout prevention, triage efficiency, and paperwork reduction.',
    kpiBeneficiaries: 'Total Beneficiaries Tracked',
    kpiEncounters: 'Active Encounters Logged',
    kpiDropoutsPrevented: 'Immunization Dropouts Prevented',
    kpiHighRiskTriages: 'High-Risk Triages Escalated',
    kpiHoursSaved: 'Paperwork Hours Saved',
    kpiSlipsGenerated: 'Bilingual Care Slips Issued',
    kpiAbdmSynced: 'ABDM FHIR Records Synced',

    newEncounterTitle: 'Log Frontline Health Encounter',
    selectBeneficiaryLabel: 'Select Village Beneficiary',
    notesLabel: 'Encounter Observation / Symptoms / Notes',
    btnCancel: 'Cancel',
    btnStartEncounter: 'Start Agent Analysis',
    careSlipTitle: 'Verified Beneficiary Care Slip',
    careSlipPrint: 'Print / Save PDF',
    careSlipClose: 'Close'
  },

  hi: {
    appName: 'सेवासेतु AI',
    appSubtitle: 'भारत डिजिटल पब्लिक गुड',
    tabRegistry: 'लाभार्थी रजिस्टर',
    tabWorkflow: 'एजेंटिक कार्यप्रवाह',
    tabAudit: 'ऑडिट लेजर',
    tabImpact: 'प्रभाव मेट्रिक्स',
    tabCompliance: 'हैकथॉन अनुपालन',
    btnLogEncounter: '+ नया परामर्श दर्ज करें',
    statusOnline: 'ऑनलाइन',
    statusOffline: 'ऑफ़लाइन कैश',

    registryHeroTitle: 'सामुदायिक स्वास्थ्य कार्यकर्ता एवं नागरिक फॉलो-अप रजिस्टर',
    registryHeroSubtitle: 'भारत के 10.4 लाख आशा कार्यकर्ताओं के लिए MoHFW प्रोटोकॉल आधारित सहायक निर्णय प्रणाली, गैर-नैदानिक ट्रायज और जवाबदेह स्वास्थ्य समन्वय।',
    registryHeroKpiSubcentre: 'ग्राम उप-केंद्र',
    registryHeroKpiAsha: 'नियुक्त आशा कार्यकर्ता',
    registryHeroKpiTotal: 'सक्रिय नागरिक',
    searchPlaceholder: 'नागरिक का नाम, गांव या आभा (ABHA) आईडी खोजें...',
    filterAllCategories: 'सभी स्वास्थ्य श्रेणियां',
    filterAllRisks: 'सभी प्राथमिकता स्तर',
    colName: 'नागरिक / आभा आईडी',
    colAgeGender: 'आयु / लिंग',
    colCategory: 'श्रेणी',
    colVillagePhc: 'गांव / प्राथमिक स्वास्थ्य केंद्र',
    colRisk: 'जोखिम स्तर',
    colNextAction: 'आगामी आवश्यक कदम एवं कार्य',
    btnStartTriage: 'परामर्श शुरू करें',
    btnRegisterNew: '+ नया नागरिक जोड़ें',
    maternalCategory: 'मातृ स्वास्थ्य (ANC)',
    childCategory: 'बाल टीकाकरण',
    tbCategory: 'क्षय रोग / टीबी (निक्षय)',
    seniorCategory: 'वरिष्ठ नागरिक योजना',
    riskHigh: 'उच्च जोखिम',
    riskAttention: 'ध्यान दें',
    riskStandard: 'सामान्य',

    workflowTitle: '14-चरणीय एजेंटिक देखभाल एवं ट्रायज पाइपलाइन',
    workflowSubtitle: 'स्वास्थ्य मंत्रालय (MoHFW) प्रोटोकॉल आधारित सहायक निर्णय समर्थन एवं मानव अनुमोदन सुरक्षा',
    presetsTitle: 'त्वरित महत्वपूर्ण परिदृश्य (एक-क्लिक परीक्षण):',
    scenarioMaternal: 'मातृ एएनसी खतरे के लक्षण (सुनीता देवी, 28 सप्ताह)',
    scenarioMaternalNote: 'लाभार्थी को 2 दिनों से लगातार तेज सिरदर्द, दोनों पैरों और टखनों में सूजन, और खड़े होने पर चक्कर आने की शिकायत है। तीसरी नियमित एएनसी जांच छूट गई है।',
    scenarioChild: 'बाल टीकाकरण ड्रॉपआउट (आरव कुमार, 11 माह)',
    scenarioChildNote: 'परिवार ईंट भट्ठा मौसमी प्रवास से वापस लौटा है। बच्चा 11 महीने का है और उसे 9 महीने पर लगने वाला खसरा-रूबेला (MR-1) और विटामिन ए की खुराक नहीं मिली है।',
    scenarioTb: 'टीबी उपचार में रुकावट (रमेश पटेल)',
    scenarioTbNote: 'मरीज ने पेट में तेज दर्द और उल्टी के कारण 4 दिन पहले सुबह की 4FD गोलियां लेना बंद कर दिया। निक्षय पोषण योजना की ₹500 सहायता बैंक में नहीं पहुंची है।',
    scenarioSenior: 'वरिष्ठ नागरिक आयुष्मान वय वंदना 70+ (कमला बाई)',
    scenarioSeniorNote: '72 वर्षीय विधवा, घुटनों के पुराने ऑस्टियोआर्थराइटिस से पीड़ित। ₹5 लाख कैशलेस कवर हेतु आयुष्मान भारत गोल्डन कार्ड ई-केवाईसी में सहायता की आवश्यकता है।',
    encounterNotesLabel: 'आशा कार्यकर्ता फील्ड अवलोकन एवं नागरिक की शिकायत',
    encounterNotesPlaceholder: 'लक्षण, शिकायत या फील्ड अवलोकन यहां लिखें...',
    btnRunAgent: 'एजेंटिक पाइपलाइन चलाएं',
    btnRunningAgent: 'MoHFW प्रोटोकॉल जांच जारी है...',
    btnListenAudio: 'ऑडियो सुनें (TTS)',
    btnStopAudio: 'ऑडियो रोकें',
    sectionGuidelineCitations: 'लागू आधिकारिक MoHFW दिशानिर्देश',
    sectionExtractedFacts: 'निकाले गए मुख्य अवलोकन',
    sectionMissingContext: 'आवश्यक अपूर्ण जानकारी',
    sectionRecommendedSteps: 'अनुशंसित प्रोटोकॉल कार्यवाही',
    sectionToolExecution: 'प्रस्तावित उपकरण एवं मानव अनुमोदन',
    triageHighRisk: 'लाल (उच्च जोखिम - तत्काल पीएचसी रेफरल आवश्यक)',
    triageAttention: 'पीला (सावधानी - सक्रिय फॉलो-अप आवश्यक)',
    triageRoutine: 'हरा (सामान्य नियमित सामुदायिक प्रोटोकॉल)',
    btnApproveAction: 'स्वीकृत एवं निष्पादित करें',
    btnApproved: 'सफलतापूर्वक निष्पादित',
    btnViewCareSlip: 'द्विभाषी नागरिक पर्ची देखें',
    btnApproveAll: 'सभी कार्यों को एक साथ अनुमोदित करें',
    disclaimerText: 'यह प्रणाली केवल गैर-नैदानिक निर्णय सहायता के लिए है। अंतिम नैदानिक निर्णय केवल चिकित्सक द्वारा लिया जाता है।',

    auditTitle: 'क्रिप्टोग्राफिक SHA-256 ऑडिट लेजर',
    auditSubtitle: 'प्रत्येक एआई योजना, मानव अनुमोदन और निष्पादित क्रिया का अपरिवर्तनीय सुरक्षित रिकॉर्ड।',
    btnVerifyHashes: 'क्रिप्टोग्राफिक सत्यनिष्ठा सत्यापित करें',
    btnHashesVerified: 'सभी हैश क्रिप्टोग्राफिक रूप से सत्यापित एवं सुरक्षित',
    btnExportCsv: 'ऑडिट लॉग डाउनलोड करें (.csv)',
    colTimestamp: 'समय / दिनांक',
    colBeneficiary: 'नागरिक',
    colAction: 'परामर्श / निष्पादित कार्य',
    colApprover: 'मानव अनुमोदक / भूमिका',
    colHash: 'SHA-256 अखंडता हैश',
    colStatus: 'सत्यापन स्थिति',

    impactTitle: 'राष्ट्रीय स्वास्थ्य मिशन प्रभाव मेट्रिक्स',
    impactSubtitle: 'टीकाकरण ड्रॉपआउट रोकथाम, ट्रायज गति और कागजी काम में कमी के वास्तविक परिणाम।',
    kpiBeneficiaries: 'कुल ट्रैक किए गए नागरिक',
    kpiEncounters: 'दर्ज किए गए परामर्श',
    kpiDropoutsPrevented: 'रोके गए टीकाकरण ड्रॉपआउट',
    kpiHighRiskTriages: 'पहचाने गए गंभीर मामले',
    kpiHoursSaved: 'बचाए गए कागजी घंटे',
    kpiSlipsGenerated: 'जारी की गई द्विभाषी पर्चियां',
    kpiAbdmSynced: 'ABDM FHIR सिंक किए गए रिकॉर्ड',

    newEncounterTitle: 'नया स्वास्थ्य परामर्श दर्ज करें',
    selectBeneficiaryLabel: 'ग्राम लाभार्थी चुनें',
    notesLabel: 'परामर्श अवलोकन / लक्षण / नोट्स',
    btnCancel: 'रद्द करें',
    btnStartEncounter: 'एजेंट विश्लेषण शुरू करें',
    careSlipTitle: 'सत्यापित नागरिक देखभाल पर्ची',
    careSlipPrint: 'प्रिंट / पीडीएफ सुरक्षित करें',
    careSlipClose: 'बंद करें'
  },

  ta: {
    appName: 'சேவாசேது AI',
    appSubtitle: 'பாரத் டிஜிட்டல் பப்ளிக் குட்',
    tabRegistry: 'பயனாளி பதிவேடு',
    tabWorkflow: 'செயல்முறை பணிப்பாய்வு',
    tabAudit: 'தணிக்கை பதிவு',
    tabImpact: 'தாக்க அளவீடுகள்',
    tabCompliance: 'விதிமுறைகள் இணக்கம்',
    btnLogEncounter: '+ புதிய ஆலோசனை',
    statusOnline: 'ஆன்லைன்',
    statusOffline: 'ஆஃப்லைன் சேமிப்பு',

    registryHeroTitle: 'சமூக சுகாதார பணியாளர் மற்றும் குடிமக்கள் பதிவேடு',
    registryHeroSubtitle: 'இந்தியாவின் ஆஷா பணியாளர்களுக்கான தேசிய நலவாழ்வு நெறிமுறை வழிகாட்டுதல் மற்றும் ஆலோசனை உதவி.',
    registryHeroKpiSubcentre: 'கிராம துணை மையம்',
    registryHeroKpiAsha: 'ஒதுக்கப்பட்ட ஆஷா',
    registryHeroKpiTotal: 'செயலில் உள்ள பயனாளிகள்',
    searchPlaceholder: 'பெயர், கிராமம் அல்லது ஆபா (ABHA) எண் தேடுங்கள்...',
    filterAllCategories: 'அனைத்து பிரிவுகள்',
    filterAllRisks: 'அனைத்து முன்னுரிமைகள்',
    colName: 'பயனாளி / ஆபா',
    colAgeGender: 'வயது / பாலினம்',
    colCategory: 'பிரிவு',
    colVillagePhc: 'கிராமம் / ஆரம்ப சுகாதார நிலையம்',
    colRisk: 'ஆபத்து நிலை',
    colNextAction: 'அடுத்த கட்ட நடவடிக்கைகள்',
    btnStartTriage: 'பரிசீலனை தொடங்கவும்',
    btnRegisterNew: '+ புதிய பயனாளி',
    maternalCategory: 'தாய்மை நலம் (ANC)',
    childCategory: 'குழந்தை தடுப்பூசி',
    tbCategory: 'காசநோய் (Nikshay)',
    seniorCategory: 'முதியோர் நலம்',
    riskHigh: 'அதிக ஆபத்து',
    riskAttention: 'கவனம் தேவை',
    riskStandard: 'சாதாரண நிலை',

    workflowTitle: '14-படிநிலை மருத்துவ வழிகாட்டுதல்',
    workflowSubtitle: 'MoHFW நெறிமுறை அடிப்படையிலான முடிவெடுக்கும் ஆதரவு',
    presetsTitle: 'முக்கிய கள சூழ்நிலைகள் (ஒரு கிளிக் சோதனை):',
    scenarioMaternal: 'கர்ப்பகால ஆபத்து அறிகுறிகள் (சுனிதா தேவி, 28 வாரம்)',
    scenarioMaternalNote: 'பயனாளிக்கு 2 நாட்களாக கடுமையான தலைவலி, பாதங்களில் வீக்கம் மற்றும் மயக்கம். 3வது பரிசோதனை தவறியது.',
    scenarioChild: 'குழந்தை தடுப்பூசி இடைநிறுத்தம் (ஆரவ் குமார், 11 மாதம்)',
    scenarioChildNote: 'குடும்பம் இடம்பெயர்ந்து திரும்பியுள்ளது. குழந்தைக்கு 9 மாத தட்டம்மை (MR-1) மற்றும் வைட்டமின் ஏ சொட்டு மருந்து விடுபட்டுள்ளது.',
    scenarioTb: 'டிபி சிகிச்சை இடைநிறுத்தம் (ரமேஷ் படேல்)',
    scenarioTbNote: 'வயிற்று உபாதை காரணமாக மாத்திரைகளை நிறுத்தியுள்ளார். ஊட்டச்சத்து உதவித்தொகை வங்கிக்கு வரவில்லை.',
    scenarioSenior: 'முதியோர் ஆயுஷ்மான் பாரத் (கமலா பாய், 72)',
    scenarioSeniorNote: 'மூட்டுவலியால் அவதிப்படும் 72 வயது பெண்மணிக்கு 5 லட்சம் ரூபாய்க்கான இலவச அட்டை தேவைப்படுகிறது.',
    encounterNotesLabel: 'ஆஷா கள குறிப்புகள் மற்றும் அறிகுறிகள்',
    encounterNotesPlaceholder: 'அறிகுறிகள் அல்லது குறிப்புகளை உள்ளிடவும்...',
    btnRunAgent: 'பணிப்பாய்வை இயக்கவும்',
    btnRunningAgent: 'நெறிமுறைகள் மதிப்பாய்வு செய்யப்படுகின்றன...',
    btnListenAudio: 'குரல் வழியே கேட்க (TTS)',
    btnStopAudio: 'நிறுத்து',
    sectionGuidelineCitations: 'பொருந்தக்கூடிய MoHFW வழிகாட்டுதல்கள்',
    sectionExtractedFacts: 'கண்டறியப்பட்ட முக்கிய தகவல்கள்',
    sectionMissingContext: 'விடுபட்ட விவரங்கள்',
    sectionRecommendedSteps: 'பரிந்துரைக்கப்பட்ட அடுத்த நடவடிக்கைகள்',
    sectionToolExecution: 'திட்டமிடப்பட்ட கருவிகள் மற்றும் ஒப்புதல்',
    triageHighRisk: 'சிவப்பு (உடனடி மருத்துவமனை பரிந்துரை தேவை)',
    triageAttention: 'மஞ்சள் (தொடர் கவனிப்பு தேவை)',
    triageRoutine: 'பச்சை (சாதாரண வழக்கமான நடைமுறை)',
    btnApproveAction: 'ஒப்புதல் அளித்து செயல்படுத்தவும்',
    btnApproved: 'செயல்படுத்தப்பட்டது',
    btnViewCareSlip: 'இருமொழி சீட்டைக் காண்க',
    btnApproveAll: 'அனைத்து நடவடிக்கைகளையும் ஒப்புதல் செய்க',
    disclaimerText: 'இது மருத்துவர் அல்லாத வழிகாட்டுதல் மட்டுமே. மருத்துவ முடிவுகள் மருத்துவரால் மட்டுமே எடுக்கப்படும்.',

    auditTitle: 'பாதுகாப்பான SHA-256 தணிக்கை பதிவு',
    auditSubtitle: 'ஒவ்வொரு முடிவும் மனித ஒப்புதலும் மாற்ற முடியாத வகையில் பதிவு செய்யப்படுகிறது.',
    btnVerifyHashes: 'பாதுகாப்பை சரிபார்க்கவும்',
    btnHashesVerified: 'அனைத்து பதிவுகளும் பாதுகாப்பாக உள்ளன',
    btnExportCsv: 'பதிவிறக்கு (.csv)',
    colTimestamp: 'நேரம் / தேதி',
    colBeneficiary: 'பயனாளி',
    colAction: 'நடவடிக்கை',
    colApprover: 'ஒப்புதல் அளித்தவர்',
    colHash: 'SHA-256 குறியீடு',
    colStatus: 'நிலை',

    impactTitle: 'தேசிய நலவாழ்வு இயக்க தாக்க அளவீடுகள்',
    impactSubtitle: 'தடுப்பூசி கைவிடப்படுவதை தடுத்தல் மற்றும் நேர சேமிப்பு அளவீடுகள்.',
    kpiBeneficiaries: 'மொத்த பயனாளிகள்',
    kpiEncounters: 'பதிவு செய்யப்பட்ட ஆலோசனைகள்',
    kpiDropoutsPrevented: 'தடுக்கப்பட்ட தடுப்பூசி இடைநிறுத்தங்கள்',
    kpiHighRiskTriages: 'கண்டறியப்பட்ட அவசர வழக்குகள்',
    kpiHoursSaved: 'சேமிக்கப்பட்ட ஆவண நேரம்',
    kpiSlipsGenerated: 'வழங்கப்பட்ட சீட்டுகள்',
    kpiAbdmSynced: 'ABDM ஒருங்கிணைக்கப்பட்ட பதிவுகள்',

    newEncounterTitle: 'புதிய ஆலோசனை பதிவு',
    selectBeneficiaryLabel: 'பயனாளியைத் தேர்ந்தெடுக்கவும்',
    notesLabel: 'அறிகுறிகள் / குறிப்புகள்',
    btnCancel: 'ரத்து செய்',
    btnStartEncounter: 'ஆய்வு தொடங்கவும்',
    careSlipTitle: 'சரிபார்க்கப்பட்ட பராமரிப்பு சீட்டு',
    careSlipPrint: 'அச்சிடுக / PDF சேமி',
    careSlipClose: 'மூடு'
  },

  te: {
    appName: 'సేవాసేతు AI',
    appSubtitle: 'భారత్ డిజిటల్ పబ్లిక్ గుడ్',
    tabRegistry: 'లబ్ధిదారుల రిజిస్ట్రీ',
    tabWorkflow: 'ఏజెంటిక్ వర్క్‌ఫ్లో',
    tabAudit: 'ఆడిట్ లెడ్జర్',
    tabImpact: 'ప్రభావ నివేదిక',
    tabCompliance: 'నియమావళి ధృవీకరణ',
    btnLogEncounter: '+ కొత్త సంప్రదింపు',
    statusOnline: 'ఆన్‌లైన్',
    statusOffline: 'ఆఫ్‌లైన్ నిల్వ',

    registryHeroTitle: 'ఆరోగ్య కార్యకర్త మరియు పౌరుల సమన్వయ రిజిస్ట్రీ',
    registryHeroSubtitle: 'ఆశా కార్యకర్తల కోసం అధికారిక MoHFW మార్గదర్శకాలతో కూడిన సహాయక వ్యవస్థ.',
    registryHeroKpiSubcentre: 'గ్రామ ఉప-కేంద్రం',
    registryHeroKpiAsha: 'కేటాయించిన ఆశా',
    registryHeroKpiTotal: 'నమోదైన పౌరులు',
    searchPlaceholder: 'పేరు, గ్రామం లేదా ఆభా (ABHA) ఐడీ ద్వారా వెతకండి...',
    filterAllCategories: 'అన్ని విభాగాలు',
    filterAllRisks: 'అన్ని ప్రాధాన్యతలు',
    colName: 'లబ్ధిదారుడు / ఆభా',
    colAgeGender: 'వయస్సు / లింగం',
    colCategory: 'విభాగం',
    colVillagePhc: 'గ్రామం / ప్రాథమిక ఆరోగ్య కేంద్రం',
    colRisk: 'ప్రమాద తీవ్రత',
    colNextAction: 'తదుపరి చర్యలు',
    btnStartTriage: 'సమీక్ష ప్రారంభించండి',
    btnRegisterNew: '+ కొత్త పౌరుడిని చేర్చండి',
    maternalCategory: 'మాతృ ఆరోగ్యం (ANC)',
    childCategory: 'పిల్లల టీకాలు',
    tbCategory: 'క్షయవ్యాధి (Nikshay)',
    seniorCategory: 'వృద్ధుల సంక్షేమం',
    riskHigh: 'అత్యవసరం / హై రిస్క్',
    riskAttention: 'శ్రద్ధ వహించండి',
    riskStandard: 'సాధారణం',

    workflowTitle: '14-దశల సంరక్షణ మరియు సమీక్ష పైప్‌లైన్',
    workflowSubtitle: 'MoHFW ప్రోటోకాల్ ఆధారిత నిర్ణయ మద్దతు',
    presetsTitle: 'ముఖ్యమైన క్షేత్ర దృశ్యాలు (ఒక క్లిక్ పరీక్ష):',
    scenarioMaternal: 'గర్భధారణ ప్రమాద సంకేతాలు (సునీతా దేవి, 28 వారాలు)',
    scenarioMaternalNote: '2 రోజులుగా తీవ్రమైన తలనొప్పి, కాళ్ళ వాపు మరియు కళ్ళు తిరగడం. 3వ ANC పరీక్ష తప్పిపోయింది.',
    scenarioChild: 'టీకా తప్పిపోయిన పిల్లవాడు (ఆరవ్ కుమార్, 11 నెలలు)',
    scenarioChildNote: 'వలస వెళ్లి తిరిగి వచ్చారు. 9 నెలలకు ఇవ్వాల్సిన మీజిల్స్-రుబెల్లా మరియు విటమిన్-ఎ డ్రాప్స్ తీసుకోలేదు.',
    scenarioTb: 'టిబి మందుల నిలిపివేత (రమేష్ పటేల్)',
    scenarioTbNote: 'కడుపులో వికారం కారణంగా మందులు ఆపేశారు. పోషణ నిధి బ్యాంకు ఖాతాలో జమ కాలేదు.',
    scenarioSenior: 'ఆయుష్మాన్ భారత్ 70+ (కమలా బాయి, 72)',
    scenarioSeniorNote: 'కీళ్ల నొప్పులతో బాధపడుతున్న వృద్ధురాలికి 5 లక్షల ఉచిత ఆరోగ్య కార్డు అవసరం.',
    encounterNotesLabel: 'క్షేత్ర స్థాయి పరిశీలనలు మరియు లక్షణాలు',
    encounterNotesPlaceholder: 'లక్షణాలు నమోదు చేయండి...',
    btnRunAgent: 'పైప్‌లైన్ ప్రారంభించండి',
    btnRunningAgent: 'ప్రోటోకాల్స్ విశ్లేషించబడుతున్నాయి...',
    btnListenAudio: 'వాయిస్ వినండి (TTS)',
    btnStopAudio: 'ఆపండి',
    sectionGuidelineCitations: 'వర్తించే MoHFW మార్గదర్శకాలు',
    sectionExtractedFacts: 'గుర్తించిన ముఖ్య విషయాలు',
    sectionMissingContext: 'అదనపు వివరాలు అవసరం',
    sectionRecommendedSteps: 'సిఫార్సు చేసిన తదుపరి చర్యలు',
    sectionToolExecution: 'ఆమోదం కొరకు కార్యాచరణ',
    triageHighRisk: 'ఎరుపు (తక్షణ ఆసుపత్రికి పంపాలి)',
    triageAttention: 'పసుపు (ప్రత్యేక పర్యవేక్షణ అవసరం)',
    triageRoutine: 'ఆకుపచ్చ (సాధారణ ప్రక్రియ)',
    btnApproveAction: 'ఆమోదించి అమలు చేయండి',
    btnApproved: 'అమలు చేయబడింది',
    btnViewCareSlip: 'ద్విభాషా స్లిప్ చూడండి',
    btnApproveAll: 'అన్నింటినీ ఆమోదించండి',
    disclaimerText: 'ఇది కేవలం సమాచార మార్గదర్శకత్వం మాత్రమే. వైద్య నిర్ణయాలు వైద్యులు మాత్రమే తీసుకుంటారు.',

    auditTitle: 'SHA-256 ఆడిట్ లెడ్జర్',
    auditSubtitle: 'ప్రతి నిర్ణయం మరియు చర్య భద్రపరచబడుతుంది.',
    btnVerifyHashes: 'భద్రతను ధృవీకరించండి',
    btnHashesVerified: 'రికార్డులన్నీ సురక్షితంగా ఉన్నాయి',
    btnExportCsv: 'డౌన్‌లోడ్ (.csv)',
    colTimestamp: 'సమయం / తేదీ',
    colBeneficiary: 'లబ్ధిదారుడు',
    colAction: 'చర్య',
    colApprover: 'ఆమోదించిన వారు',
    colHash: 'SHA-256 హ్యాష్',
    colStatus: 'స్థితి',

    impactTitle: 'జాతీయ ఆరోగ్య మిషన్ ప్రభావ ఫలితాలు',
    impactSubtitle: 'టీకాలు తప్పిపోకుండా నివారించడం మరియు సమయం ఆదా ఫలితాలు.',
    kpiBeneficiaries: 'మొత్తం పౌరులు',
    kpiEncounters: 'నమోదైన సంప్రదింపులు',
    kpiDropoutsPrevented: 'నివారించిన టీకా డ్రాపౌట్లు',
    kpiHighRiskTriages: 'గుర్తించిన అత్యవసర కేసులు',
    kpiHoursSaved: 'ఆదా చేసిన కాగితపు సమయం',
    kpiSlipsGenerated: 'జారీ చేసిన స్లిప్పులు',
    kpiAbdmSynced: 'ABDM సమకాలీకరించబడిన రికార్డులు',

    newEncounterTitle: 'కొత్త ఆరోగ్య సంప్రదింపు నమోదు',
    selectBeneficiaryLabel: 'లబ్ధిదారుడిని ఎంచుకోండి',
    notesLabel: 'లక్షణాలు / వివరాలు',
    btnCancel: 'రద్దు',
    btnStartEncounter: 'విశ్లేషణ ప్రారంభించండి',
    careSlipTitle: 'ధృవీకరించబడిన సంరక్షణ పత్రం',
    careSlipPrint: 'ప్రింట్ / PDF భద్రపరచండి',
    careSlipClose: 'మూసివేయి'
  },

  bn: {
    appName: 'সেতুসেতু AI',
    appSubtitle: 'ভারত ডিজিটাল পাবলিক গুড',
    tabRegistry: 'উপভোক্তা রেজিস্ট্রি',
    tabWorkflow: 'এজেন্টিক ওয়ার্কফ্লো',
    tabAudit: 'অডিট খাতা',
    tabImpact: 'প্রভাব মেট্রিক্স',
    tabCompliance: 'নিয়মাবলী সম্মতি',
    btnLogEncounter: '+ নতুন পরামর্শ নথিভুক্ত',
    statusOnline: 'অনলাইন',
    statusOffline: 'অফলাইন ক্যাশ',

    registryHeroTitle: 'স্বাস্থ্যকর্মী ও নাগরিক ফলো-আপ রেজিস্ট্রি',
    registryHeroSubtitle: 'আশা কর্মীদের জন্য MoHFW নির্দেশিকা ভিত্তিক সিদ্ধান্ত সমর্থন ব্যবস্থা।',
    registryHeroKpiSubcentre: 'গ্রাম উপ-স্বাস্থ্যকেন্দ্র',
    registryHeroKpiAsha: 'দায়িত্বপ্রাপ্ত আশা',
    registryHeroKpiTotal: 'সক্রিয় নাগরিক',
    searchPlaceholder: 'নাম, গ্রাম বা আভা (ABHA) আইডি দিয়ে খুঁজুন...',
    filterAllCategories: 'সমস্ত বিভাগ',
    filterAllRisks: 'সমস্ত অগ্রাধিকার',
    colName: 'নাগরিক / আভা',
    colAgeGender: 'বয়স / লিঙ্গ',
    colCategory: 'বিভাগ',
    colVillagePhc: 'গ্রাম / প্রাথমিক স্বাস্থ্যকেন্দ্র',
    colRisk: 'ঝুঁকির মাত্রা',
    colNextAction: 'পরবর্তী প্রয়োজনীয় পদক্ষেপ',
    btnStartTriage: 'পরামর্শ শুরু করুন',
    btnRegisterNew: '+ নতুন নাগরিক যোগ করুন',
    maternalCategory: 'মাতৃস্বাস্থ্য (ANC)',
    childCategory: 'শিশু টিকাকরণ',
    tbCategory: 'যক্ষ্মা (Nikshay)',
    seniorCategory: 'প্রবীণ নাগরিক প্রকল্প',
    riskHigh: 'উচ্চ ঝুঁকি',
    riskAttention: 'মনোযোগ প্রয়োজন',
    riskStandard: 'স্বাভাবিক',

    workflowTitle: '১৪-ধাপের এজেন্টিক কেয়ার পাইপলাইন',
    workflowSubtitle: 'MoHFW প্রোটোকল ভিত্তিক সিদ্ধান্ত সমর্থন ব্যবস্থা',
    presetsTitle: 'গুরুত্বপূর্ণ পরিস্থিতি (এক-ক্লিক পরীক্ষা):',
    scenarioMaternal: 'মাতৃ বিপদের লক্ষণ (সুনীতা দেবী, ২৮ সপ্তাহ)',
    scenarioMaternalNote: '২ দিন ধরে তীব্র মাথাব্যথা, পায়ে ফোলাভাব এবং মাথা ঘোরা। ৩য় এএনসি পরীক্ষা বাদ পড়েছে।',
    scenarioChild: 'টিকা বাদ পড়া শিশু (আরভ কুমার, ১১ মাস)',
    scenarioChildNote: 'পরিবার স্থানান্তরিত হয়ে ফিরে এসেছে। শিশুর ৯ মাসের হাম ও রুবেলা টিকা এবং ভিটামিন এ বাদ পড়েছে।',
    scenarioTb: 'টিবি ওষুধ বন্ধ হওয়া (রমেশ প্যাটেল)',
    scenarioTbNote: 'পেটের সমস্যার কারণে ৪ দিন ধরে ওষুধ খাওয়া বন্ধ। পুষ্টি সহায়তা অ্যাকাউন্টে আসেনি।',
    scenarioSenior: 'আয়ুষ্মান ভারত ৭০+ (কমলা বাঈ, ৭২)',
    scenarioSeniorNote: 'হাঁটুর ব্যথায় আক্রান্ত ৭২ বছরের মহিলার জন্য ৫ লক্ষ টাকার গোল্ডেন কার্ড প্রয়োজন।',
    encounterNotesLabel: 'আশা কর্মীর পর্যবেক্ষণ ও লক্ষণ',
    encounterNotesPlaceholder: 'লক্ষণ বা পর্যবেক্ষণ লিখুন...',
    btnRunAgent: 'পাইপলাইন চালান',
    btnRunningAgent: 'প্রোটোকল মূল্যায়ন করা হচ্ছে...',
    btnListenAudio: 'অডিও শুনুন (TTS)',
    btnStopAudio: 'বন্ধ করুন',
    sectionGuidelineCitations: 'প্রযোজ্য MoHFW নির্দেশিকা',
    sectionExtractedFacts: 'চিহ্নিত মূল তথ্য',
    sectionMissingContext: 'অনুপস্থিত গুরুত্বপূর্ণ তথ্য',
    sectionRecommendedSteps: 'সুপারিশকৃত পরবর্তী পদক্ষেপ',
    sectionToolExecution: 'পরিকল্পিত কার্যক্রম ও অনুমোদন',
    triageHighRisk: 'লাল (জরুরি হাসপাতাল রেফারেল প্রয়োজন)',
    triageAttention: 'হলুদ (নজরদারি প্রয়োজন)',
    triageRoutine: 'সবুজ (স্বাভাবিক নিয়মিত পদ্ধতি)',
    btnApproveAction: 'অনুমোদন ও কার্যকর করুন',
    btnApproved: 'সম্পন্ন হয়েছে',
    btnViewCareSlip: 'দ্বিভাষিক স্লিপ দেখুন',
    btnApproveAll: 'সমস্ত পদক্ষেপ অনুমোদন করুন',
    disclaimerText: 'এটি শুধুমাত্র সিদ্ধান্ত সহায়তা। চিকিৎসা সংক্রান্ত চূড়ান্ত সিদ্ধান্ত চিকিৎসকের।',

    auditTitle: 'SHA-256 সুরক্ষিত অডিট লেজার',
    auditSubtitle: 'প্রতিটি পদক্ষেপ অপরিবর্তনীয়ভাবে নথিভুক্ত থাকে।',
    btnVerifyHashes: 'নিরাপত্তা যাচাই করুন',
    btnHashesVerified: 'সমস্ত রেকর্ড সম্পূর্ণ নিরাপদ',
    btnExportCsv: 'ডাউনলোড (.csv)',
    colTimestamp: 'সময় / তারিখ',
    colBeneficiary: 'নাগরিক',
    colAction: 'পদক্ষেপ',
    colApprover: 'অনুমোদনকারী',
    colHash: 'SHA-256 হ্যাশ',
    colStatus: 'স্থিতি',

    impactTitle: 'জাতীয় স্বাস্থ্য মিশন প্রভাব মেট্রিক্স',
    impactSubtitle: 'টিকাকরণ ড্রপআউট রোধ এবং সময় সাশ্রয়ের বাস্তব ফলাফল।',
    kpiBeneficiaries: 'মোট নাগরিক',
    kpiEncounters: 'নথিভুক্ত পরামর্শ',
    kpiDropoutsPrevented: 'টিকা ড্রপআউট রোধ',
    kpiHighRiskTriages: 'চিহ্নিত গুরুতর কেস',
    kpiHoursSaved: 'সংরক্ষিত কাগজের সময়',
    kpiSlipsGenerated: 'প্রদত্ত স্লিপ',
    kpiAbdmSynced: 'ABDM সিঙ্ক করা রেকর্ড',

    newEncounterTitle: 'নতুন স্বাস্থ্য পরামর্শ নথিভুক্ত করুন',
    selectBeneficiaryLabel: 'নাগরিক নির্বাচন করুন',
    notesLabel: 'লক্ষণ / বিবরণ',
    btnCancel: 'বাতিল',
    btnStartEncounter: 'বিশ্লেষণ শুরু করুন',
    careSlipTitle: 'যাচাইকৃত যত্ন স্লিপ',
    careSlipPrint: 'প্রিন্ট / PDF সংরক্ষণ',
    careSlipClose: 'বন্ধ করুন'
  },

  mr: {
    appName: 'सेवासेतू AI',
    appSubtitle: 'भारत डिजिटल पब्लिक गुड',
    tabRegistry: 'लाभार्थी नोंदवही',
    tabWorkflow: 'एजंटिक कार्यप्रवाह',
    tabAudit: 'ऑडिट लेजर',
    tabImpact: 'प्रभाव मेट्रिक्स',
    tabCompliance: 'नियम पूर्तता',
    btnLogEncounter: '+ नवीन तपासणी नोंदवा',
    statusOnline: 'ऑनलाइन',
    statusOffline: 'ऑफलाइन कॅश',

    registryHeroTitle: 'आरोग्य कर्मचारी व नागरिक फॉलो-अप नोंदवही',
    registryHeroSubtitle: 'आशा सेविकांसाठी MoHFW मार्गदर्शक तत्त्वांवर आधारित निर्णय सहाय्य प्रणाली.',
    registryHeroKpiSubcentre: 'ग्राम उपकेंद्र',
    registryHeroKpiAsha: 'नियुक्त आशा सेविका',
    registryHeroKpiTotal: 'सक्रिय नागरिक',
    searchPlaceholder: 'नाव, गाव किंवा आभा (ABHA) आयडी शोधा...',
    filterAllCategories: 'सर्व आरोग्य वर्ग',
    filterAllRisks: 'सर्व प्राधान्यक्रम',
    colName: 'नागरिक / आभा आयडी',
    colAgeGender: 'वय / लिंग',
    colCategory: 'प्रवर्ग',
    colVillagePhc: 'गाव / प्राथमिक आरोग्य केंद्र',
    colRisk: 'धोका पातळी',
    colNextAction: 'पुढील आवश्यक कृती',
    btnStartTriage: 'सल्ला सुरू करा',
    btnRegisterNew: '+ नवीन नागरिक जोडा',
    maternalCategory: 'माता आरोग्य (ANC)',
    childCategory: 'बाल लसीकरण',
    tbCategory: 'क्षयरोग (Nikshay)',
    seniorCategory: 'ज्येष्ठ नागरिक योजना',
    riskHigh: 'उच्च धोका',
    riskAttention: 'लक्ष द्या',
    riskStandard: 'सामान्य',

    workflowTitle: '14-टप्प्यांची काळजी व ट्रायज पाइपलाइन',
    workflowSubtitle: 'MoHFW नियमावली आधारित सहाय्यक प्रणाली',
    presetsTitle: 'महत्त्वाच्या क्षेत्रीय परिस्थिती (एक-क्लिक चाचणी):',
    scenarioMaternal: 'गरोदरपणातील धोक्याची लक्षणे (सुनिता देवी, 28 आठवडे)',
    scenarioMaternalNote: '2 दिवसांपासून तीव्र डोकेदुखी, पायांवर सूज आणि चक्कर येणे. 3री तपासणी चुकली आहे.',
    scenarioChild: 'लसीकरण चुकलेले बालक (आरव कुमार, 11 महिने)',
    scenarioChildNote: 'स्थलांतरित कुटुंब परत आले आहे. बालकाची 9 महिन्यांची गोवर-रुबेला व व्हिटॅमिन ए मात्रा राहिली आहे.',
    scenarioTb: 'टीबी औषध खंडित (रमेश पटेल)',
    scenarioTbNote: 'उलट्या व मळमळीमुळे 4 दिवस औषध बंद केले. पोषण अनुदान खात्यात जमा झाले नाही.',
    scenarioSenior: 'आयुष्मान भारत 70+ (कमला बाई, 72)',
    scenarioSeniorNote: 'गुडघेदुखीने त्रस्त असलेल्या 72 वर्षीय वृद्ध महिलेस 5 लाखांचे गोल्डन कार्ड हवे आहे.',
    encounterNotesLabel: 'आशा सेविका फील्ड नोंदी व लक्षणे',
    encounterNotesPlaceholder: 'लक्षणे किंवा नोंदी येथे लिहा...',
    btnRunAgent: 'पाइपलाइन सुरू करा',
    btnRunningAgent: 'MoHFW नियमांची तपासणी सुरू आहे...',
    btnListenAudio: 'आवाज ऐका (TTS)',
    btnStopAudio: 'थांबवा',
    sectionGuidelineCitations: 'लागू MoHFW मार्गदर्शक तत्त्वे',
    sectionExtractedFacts: 'शोधून काढलेली मुख्य तथ्ये',
    sectionMissingContext: 'आवश्यक अपूर्ण माहिती',
    sectionRecommendedSteps: 'शिफारस केलेल्या कृती पायऱ्या',
    sectionToolExecution: 'नियोजित कृती व मानवी मंजुरी',
    triageHighRisk: 'लाल (तातडीचे रुग्णालय संदर्भ आवश्यक)',
    triageAttention: 'पिवळा (नियमित लक्ष देणे आवश्यक)',
    triageRoutine: 'हिरवा (नेहमीची नियमित प्रक्रिया)',
    btnApproveAction: 'मंजूर करा व राबवा',
    btnApproved: 'यशस्वीरीत्या राबवले',
    btnViewCareSlip: 'द्विभाषिक पावती पहा',
    btnApproveAll: 'सर्व कृती एकाच वेळी मंजूर करा',
    disclaimerText: 'ही केवळ निर्णय सहाय्य प्रणाली आहे. अंतिम वैद्यकीय निर्णय डॉक्टरांचाच असतो.',

    auditTitle: 'SHA-256 सुरक्षित ऑडिट लेजर',
    auditSubtitle: 'प्रत्येक निर्णय आणि कृती अपरिवर्तनीयपणे नोंदवली जाते.',
    btnVerifyHashes: 'सुरक्षा पडताळून पहा',
    btnHashesVerified: 'सर्व नोंदी सुरक्षित व प्रमाणित आहेत',
    btnExportCsv: 'डाउनलोड (.csv)',
    colTimestamp: 'वेळ / तारीख',
    colBeneficiary: 'नागरिक',
    colAction: 'कृती',
    colApprover: 'मंजुरी देणारे',
    colHash: 'SHA-256 हॅश',
    colStatus: 'स्थिती',

    impactTitle: 'राष्ट्रीय आरोग्य अभियान प्रभाव मेट्रिक्स',
    impactSubtitle: 'लसीकरण गळती रोखणे आणि वेळेची बचत यांचे मोजमाप.',
    kpiBeneficiaries: 'एकूण नागरिक',
    kpiEncounters: 'नोंदवलेले सल्ले',
    kpiDropoutsPrevented: 'रोखलेली लसीकरण गळती',
    kpiHighRiskTriages: 'शोधलेली गंभीर प्रकरणे',
    kpiHoursSaved: 'वाचलेला कागदी वेळ',
    kpiSlipsGenerated: 'दिलेल्या पावत्या',
    kpiAbdmSynced: 'ABDM समक्रमित नोंदी',

    newEncounterTitle: 'नवीन आरोग्य तपासणी नोंदवा',
    selectBeneficiaryLabel: 'नागरिक निवडा',
    notesLabel: 'लक्षणे / माहिती',
    btnCancel: 'रद्द करा',
    btnStartEncounter: 'विश्लेषण सुरू करा',
    careSlipTitle: 'प्रमाणित काळजी पावती',
    careSlipPrint: 'प्रिंट / PDF सेव्ह करा',
    careSlipClose: 'बंद करा'
  }
};

export function getTranslations(lang: Language): Translations {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
