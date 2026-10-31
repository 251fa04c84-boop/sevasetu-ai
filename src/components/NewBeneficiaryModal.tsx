/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, UserPlus, Shield } from 'lucide-react';
import { Beneficiary, Language } from '../types';
import { getTranslations } from '../i18n/translations';

interface NewBeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBeneficiary: (b: Beneficiary) => void;
  language?: Language;
}

export const NewBeneficiaryModal: React.FC<NewBeneficiaryModalProps> = ({
  isOpen,
  onClose,
  onAddBeneficiary,
  language = 'en'
}) => {
  if (!isOpen) return null;

  const t = getTranslations(language);

  const [name, setName] = useState('');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [category, setCategory] = useState<Beneficiary['category']>('Maternal (ANC)');
  const [village, setVillage] = useState('Shivgarh, Bikaner Block');
  const [abhaId, setAbhaId] = useState(`91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [contactNumber, setContactNumber] = useState('+91 98290 12345');
  const [riskStatus, setRiskStatus] = useState<Beneficiary['riskStatus']>('Attention');
  const [initialObservation, setInitialObservation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newBeneficiary: Beneficiary = {
      id: `BEN-RAJ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      age: Number(age) || 25,
      gender,
      village,
      abhaId,
      contactNumber,
      category,
      riskStatus,
      lastVisitDate: new Date().toISOString().split('T')[0],
      nextScheduledDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      assignedAsha: 'Shanti Meena (ASHA-04)',
      phcCenter: 'Shivgarh Primary Health Centre',
      activeFollowUps: initialObservation
        ? [initialObservation]
        : ['Initial registration and baseline vital assessment scheduled']
    };

    onAddBeneficiary(newBeneficiary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t.btnRegisterNew}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Full Citizen Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Parvati Sharma"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Age
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Program Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="Maternal (ANC)">Maternal (ANC)</option>
                <option value="Child Immunization">Child Immunization</option>
                <option value="Tuberculosis (Nikshay)">Tuberculosis (Nikshay)</option>
                <option value="Senior Entitlement">Senior Entitlement</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Initial Risk Priority
              </label>
              <select
                value={riskStatus}
                onChange={(e) => setRiskStatus(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="Standard">Standard</option>
                <option value="Attention">Attention</option>
                <option value="High Risk">High Risk</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ABHA ID (Ayushman Bharat)
              </label>
              <input
                type="text"
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Village / Block
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Initial Symptoms / Intake Note
            </label>
            <textarea
              rows={3}
              value={initialObservation}
              onChange={(e) => setInitialObservation(e.target.value)}
              placeholder="e.g. Registered in 2nd trimester; missed previous tetanus toxoid dose..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Register & Launch Triage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
