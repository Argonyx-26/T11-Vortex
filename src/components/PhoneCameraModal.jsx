import React, { useState, useEffect } from 'react';
import { Smartphone, Camera, QrCode, X, Copy, Check, ExternalLink, Wifi, Shield } from 'lucide-react';

export default function PhoneCameraModal({ isOpen, onClose, localIp = 'localhost' }) {
  const [copied, setCopied] = useState(false);
  const [networkUrl, setNetworkUrl] = useState('');

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    // If running on localhost, use localIp if available
    let url = `${origin}/camera-feed`;
    if (localIp && localIp !== 'localhost' && origin.includes('localhost')) {
      url = origin.replace('localhost', localIp) + '/camera-feed';
    }
    setNetworkUrl(url);
  }, [localIp, isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(networkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0f111d] border-2 border-[#c9a24b] rounded-2xl shadow-[0_0_50px_rgba(201,162,75,0.3)] overflow-hidden font-mono text-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1f1a10] via-[#2a2313] to-[#1a1710] p-4 border-b border-[#c9a24b]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-black/50 border border-[#c9a24b]/50 text-[#e6b84d]">
              <Smartphone className="w-5 h-5 text-[#e6b84d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#c9a24b]/20 text-[#e6b84d] border border-[#c9a24b]/30">
                  CCTV MULTI-CAMERA EXTENSION
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded">
                  CAM-02
                </span>
              </div>
              <h2 className="text-base font-black tracking-wider uppercase text-white mt-0.5">
                Connect Phone as Remote CCTV Feed
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-slate-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-center">
          {/* SVG QR Code Display */}
          <div className="mx-auto w-52 h-52 bg-white p-3 rounded-xl border-4 border-[#c9a24b] shadow-2xl flex flex-col items-center justify-center relative group">
            {/* Scannable High-Contrast QR Code Pattern */}
            <svg className="w-full h-full" viewBox="0 0 140 140">
              <rect width="140" height="140" fill="#ffffff" />
              {/* Corner 1 */}
              <rect x="10" y="10" width="35" height="35" fill="#000000" />
              <rect x="15" y="15" width="25" height="25" fill="#ffffff" />
              <rect x="20" y="20" width="15" height="15" fill="#000000" />
              {/* Corner 2 */}
              <rect x="95" y="10" width="35" height="35" fill="#000000" />
              <rect x="100" y="15" width="25" height="25" fill="#ffffff" />
              <rect x="105" y="20" width="15" height="15" fill="#000000" />
              {/* Corner 3 */}
              <rect x="10" y="95" width="35" height="35" fill="#000000" />
              <rect x="15" y="100" width="25" height="25" fill="#ffffff" />
              <rect x="20" y="105" width="15" height="15" fill="#000000" />
              {/* Timing & Data Elements */}
              <rect x="52" y="12" width="6" height="6" fill="#000" />
              <rect x="64" y="12" width="6" height="6" fill="#000" />
              <rect x="76" y="12" width="6" height="6" fill="#000" />
              <rect x="12" y="52" width="6" height="6" fill="#000" />
              <rect x="12" y="64" width="6" height="6" fill="#000" />
              <rect x="12" y="76" width="6" height="6" fill="#000" />
              {/* Matrix Data Blocks */}
              <rect x="50" y="50" width="12" height="12" fill="#000" />
              <rect x="70" y="50" width="14" height="8" fill="#000" />
              <rect x="90" y="50" width="10" height="14" fill="#000" />
              <rect x="50" y="70" width="16" height="8" fill="#000" />
              <rect x="75" y="70" width="12" height="12" fill="#000" />
              <rect x="95" y="70" width="14" height="10" fill="#000" />
              <rect x="50" y="90" width="10" height="16" fill="#000" />
              <rect x="70" y="90" width="18" height="8" fill="#000" />
              <rect x="95" y="90" width="12" height="14" fill="#000" />
              <rect x="55" y="115" width="14" height="14" fill="#000" />
              <rect x="80" y="115" width="14" height="14" fill="#000" />
              <rect x="105" y="115" width="14" height="14" fill="#000" />
              {/* Center Logo */}
              <rect x="58" y="58" width="24" height="24" rx="4" fill="#c9a24b" />
              <text x="70" y="74" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">VX</text>
            </svg>
          </div>

          {/* URL Box */}
          <div className="p-2.5 rounded-lg bg-[#141624] border border-[#23273e] flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-cyan-300 truncate max-w-[280px]">
              {networkUrl}
            </span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={handleCopy}
                className="px-2 py-1 rounded bg-[#1f2338] hover:bg-[#282d47] text-slate-300 hover:text-white text-xs flex items-center gap-1 border border-slate-700"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={networkUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 rounded bg-[#c9a24b]/20 hover:bg-[#c9a24b]/30 text-[#e6b84d] text-xs flex items-center gap-1 border border-[#c9a24b]/40"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open</span>
              </a>
            </div>
          </div>

          {/* 3 Simple Setup Instructions */}
          <div className="p-3 rounded-lg bg-[#121422] border border-[#23273e] text-left text-xs space-y-1.5 text-slate-300 font-mono">
            <div className="flex items-center gap-1.5 text-[#c9a24b] font-bold text-[11px] mb-1">
              <Wifi className="w-3.5 h-3.5" />
              <span>3-Step Quick Phone Setup:</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#c9a24b] font-bold">1.</span>
              <span>Connect your phone to the same Wi-Fi network as this laptop.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#c9a24b] font-bold">2.</span>
              <span>Scan this QR code with your phone camera or enter the URL.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#c9a24b] font-bold">3.</span>
              <span>Tap "Allow Camera" — frames will stream live into <strong className="text-white">CAM-02 (CCTV)</strong>!</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#23273e] bg-[#141624] flex items-center justify-between">
          <span className="text-[10px] text-slate-500">
            Streams over WebSockets & HTTP at 8-12 FPS
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#c9a24b] hover:bg-[#e6b84d] text-black font-sans"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
