/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TrendingUp, Activity, ShieldCheck, HeartPulse, Clock, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface EpidemiologicalTimeseriesViewProps {
  language?: Language;
}

export const EpidemiologicalTimeseriesView: React.FC<EpidemiologicalTimeseriesViewProps> = ({ language = 'en' }) => {
  const [activeChart, setActiveChart] = useState<'dropout' | 'maternal_bp' | 'workload'>('dropout');

  const immunizationData = [
    { label: 'Birth (BCG)', baseline: 96, sevaSetu: 99, target: 95 },
    { label: '6w (Penta-1)', baseline: 92, sevaSetu: 98, target: 95 },
    { label: '10w (Penta-2)', baseline: 78, sevaSetu: 97, target: 95 },
    { label: '14w (Penta-3)', baseline: 71, sevaSetu: 97, target: 95 },
    { label: '9m (MR-1 / VitA)', baseline: 58, sevaSetu: 96, target: 95 },
    { label: '16m (DPT Booster)', baseline: 51, sevaSetu: 95, target: 95 }
  ];

  const maternalBPData = [
    { week: '12w', systolic: 112, diastolic: 74, dangerLine: 140 },
    { week: '16w', systolic: 114, diastolic: 76, dangerLine: 140 },
    { week: '20w', systolic: 118, diastolic: 78, dangerLine: 140 },
    { week: '24w', systolic: 124, diastolic: 82, dangerLine: 140 },
    { week: '28w (Alert)', systolic: 144, diastolic: 94, dangerLine: 140 },
    { week: '32w (PMSMA)', systolic: 126, diastolic: 82, dangerLine: 140 },
    { week: '36w', systolic: 122, diastolic: 80, dangerLine: 140 }
  ];

  const workloadData = [
    { month: 'May', manualHours: 46, sevaSetuHours: 11 },
    { month: 'Jun', manualHours: 49, sevaSetuHours: 10 },
    { month: 'Jul', manualHours: 52, sevaSetuHours: 9 },
    { month: 'Aug', manualHours: 48, sevaSetuHours: 8.5 },
    { month: 'Sep', manualHours: 47, sevaSetuHours: 8 },
    { month: 'Oct', manualHours: 45, sevaSetuHours: 7.5 }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Epidemiological Timeseries & Public Health Telemetry
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time visual comparison between rural Indian national baseline vs. SevaSetu AI assisted field interventions.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveChart('dropout')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeChart === 'dropout'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            UIP Immunization Curve
          </button>
          <button
            onClick={() => setActiveChart('maternal_bp')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeChart === 'maternal_bp'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Maternal Preeclampsia Vitals
          </button>
          <button
            onClick={() => setActiveChart('workload')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeChart === 'workload'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ASHA Time Saved
          </button>
        </div>
      </div>

      {/* Chart 1: UIP Immunization Dropout Rate */}
      {activeChart === 'dropout' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">With SevaSetu AI (96.8% Retention)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Rural Baseline (38% Dropout)</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Source: NFHS-5 Rural Cohort
            </span>
          </div>

          {/* Bar / Timeseries visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
            {immunizationData.map((pt, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block truncate">
                  {pt.label}
                </span>

                <div className="flex items-end justify-center gap-2 h-28 pt-2">
                  {/* SevaSetu Bar */}
                  <div className="flex flex-col items-center gap-1 w-5">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">{pt.sevaSetu}%</span>
                    <div
                      style={{ height: `${pt.sevaSetu}%` }}
                      className="w-full bg-emerald-600 dark:bg-emerald-500 rounded-t-sm transition-all duration-500"
                    />
                  </div>

                  {/* Baseline Bar */}
                  <div className="flex flex-col items-center gap-1 w-5">
                    <span className="text-[10px] font-mono font-bold text-red-500">{pt.baseline}%</span>
                    <div
                      style={{ height: `${pt.baseline}%` }}
                      className="w-full bg-red-400 dark:bg-red-500/80 rounded-t-sm transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200 dark:border-slate-700">
                  +{pt.sevaSetu - pt.baseline}% Delta
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart 2: Maternal Preeclampsia Blood Pressure Vitals */}
      {activeChart === 'maternal_bp' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-600 inline-block" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Systolic Blood Pressure (mmHg)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Diastolic (mmHg)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-red-500 inline-block" />
                <span className="text-slate-500 font-mono">140 Danger Threshold</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 font-semibold">
              Sunita Devi (ANC Cohort)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5 pt-2">
            {maternalBPData.map((pt, idx) => {
              const isOverDanger = pt.systolic >= pt.dangerLine;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center space-y-1.5 ${
                    isOverDanger
                      ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-900/60 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className={`text-[11px] font-bold block ${isOverDanger ? 'text-red-700 dark:text-red-300' : 'text-slate-700 dark:text-slate-300'}`}>
                    {pt.week}
                  </span>

                  <div className="font-mono text-base font-extrabold text-slate-900 dark:text-white">
                    {pt.systolic}/{pt.diastolic}
                  </div>

                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded inline-block ${
                    isOverDanger
                      ? 'bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-200'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {isOverDanger ? 'Preeclampsia Alert' : 'Normal'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chart 3: ASHA Administrative Workload Reduction */}
      {activeChart === 'workload' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">With SevaSetu AI (~8 hrs/mo)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-400 inline-block" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">12 Physical Registers (47.5 hrs/mo)</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 font-bold">
              82% Paperwork Reduction
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
            {workloadData.map((pt, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {pt.month}
                </span>

                <div className="flex items-end justify-center gap-2 h-24 pt-2">
                  <div className="flex flex-col items-center gap-1 w-5">
                    <span className="text-[10px] font-mono font-bold text-emerald-600">{pt.sevaSetuHours}h</span>
                    <div
                      style={{ height: `${(pt.sevaSetuHours / 55) * 100}%` }}
                      className="w-full bg-emerald-600 rounded-t-sm"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-1 w-5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{pt.manualHours}h</span>
                    <div
                      style={{ height: `${(pt.manualHours / 55) * 100}%` }}
                      className="w-full bg-slate-400 dark:bg-slate-600 rounded-t-sm"
                    />
                  </div>
                </div>

                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold pt-1 border-t border-slate-200 dark:border-slate-700">
                  Save {(pt.manualHours - pt.sevaSetuHours).toFixed(0)} hrs
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
