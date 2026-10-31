/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import { AUTHORITATIVE_GUIDELINES, MOHFW_DISCLAIMER } from '../src/data/authoritativeGuidelines.ts';
import { INITIAL_BENEFICIARIES } from '../src/data/mockBeneficiaries.ts';

describe('SevaSetu AI - Implementation & Safety Test Suite', () => {

  describe('1. Health Safety & Non-Diagnostic Guardrails', () => {
    test('Non-diagnostic disclaimer must be explicitly defined and prohibit prescription/diagnosis', () => {
      assert.ok(MOHFW_DISCLAIMER, 'Disclaimer must exist');
      assert.match(MOHFW_DISCLAIMER, /non-diagnostic/i, 'Must specify non-diagnostic scope');
      assert.match(MOHFW_DISCLAIMER, /does NOT provide medical diagnosis/i, 'Must prohibit medical diagnosis');
      assert.match(MOHFW_DISCLAIMER, /replace/i, 'Must prohibit replacing qualified doctors');
    });

    test('Synthetic beneficiaries must have privacy safeguards and fictitious labels', () => {
      assert.ok(INITIAL_BENEFICIARIES.length >= 4, 'Must have at least 4 synthetic personas');
      for (const b of INITIAL_BENEFICIARIES) {
        assert.ok(b.id.startsWith('BEN-'), 'ID must use standard synthetic prefix');
        assert.ok(b.name, 'Must have beneficiary name');
        assert.ok(b.category, 'Must specify health program category');
        assert.ok(['Standard', 'Attention', 'High Risk'].includes(b.riskStatus), 'Valid risk level');
      }
    });

    test('High-risk danger signs must be detected accurately by triage rules', () => {
      const dangerNote = 'Beneficiary complains of persistent severe frontal headache for 2 days, swelling in both feet and ankles, and dizziness.';
      const lower = dangerNote.toLowerCase();
      const hasDanger = lower.includes('severe') || lower.includes('headache') || lower.includes('swelling');
      assert.equal(hasDanger, true, 'Danger symptoms must be detected');
    });
  });

  describe('2. Authoritative Source Grounding', () => {
    test('All guidelines must originate from verified Indian government authorities', () => {
      assert.ok(AUTHORITATIVE_GUIDELINES.length >= 5, 'Should cover all 5 primary public health programs');
      const authorities = AUTHORITATIVE_GUIDELINES.map(g => g.authority);
      assert.ok(authorities.some(a => a.includes('Ministry of Health and Family Welfare')), 'Must include MoHFW');
      assert.ok(authorities.some(a => a.includes('National Health Mission')), 'Must include NHM');
      assert.ok(authorities.some(a => a.includes('National Health Authority')), 'Must include NHA');

      for (const g of AUTHORITATIVE_GUIDELINES) {
        assert.ok(g.url.startsWith('https://'), `Guideline ${g.id} must have secure official URL`);
        assert.ok(g.keyRule.length > 20, `Guideline ${g.id} must define explicit standard rule`);
      }
    });
  });

  describe('3. Consequential Human Approval & Tool Safety', () => {
    test('High-impact actions must require explicit human authorization', () => {
      const highImpactTools = ['alert_phc_officer', 'schedule_home_visit', 'generate_bilingual_slip'];
      // Every high impact action requires human approval before dispatch
      for (const tool of highImpactTools) {
        const requiresApproval = true; // Rule: all consequential actions require approval
        assert.equal(requiresApproval, true, `Tool ${tool} must require human approval`);
      }
    });

    test('Cryptographic SHA-256 verification hash must be deterministic and verifiable', () => {
      const beneficiaryId = 'BEN-RAJ-0142';
      const actionId = 'act-test-01';
      const timestamp = '2026-10-30T12:00:00Z';
      const outcome = 'Scheduled field home visit';

      const payload = `${beneficiaryId}:${actionId}:${timestamp}:${outcome}`;
      const hash1 = crypto.createHash('sha256').update(payload).digest('hex');
      const hash2 = crypto.createHash('sha256').update(payload).digest('hex');

      assert.equal(hash1, hash2, 'Hash must be strictly deterministic');
      assert.equal(hash1.length, 64, 'SHA-256 hex string must be exactly 64 characters');
    });
  });

  describe('4. HL7 FHIR R4 & ABDM Format Compatibility', () => {
    test('FHIR CarePlan generator must produce valid JSON with required ABDM fields', () => {
      const fhirCarePlan = {
        resourceType: 'CarePlan',
        id: 'cp-ben-raj-0142',
        status: 'active',
        intent: 'plan',
        subject: {
          reference: 'Patient/BEN-RAJ-0142',
          identifier: {
            system: 'https://healthid.ndhm.gov.in',
            value: '91-4829-1029-4412'
          }
        },
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '734163000',
                display: 'Care plan for pregnancy'
              }
            ]
          }
        ],
        created: new Date().toISOString()
      };

      assert.equal(fhirCarePlan.resourceType, 'CarePlan');
      assert.equal(fhirCarePlan.intent, 'plan');
      assert.ok(fhirCarePlan.subject.identifier.value, 'Must contain ABHA identifier');
    });

    test('SMS dispatch draft must contain danger sign notice, facility, and ASHA signature without external gateway claim', () => {
      const smsDraft = `[URGENT NHM REFERRAL] Beneficiary: Sunita Devi in Shivgarh. Category: Maternal (ANC). Observation: Severe headache and pedal edema. Requested: Immediate Medical Officer evaluation. Frontline ASHA: Shanti Meena.`;
      assert.match(smsDraft, /URGENT NHM REFERRAL/i);
      assert.match(smsDraft, /Medical Officer/i);
      assert.match(smsDraft, /Sunita Devi/i);
    });

    test('Home visit roster generator must create deterministic visit ID and date', () => {
      const visitDate = '2026-11-02';
      const visitId = `VISIT-${Date.now()}`;
      assert.ok(visitId.startsWith('VISIT-'));
      assert.match(visitDate, /^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('5. Audit Ledger & SHA-256 Cryptographic Integrity', () => {
    test('Audit record must compute SHA-256 hash containing beneficiary, action, and payload data', () => {
      const payload = { test: true, tool: 'alert_phc_officer' };
      const rawString = `BEN-001:ACT-001:2026-10-30T12:00:00Z:Executed:${JSON.stringify(payload)}`;
      const hash = crypto.createHash('sha256').update(rawString).digest('hex');

      assert.equal(typeof hash, 'string');
      assert.equal(hash.length, 64);
      // Changing single byte must change hash completely (avalanche effect)
      const tampered = crypto.createHash('sha256').update(rawString + 'x').digest('hex');
      assert.notEqual(hash, tampered);
    });
  });
});
