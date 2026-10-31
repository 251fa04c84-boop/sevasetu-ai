/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Beneficiary } from '../types';

export const INITIAL_BENEFICIARIES: Beneficiary[] = [
  {
    id: 'BEN-RAJ-0142',
    abhaId: '91-4829-1029-4412',
    name: 'Sunita Devi',
    age: 24,
    gender: 'Female',
    village: 'Shivgarh, Bikaner Block',
    contactNumber: '+91 98290 41123',
    category: 'Maternal (ANC)',
    gestationalWeeks: 28,
    lastVisitDate: '2026-09-12',
    nextScheduledDate: '2026-10-31',
    riskStatus: 'Attention',
    assignedAsha: 'Shanti Meena (ASHA-04)',
    phcCenter: 'Shivgarh Primary Health Centre',
    activeFollowUps: [
      '3rd ANC Checkup due (28-34 weeks window)',
      'Check blood pressure and screening for pre-eclampsia (reported mild swelling)',
      'Verify IFA tablets consumption (180 tablets course)',
      'PMSMA camp registration for November 9'
    ]
  },
  {
    id: 'BEN-RAJ-0891',
    abhaId: '91-3312-9981-5520',
    name: 'Aarav Kumar (Mother: Rekha Bai)',
    age: 1, // 11 months
    gender: 'Male',
    village: 'Shivgarh, Bikaner Block',
    contactNumber: '+91 97841 88219',
    category: 'Child Immunization',
    infantAgeMonths: 11,
    lastVisitDate: '2026-06-18',
    nextScheduledDate: '2026-11-02',
    riskStatus: 'High Risk',
    assignedAsha: 'Shanti Meena (ASHA-04)',
    phcCenter: 'Shivgarh Primary Health Centre',
    activeFollowUps: [
      'Overdue: MR-1 (Measles-Rubella 1st dose) due at 9 months',
      'Overdue: Vitamin A 1st dose (1 lakh IU oral drops)',
      'Overdue: PCV Booster (Pneumococcal Conjugate Vaccine)',
      'Family returned from seasonal agricultural migration'
    ]
  },
  {
    id: 'BEN-RAJ-0402',
    abhaId: '91-7712-4019-3382',
    name: 'Ramesh Patel',
    age: 52,
    gender: 'Male',
    village: 'Dhanera, Ward 3',
    contactNumber: '+91 94142 55921',
    category: 'Tuberculosis (Nikshay)',
    lastVisitDate: '2026-10-18',
    nextScheduledDate: '2026-11-04',
    riskStatus: 'Attention',
    assignedAsha: 'Urmila Sharma (ASHA-02)',
    phcCenter: 'Dhanera Community Health Centre',
    activeFollowUps: [
      'DOTS medication adherence check: reported nausea after taking 4FD dose',
      'Ni-kshay Poshan DBT scheme: Aadhaar bank seeding pending at post office',
      'End of Month 2 sputum smear examination appointment'
    ]
  },
  {
    id: 'BEN-RAJ-0915',
    abhaId: '91-1120-6644-8839',
    name: 'Kamala Bai',
    age: 72,
    gender: 'Female',
    village: 'Shivgarh, Bikaner Block',
    contactNumber: '+91 96023 11842',
    category: 'Senior Entitlement',
    lastVisitDate: '2026-10-05',
    nextScheduledDate: '2026-11-06',
    riskStatus: 'Standard',
    assignedAsha: 'Shanti Meena (ASHA-04)',
    phcCenter: 'Shivgarh Primary Health Centre',
    activeFollowUps: [
      'Ayushman Bharat PM-JAY Universal 70+ Golden Card enrollment assistance',
      'Non-Communicable Disease (NCD) screening for hypertension and blood sugar at Ayushman Arogya Mandir',
      'Assist with Aadhaar face-authentication on PMJAY app'
    ]
  },
  {
    id: 'BEN-RAJ-1033',
    abhaId: '91-8891-2234-7711',
    name: 'Priya Meena (Mother: Radha Meena)',
    age: 1, // 18 months
    gender: 'Female',
    village: 'Shivgarh, Bikaner Block',
    contactNumber: '+91 95491 66320',
    category: 'Child Immunization',
    infantAgeMonths: 18,
    lastVisitDate: '2026-09-28',
    nextScheduledDate: '2026-11-08',
    riskStatus: 'Attention',
    assignedAsha: 'Shanti Meena (ASHA-04)',
    phcCenter: 'Shivgarh Primary Health Centre',
    activeFollowUps: [
      'DPT Booster-1 and MR-2 due between 16-24 months',
      'Poshan Tracker: Mid-Upper Arm Circumference (MUAC) 12.1 cm (Borderline MAM)',
      'Anganwadi Supplementary Nutrition (THR) ration distribution follow-up'
    ]
  }
];
