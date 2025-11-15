import React, { useState } from 'react';
import { StudyItem, StudyItemCategory } from '../types';

interface AddStudyItemFormProps {
  onAddItem: (item: Omit<StudyItem, 'id' | 'isCompleted'>) => void;
}

const AddStudyItemForm: React.FC<AddStudyItemFormProps> = ({ onAddItem }) => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [category, setCategory] = useState<StudyItemCategory>(StudyItemCategory.HOMEWORK);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !subject.trim() || !dateTime) return;
    onAddItem({ topic, subject, dateTime, category });
    setTopic('');
    setSubject('');
    setDateTime('');
    setCategory(StudyItemCategory.HOMEWORK);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        <div className="flex flex-col">
          <label htmlFor="topic" className="text-sm font-medium text-gray-700 mb-1">Topic</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., React Hooks"
            required
            className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Frontend Development"
            required
            className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category</label>
           <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as StudyItemCategory)}
            required
            className="w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.values(StudyItemCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="datetime" className="text-sm font-medium text-gray-700 mb-1">Date & Time</label>
          <input
            id="datetime"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
            className="w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 [color-scheme:light]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 ease-in-out shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5"
        >
          Add Topic
        </button>
      </form>
    </div>
  );
};

export default AddStudyItemForm;