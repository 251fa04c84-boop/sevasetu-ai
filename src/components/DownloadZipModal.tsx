/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Download, 
  X, 
  CheckCircle, 
  ExternalLink, 
  Github, 
  Smartphone, 
  ShieldCheck, 
  Copy, 
  Check, 
  Loader2, 
  FileArchive,
  ArrowRight
} from 'lucide-react';

interface DownloadZipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadZipModal: React.FC<DownloadZipModalProps> = ({ isOpen, onClose }) => {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'completed' | 'error'>('idle');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const downloadUrl = '/sevasetu-ai.zip';
  const fullDownloadUrl = typeof window !== 'undefined' ? `${window.location.origin}/sevasetu-ai.zip` : '/sevasetu-ai.zip';

  const handleBlobDownload = async () => {
    setDownloadStatus('downloading');
    setErrorMessage('');
    try {
      const response = await fetch('/sevasetu-ai.zip', { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sevasetu-ai.zip';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      setDownloadStatus('completed');
    } catch (err: any) {
      console.error('Blob download failed, falling back to direct navigation:', err);
      // Fallback
      window.location.href = '/download-zip';
      setDownloadStatus('completed');
    }
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(fullDownloadUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <FileArchive className="w-5 h-5" />
            </div>
            <div>
              <h2 id="download-modal-title" className="font-bold text-slate-900 dark:text-white text-base">
                Download Repository ZIP
              </h2>
              <p className="text-xs text-slate-500">
                Upgraded full source bundle · Clean & ready for GitHub
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600 dark:text-slate-300">
          {/* Main Action Box */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 dark:text-emerald-200 text-sm">
                sevasetu-ai.zip (v1.0.0-bharat2026)
              </span>
              <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
                ~2.9 MB
              </span>
            </div>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-300/90 leading-relaxed">
              Contains the complete React + Vite application, full-stack Express API, authoritative MoHFW protocol grounding, test suites, and GitHub Actions CI workflow. All video demonstration cards removed as requested.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleBlobDownload}
                disabled={downloadStatus === 'downloading'}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {downloadStatus === 'downloading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Download...</span>
                  </>
                ) : downloadStatus === 'completed' ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-200" />
                    <span>Downloaded! Download Again</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>One-Click Download (.ZIP)</span>
                  </>
                )}
              </button>

              <a
                href="/download-zip"
                download="sevasetu-ai.zip"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-lg transition-colors cursor-pointer"
              >
                Direct Browser Link
              </a>
            </div>

            {downloadStatus === 'completed' && (
              <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1.5 mt-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zip bundle saved to your device Downloads folder.</span>
              </div>
            )}
          </div>

          {/* Copy Direct URL for Mobile Browser */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Direct Download URL (for phone or external browser)</span>
              <button
                onClick={copyUrlToClipboard}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1"
              >
                {copiedUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
              </button>
            </label>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg font-mono text-[11px] text-slate-700 dark:text-slate-300 break-all select-all">
              {fullDownloadUrl}
            </div>
          </div>

          {/* Target GitHub Repository */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Target GitHub Repository
                </span>
              </div>
              <a
                href="https://github.com/251fa04c84-boop/sevasetu-ai"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>Open Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              Repository URL: <code className="font-mono text-slate-700 dark:text-slate-300">https://github.com/251fa04c84-boop/sevasetu-ai</code>
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px]">
              <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>How to upload on your phone in 2 steps:</span>
              </div>
              <ol className="list-decimal pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Download the zip above and unzip it using your phone's "Files" or "My Files" app.</li>
                <li>Open <strong className="text-slate-800 dark:text-slate-200">github.com/251fa04c84-boop/sevasetu-ai</strong> in your phone browser, tap <em>Add file &gt; Upload files</em>, and drag or pick the project files.</li>
              </ol>
            </div>
          </div>

          {/* Is it safe to paste token here? */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Token Safety & Automated Direct Push</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              If you want the assistant to push everything to your repository automatically without manual file uploads, you can create a temporary GitHub <strong>Fine-Grained Personal Access Token</strong> limited only to <code className="font-mono text-emerald-600 dark:text-emerald-400">sevasetu-ai</code> with 1-day expiration. Once provided in chat, the assistant pushes all commits in seconds, and you can revoke the token immediately on GitHub.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
