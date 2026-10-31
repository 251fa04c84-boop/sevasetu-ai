/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, UserCheck, AlertTriangle, Clock, ArrowRight, Shield, HeartPulse } from 'lucide-react';
import { Beneficiary } from '../types';

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
  onSelectBeneficiary: (b: Beneficiary) => void;
  onOpenNewModal: () => void;
}

export const BeneficiaryList: React.FC<BeneficiaryListProps> = ({
  beneficiaries,
  onSelectBeneficiary,
  onOpenNewModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

  const filtered = beneficiaries.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.abhaId && b.abhaId.includes(searchTerm));
    const matchesCategory =
      categoryFilter === 'All' || b.category.includes(categoryFilter);
    const matchesRisk =
      riskFilter === 'All' || b.riskStatus === riskFilter;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Editorial Hero Banner */}
      <div className="bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  Bharat Frontline Healthcare Digital Public Good
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  · Synthetic Demo Cohort
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 text-balance">
                Community Health Worker & Citizen Follow-up Registry
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-xl">
                Demonstrating assistive decision support for India's 1.04 million ASHA workers with verified MoHFW protocol grounding, non-diagnostic triage, and auditable care coordination.
              </p>
            </div>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="block text-slate-400">Village Sub-centre</span>
                <span className="font-semibold text-slate-100">Shivgarh PHC (Simulated)</span>
              </div>
              <div>
                <span className="block text-slate-400">Assigned ASHA</span>
                <span className="font-semibold text-slate-100">Shanti Meena (Demo Role)</span>
              </div>
              <div>
                <span className="block text-slate-400">Synthetic Roster</span>
                <span className="font-semibold text-emerald-400 font-mono tabular-nums">
                  {beneficiaries.length} Fictitious Personas
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] bg-slate-800">
            <img
              src="/src/assets/images/asha_worker_field_tablet_1793372673991.jpg"
              alt="ASHA worker using digital health tablet in rural India"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs text-slate-300 font-medium">
                Photo: ASHA field session in Bikaner district, Rajasthan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Strip & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, village, or ABHA ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800/60 rounded-lg">
          {['All', 'Maternal', 'Immunization', 'Tuberculosis', 'Senior'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                categoryFilter === cat
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? 'All Programs' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Registry Table / Card Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Beneficiary & ABHA ID</th>
                <th className="py-3 px-4">Program & Village</th>
                <th className="py-3 px-4">Status & Risk</th>
                <th className="py-3 px-4">Next Scheduled Date</th>
                <th className="py-3 px-4 text-right">Agentic Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {filtered.map((b) => {
                const isHighRisk = b.riskStatus === 'High Risk';
                const isAttention = b.riskStatus === 'Attention';

                return (
                  <tr
                    key={b.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {b.name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono tabular-nums flex items-center gap-1.5 mt-0.5">
                        <span>ABHA: {b.abhaId || 'Pending e-KYC'}</span>
                        <span aria-hidden="true">·</span>
                        <span>Age {b.age}y</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {b.category}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {b.village}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {isHighRisk ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>High Risk Danger Sign</span>
                          </div>
                        ) : isAttention ? (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>Follow-up Due</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                            <UserCheck className="w-3.5 h-3.5 shrink-0" />
                            <span>Routine Care</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {b.activeFollowUps[0]}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono tabular-nums text-xs">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {b.nextScheduledDate}
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Last: {b.lastVisitDate}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectBeneficiary(b)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <span>Start Agent Intake</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 text-sm">
                    No beneficiaries match the selected filter. Try searching a different village or program.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
