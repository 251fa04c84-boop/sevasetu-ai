/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Sparkles, UserPlus } from 'lucide-react';
import { Beneficiary, Language } from '../types';
import { getTranslations } from '../i18n/translations';

interface NewEncounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiaries: Beneficiary[];
  onStartEncounter: (beneficiary: Beneficiary, note: string) => void;
  language?: Language;
}

export const NewEncounterModal: React.FC<NewEncounterModalProps> = ({
  isOpen,
  onClose,
  beneficiaries,
  onStartEncounter,
  language = 'en'
}) => {
  if (!isOpen) return null;

  const t = getTranslations(language);

  const [selectedId, setSelectedId] = useState(beneficiaries[0]?.id || '');
  const [note, setNote] = useState('');

  const selectedBeneficiary = beneficiaries.find((b) => b.id === selectedId) || beneficiaries[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBeneficiary) return;
    onStartEncounter(selectedBeneficiary, note || 'Routine follow-up encounter check-in.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t.newEncounterTitle}
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
              {t.selectBeneficiaryLabel}
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium cursor-pointer"
            >
              {beneficiaries.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.category} ({b.village})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {t.notesLabel}
            </label>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Beneficiary has reported severe headache, missed scheduled dose, or requests hospital transport..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-normal leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              {t.btnCancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {t.btnStartEncounter}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
