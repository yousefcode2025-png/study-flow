
import React from 'react';
import type { StudyItem } from '../types';

interface StudyTipModalProps {
  topic: StudyItem;
  tips: string;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
    </div>
);

const StudyTipModal: React.FC<StudyTipModalProps> = ({ topic, tips, isLoading, error, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-lg relative border border-slate-700 transform transition-all animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-300"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-sky-400 mb-2">Study Tips for: <span className="text-white">{topic.topic}</span></h2>
        <p className="text-sm text-slate-400 mb-4">Subject: {topic.subject}</p>
        
        <div className="bg-slate-900/50 p-4 rounded-md min-h-[12rem]">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-400">{error}</p>}
          {!isLoading && !error && tips && (
             <div className="prose prose-invert prose-sm text-slate-300" dangerouslySetInnerHTML={{ __html: tips.replace(/\n/g, '<br />') }} />
          )}
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
        }
        .prose ul { list-style-type: '💡 '; padding-left: 1.25rem; }
        .prose ul li::marker { color: #38bdf8; }
        .prose li { margin-top: 0.5em; margin-bottom: 0.5em; }
      `}</style>
    </div>
  );
};

export default StudyTipModal;
