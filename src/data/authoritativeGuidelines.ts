/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GuidelineCitation } from '../types';

export const AUTHORITATIVE_GUIDELINES: GuidelineCitation[] = [
  {
    id: 'mohfw-uip-2024',
    title: 'National Immunization Schedule (NIS) for Infants, Children and Pregnant Women',
    authority: 'Ministry of Health and Family Welfare (MoHFW), Government of India',
    documentName: 'Universal Immunization Programme Operational Guidelines',
    section: 'Section 3.2: Routine Vaccine Schedules & Catch-up Intervals',
    url: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=824&lid=220',
    lastUpdated: '2024-06-15',
    summary: 'Infant immunization schedule from Birth (BCG, OPV-0, Hep-B) through 6, 10, 14 weeks (Pentavalent, RVV, fIPV, PCV) to 9-12 months (MR-1, JE-1, PCV-Booster) and 16-24 months (MR-2, DPT-Booster).',
    keyRule: 'Pentavalent doses require a minimum interval of 4 weeks (28 days). If a child misses a scheduled date, administer the dose at the earliest encounter without restarting the series.'
  },
  {
    id: 'nhm-anc-protocol',
    title: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA) & Routine ANC Guidelines',
    authority: 'National Health Mission (NHM), MoHFW',
    documentName: 'Guidelines for Antenatal Care and Skilled Attendance at Birth by ANMs and LHVs',
    section: 'Chapter 4: Danger Signs in Pregnancy and Immediate Referral Criteria',
    url: 'https://pmsma.nhm.gov.in/about-scheme/',
    lastUpdated: '2024-03-20',
    summary: 'Standard protocol requires minimum 4 comprehensive ANC checkups (1st trimester registration, 14-26 weeks, 28-34 weeks, 36 weeks to term) including TT/Td vaccination, IFA supplementation, and screening on the 9th of every month (PMSMA).',
    keyRule: 'Red-flag danger signs: Severe headache with blurred vision, facial/hand edema, vaginal bleeding, foul discharge, or severe pallor (Hb < 7 g/dL) mandate same-day PHC Medical Officer referral with emergency transport coordination.'
  },
  {
    id: 'poshan-icds-sam',
    title: 'Poshan 2.0 Protocol for Management of Severe Acute Malnutrition (SAM) at Community Level',
    authority: 'Ministry of Women and Child Development (MWCD) & MoHFW',
    documentName: 'Standard Operating Procedure: Community-Based Management of Acute Malnutrition',
    section: 'Annexure II: MUAC Color Coding and Weight-for-Height Z-Score Screening',
    url: 'https://poshantracker.in/',
    lastUpdated: '2024-01-10',
    summary: 'Mid-Upper Arm Circumference (MUAC) < 11.5 cm or bilateral pitting edema indicates SAM. Children aged 6-59 months with SAM without medical complications receive doorstep supplementary nutrition and weekly ASHA monitoring.',
    keyRule: 'If child presents with MUAC < 11.5 cm AND fever/vomiting/loss of appetite (appetite test failure), refer immediately to Nutrition Rehabilitation Centre (NRC) at District Hospital.'
  },
  {
    id: 'nikshay-tb-protocol',
    title: 'National Tuberculosis Elimination Programme (NTEP) Community Support Guidelines',
    authority: 'Central TB Division, MoHFW, Government of India',
    documentName: 'Operational Guidelines for Direct Observation of Treatment & Ni-kshay Mitra Support',
    section: 'Module 5: Treatment Adherence Verification and DBT Nutrition Support',
    url: 'https://tbcindia.gov.in/',
    lastUpdated: '2024-08-01',
    summary: 'Patients on anti-TB therapy require adherence tracking, bi-monthly sputum follow-up schedules, Ni-kshay Poshan Yojana (Direct Benefit Transfer of ₹500/month for nutrition), and contact screening in household.',
    keyRule: 'A gap of >7 consecutive days of missed anti-TB medication requires a physical home visit within 24 hours to assess adverse side effects and prevent drug-resistant TB emergence.'
  },
  {
    id: 'ab-pmjay-entitlement',
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY) Eligibility Criteria',
    authority: 'National Health Authority (NHA), Government of India',
    documentName: 'AB-PMJAY Guidelines on Beneficiary Identification and Golden Card Issuance',
    section: 'Section 2.1: SECC Deprivation Criteria and Senior Citizen Universal Coverage (70+)',
    url: 'https://pmjay.gov.in/',
    lastUpdated: '2024-09-12',
    summary: 'Provides health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 12 crore vulnerable families, expanded to cover all senior citizens aged 70 and above irrespective of income.',
    keyRule: 'Requires Aadhaar-linked e-KYC or Ration Card verification. Frontline workers assist with mobile e-KYC verification and Ayushman Card download at Common Service Centres (CSC) or Ayushman Arogya Mandirs.'
  }
];

export const MOHFW_DISCLAIMER = 
  "DISCLAIMER: SevaSetu AI is an assistive digital public good designed for frontline community health workers and citizens. It facilitates non-diagnostic workflow organization, schedule tracking, and authoritative government protocol navigation. It does NOT provide medical diagnosis, clinical prescriptions, or replace certified doctors.";
