import React from 'react';
import { AcademicCapIcon } from './icons/AcademicCapIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-4 mb-2">
        <AcademicCapIcon className="w-12 h-12 text-blue-500" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
          Study Flow
        </h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Organize your learning, track your progress, and supercharge your study sessions.
      </p>
    </header>
  );
};

export default Header;