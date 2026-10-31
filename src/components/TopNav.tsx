/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Globe, Wifi, WifiOff } from 'lucide-react';
import { Language } from '../types';

interface TopNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNewEncounter: () => void;
  isOnline: boolean;
}

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' }
];

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
  onNewEncounter,
  isOnline
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onSelectTab('workflow')}
              className="text-left font-bold text-xl tracking-tight text-slate-900 dark:text-white whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              SevaSetu AI
            </button>
            <span className="hidden sm:inline-block text-xs text-slate-500 dark:text-slate-400">
              Bharat DPG
            </span>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectTab('beneficiaries')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'beneficiaries'
                  ? 'text-slate-950 dark:text-white font-semibold border-b-2 border-emerald-600'
                  : ''
              }`}
            >
              Beneficiary Registry
            </button>
            <button
              onClick={() => onSelectTab('workflow')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'workflow'
                  ? 'text-slate-950 dark:text-white font-semibold border-b-2 border-emerald-600'
                  : ''
              }`}
            >
              Agentic Workflow
            </button>
            <button
              onClick={() => onSelectTab('audit')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'audit'
                  ? 'text-slate-950 dark:text-white font-semibold border-b-2 border-emerald-600'
                  : ''
              }`}
            >
              Audit Ledger
            </button>
            <button
              onClick={() => onSelectTab('impact')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'impact'
                  ? 'text-slate-950 dark:text-white font-semibold border-b-2 border-emerald-600'
                  : ''
              }`}
            >
              Impact Telemetry
            </button>
            <button
              onClick={() => onSelectTab('compliance')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'compliance'
                  ? 'text-slate-950 dark:text-white font-semibold border-b-2 border-emerald-600'
                  : ''
              }`}
            >
              Hackathon Compliance
            </button>
          </nav>

          {/* Zone 3: Primary action & controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Network indicator without blinking dot */}
            <div 
              title={isOnline ? 'Network Connected (Server Active)' : 'Offline Mode (Local Rule Cache Active)'}
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md"
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden lg:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden lg:inline">Offline Cache</span>
                </>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                aria-label="Select Interface Language"
                className="pl-8 pr-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onNewEncounter}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              + Log Encounter
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="flex md:hidden overflow-x-auto gap-4 py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => onSelectTab('beneficiaries')}
            className={`whitespace-nowrap px-2 py-1 ${currentTab === 'beneficiaries' ? 'font-bold text-emerald-600' : 'text-slate-600'}`}
          >
            Registry
          </button>
          <button
            onClick={() => onSelectTab('workflow')}
            className={`whitespace-nowrap px-2 py-1 ${currentTab === 'workflow' ? 'font-bold text-emerald-600' : 'text-slate-600'}`}
          >
            Agent Workflow
          </button>
          <button
            onClick={() => onSelectTab('audit')}
            className={`whitespace-nowrap px-2 py-1 ${currentTab === 'audit' ? 'font-bold text-emerald-600' : 'text-slate-600'}`}
          >
            Audit Log
          </button>
          <button
            onClick={() => onSelectTab('impact')}
            className={`whitespace-nowrap px-2 py-1 ${currentTab === 'impact' ? 'font-bold text-emerald-600' : 'text-slate-600'}`}
          >
            Impact
          </button>
          <button
            onClick={() => onSelectTab('compliance')}
            className={`whitespace-nowrap px-2 py-1 ${currentTab === 'compliance' ? 'font-bold text-emerald-600' : 'text-slate-600'}`}
          >
            Compliance
          </button>
        </div>
      </div>
    </header>
  );
};
