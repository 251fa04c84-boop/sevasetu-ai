/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Printer, QrCode, Shield, PhoneCall, AlertCircle } from 'lucide-react';
import { AgentAnalysisPlan, Beneficiary, Language } from '../types';

interface BiLingualCareSlipModalProps {
  plan: AgentAnalysisPlan | null;
  beneficiary: Beneficiary;
  onClose: () => void;
  language: Language;
}

const REGIONAL_TRANSLATIONS: Record<Language, {
  title: string;
  subtitle: string;
  emergencyHeader: string;
  emergencyText: string;
  stepsHeader: string;
  printLabel: string;
}> = {
  en: {
    title: 'National Health Mission — Citizen Care & Follow-Up Slip',
    subtitle: 'Official non-diagnostic guidance for household follow-up',
    emergencyHeader: 'Immediate Emergency Danger Signs (Call 108)',
    emergencyText: 'Severe breathlessness, sudden heavy bleeding, blurred vision with high fever, or unconsciousness.',
    stepsHeader: 'Required Household Action Steps',
    printLabel: 'Print / Save Slip'
  },
  hi: {
    title: 'राष्ट्रीय स्वास्थ्य मिशन — नागरिक देखभाल एवं परामर्श पर्ची',
    subtitle: 'घरेलू देखभाल एवं आगामी जांच के लिए आधिकारिक गैर-नैदानिक मार्गदर्शन',
    emergencyHeader: 'आपातकालीन खतरे के लक्षण (तुरंत 108 पर कॉल करें)',
    emergencyText: 'अत्यधिक सांस फूलना, अचानक भारी रक्तस्राव, तेज बुखार के साथ धुंधला दिखना, या बेहोशी।',
    stepsHeader: 'परिवार हेतु आवश्यक कार्यवाही के चरण',
    printLabel: 'पर्ची प्रिंट / सुरक्षित करें'
  },
  ta: {
    title: 'தேசிய நல்வாழ்வு இயக்கம் — குடும்ப பராமரிப்பு சீட்டு',
    subtitle: 'வீட்டுப் பராமரிப்புக்கான அதிகாரப்பூர்வ வழிகாட்டுதல்',
    emergencyHeader: 'அவசர ஆபத்து அறிகுறிகள் (உடனடியாக 108 ஐ அழைக்கவும்)',
    emergencyText: 'கடுமையான மூச்சுத் திணறல், திடீர் இரத்தப்போக்கு, மயக்கம்.',
    stepsHeader: 'தேவையான முக்கிய நடவடிக்கைகள்',
    printLabel: 'சீட்டை அச்சிடவும்'
  },
  te: {
    title: 'జాతీయ ఆరోగ్య మిషన్ — పౌర సంరక్షణ మరియు అనుసరణ పత్రం',
    subtitle: 'గృహ సంరక్షణ మరియు సమీక్ష కోసం అధికారిక మార్గదర్శకాలు',
    emergencyHeader: 'తక్షణ అత్యవసర ప్రమాద సంకేతాలు (108 కు కాల్ చేయండి)',
    emergencyText: 'తీవ్రమైన శ్వాస తీసుకోవడంలో ఇబ్బంది, అకస్మాత్తుగా తీవ్ర రక్తస్రావం, మూర్ఛ.',
    stepsHeader: 'కుటుంబం చేయవలసిన చర్యలు',
    printLabel: 'స్లిప్‌ను ప్రింట్ చేయండి'
  },
  bn: {
    title: 'জাতীয় স্বাস্থ্য মিশন — নাগরিক ফলো-আপ স্লিপ',
    subtitle: 'পারিবারিক যত্ন এবং ক্লিনিক পরিদর্শনের নির্দেশিকা',
    emergencyHeader: 'জরুরী বিপদের লক্ষণ (অবিলম্বে ১০৮ এ কল করুন)',
    emergencyText: 'তীব্র শ্বাসকষ্ট, হঠাৎ অতিরিক্ত রক্তপাত, চরম জ্বর বা অজ্ঞান হওয়া।',
    stepsHeader: 'পরিবারের প্রয়োজনীয় পদক্ষেপ',
    printLabel: 'স্লিপ প্রিন্ট করুন'
  },
  mr: {
    title: 'राष्ट्रीय आरोग्य अभियान — नागरिक पाठपुरावा पावती',
    subtitle: 'घरगुती काळजी आणि तपासणीसाठी अधिकृत मार्गदर्शन',
    emergencyHeader: 'तातडीची धोक्याची लक्षणे (तात्काळ १०८ वर कॉल करा)',
    emergencyText: 'तीव्र धाप लागणे, अचानक रक्तस्त्राव, चक्कर किंवा बेशुद्ध पडणे.',
    stepsHeader: 'कुटुंबासाठी आवश्यक कृती पायऱ्या',
    printLabel: 'पावती प्रिंट करा'
  }
};

export const BiLingualCareSlipModal: React.FC<BiLingualCareSlipModalProps> = ({
  plan,
  beneficiary,
  onClose,
  language
}) => {
  if (!plan) return null;

  const t = REGIONAL_TRANSLATIONS[language] || REGIONAL_TRANSLATIONS.en;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl shadow-xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Verified Beneficiary Care Slip
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-700 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printLabel}</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-200" id="printable-care-slip">
          {/* Government / DPG Emblem Header */}
          <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Government of India · National Health Mission (NHM)
            </div>
            <h2 className="text-lg font-extrabold text-slate-950 dark:text-white mt-1">
              {t.title}
            </h2>
            <div className="text-xs text-slate-500 mt-0.5">
              {t.subtitle}
            </div>
          </div>

          {/* Beneficiary Demographics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[11px]">Beneficiary</span>
              <span className="font-bold text-slate-900 dark:text-white">{beneficiary.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">ABHA ID</span>
              <span className="text-slate-700 dark:text-slate-300">{beneficiary.abhaId || 'Pending'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Village / Sub-Centre</span>
              <span className="text-slate-700 dark:text-slate-300">{beneficiary.village}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Assigned ASHA</span>
              <span className="text-slate-700 dark:text-slate-300">{beneficiary.assignedAsha}</span>
            </div>
          </div>

          {/* Recommended Household Action Steps */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              {t.stepsHeader}
            </h3>
            <div className="space-y-2.5">
              {plan.recommendedSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="leading-relaxed">
                    <span className="font-medium text-slate-900 dark:text-slate-100 block">
                      {step}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Danger Sign Warning Box */}
          <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl text-xs text-red-900 dark:text-red-200 space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>{t.emergencyHeader}</span>
            </div>
            <p className="opacity-90 leading-relaxed">
              {t.emergencyText}
            </p>
          </div>

          {/* Cryptographic Verification & QR Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                <QrCode className="w-10 h-10 text-slate-700 dark:text-slate-300" />
              </div>
              <div>
                <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 font-semibold">
                  ABDM-CAREPLAN-{beneficiary.id}
                </div>
                <div className="text-[10px] text-slate-400">
                  Scan at Ayushman Arogya Mandir to verify
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-400">
              <div>Issue Date: {new Date().toLocaleDateString('en-IN')}</div>
              <div>Digitally signed by ASHA worker: {beneficiary.assignedAsha}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
