import ashaWorkerHeroImg from '../assets/images/asha_worker_field_tablet_1793372673991.jpg';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Beneficiary, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Search,
  UserPlus,
  AlertTriangle,
  Clock,
  UserCheck,
  ArrowRight,
  ShieldAlert,
  Building2
} from 'lucide-react';

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
  onSelectBeneficiary: (b: Beneficiary) => void;
  onOpenNewModal: () => void;
  language: Language;
}

export const BeneficiaryList: React.FC<BeneficiaryListProps> = ({
  beneficiaries,
  onSelectBeneficiary,
  onOpenNewModal,
  language
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const filtered = beneficiaries.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.abhaId && b.abhaId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'All' || b.category === categoryFilter;

    const matchesRisk =
      riskFilter === 'All' || b.riskStatus === riskFilter;

    return matchesSearch && matchesCategory && matchesRisk;
  });

  const getRiskLabel = (status: Beneficiary['riskStatus']) => {
    switch (status) {
      case 'High Risk':
        return t.riskHigh;
      case 'Attention':
        return t.riskAttention;
      default:
        return t.riskStandard;
    }
  };

  const getCategoryLabel = (cat: Beneficiary['category']) => {
    switch (cat) {
      case 'Maternal':
        return t.maternalCategory;
      case 'Immunization':
        return t.childCategory;
      case 'Tuberculosis':
        return t.tbCategory;
      case 'Senior':
        return t.seniorCategory;
      default:
        return cat;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner with Official Frontline Visual */}
      <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-sm text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Building2 className="w-3.5 h-3.5" />
                <span>National Health Mission (NHM) · Digital Public Good</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                {t.registryHeroTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.registryHeroSub}
              </p>
            </div>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="block text-slate-400">{t.registryHeroKpiSubcentre}</span>
                <span className="font-semibold text-slate-100">Shivgarh PHC</span>
              </div>
              <div>
                <span className="block text-slate-400">{t.registryHeroKpiAsha}</span>
                <span className="font-semibold text-slate-100">Shanti Meena (ASHA-04)</span>
              </div>
              <div>
                <span className="block text-slate-400">{t.registryHeroKpiTotal}</span>
                <span className="font-semibold text-emerald-400 font-mono tabular-nums">
                  {beneficiaries.length} Active Records
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] bg-slate-800">
            <img
              src={ashaWorkerHeroImg}
              alt="ASHA worker using digital health tablet in rural India"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-4">
              <span className="text-xs text-slate-300 font-medium">
                Photo: Frontline community health session, National Health Mission
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Dropdowns & New Citizen Button */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by Category"
            className="px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="All">{t.filterAllCategories}</option>
            <option value="Maternal">{t.maternalCategory}</option>
            <option value="Immunization">{t.childCategory}</option>
            <option value="Tuberculosis">{t.tbCategory}</option>
            <option value="Senior">{t.seniorCategory}</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            aria-label="Filter by Risk Priority"
            className="px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="All">{t.filterAllRisks}</option>
            <option value="High Risk">{t.riskHigh}</option>
            <option value="Attention">{t.riskAttention}</option>
            <option value="Standard">{t.riskStandard}</option>
          </select>

          <button
            onClick={onOpenNewModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t.btnRegisterNew}</span>
          </button>
        </div>
      </div>

      {/* Beneficiary Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">{t.colName}</th>
                <th className="py-3 px-4">{t.colAgeGender}</th>
                <th className="py-3 px-4">{t.colCategory}</th>
                <th className="py-3 px-4">{t.colVillagePhc}</th>
                <th className="py-3 px-4">{t.colRisk}</th>
                <th className="py-3 px-4">{t.colNextAction}</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filtered.map((b) => {
                const isHigh = b.riskStatus === 'High Risk';
                const isAttention = b.riskStatus === 'Attention';
                return (
                  <tr
                    key={b.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{b.name}</span>
                        <span className="text-[11px] font-mono text-slate-400">
                          ABHA: {b.abhaId || 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span>{b.age} yrs</span>
                      <span className="text-slate-400"> · {b.gender}</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {getCategoryLabel(b.category)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-900 dark:text-slate-100">{b.village}</div>
                      <div className="text-[11px] text-slate-400">{b.phcCenter}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
                          isHigh
                            ? 'text-red-700 bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-900/60'
                            : isAttention
                            ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900/60'
                            : 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900/60'
                        }`}
                      >
                        {isHigh && <AlertTriangle className="w-3 h-3 text-red-600" />}
                        {isAttention && <Clock className="w-3 h-3 text-amber-600" />}
                        {!isHigh && !isAttention && <UserCheck className="w-3 h-3 text-emerald-600" />}
                        <span>{getRiskLabel(b.riskStatus)}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="truncate text-[11px] text-slate-600 dark:text-slate-400">
                        {b.activeFollowUps && b.activeFollowUps[0]
                          ? b.activeFollowUps[0]
                          : 'Routine schedule on track'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectBeneficiary(b)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
                      >
                        <span>{t.btnStartTriage}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
