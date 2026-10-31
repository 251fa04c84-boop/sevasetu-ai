/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Sparkles, UserPlus } from 'lucide-react';
import { Beneficiary, Language } from '../types';

interface NewEncounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiaries: Beneficiary[];
  onStartEncounter: (beneficiary: Beneficiary, note: string) => void;
}

export const NewEncounterModal: React.FC<NewEncounterModalProps> = ({
  isOpen,
  onClose,
  beneficiaries,
  onStartEncounter
}) => {
  if (!isOpen) return null;

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
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Log Frontline Health Encounter
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Select Village Beneficiary
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              {beneficiaries.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.category} ({b.village})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Encounter Observation / Symptoms / Notes
            </label>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Beneficiary has missed 2nd dose of vaccine, complains of nausea, or needs Golden Card registration..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Agentic Analysis</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
