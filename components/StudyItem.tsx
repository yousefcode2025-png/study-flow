import React from 'react';
import { StudyItem as StudyItemType, StudyItemCategory } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { CheckIcon } from './icons/CheckIcon';
import { UndoIcon } from './icons/UndoIcon';

interface StudyItemProps {
  item: StudyItemType;
  onToggleComplete: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

const categoryStyles: { [key in StudyItemCategory]: string } = {
    [StudyItemCategory.HOMEWORK]: 'bg-purple-100 text-purple-800 border-purple-200',
    [StudyItemCategory.TEST]: 'bg-red-100 text-red-800 border-red-200',
    [StudyItemCategory.PROJECT]: 'bg-green-100 text-green-800 border-green-200',
    [StudyItemCategory.ESSAY]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};


const StudyItem: React.FC<StudyItemProps> = ({ item, onToggleComplete, onDeleteItem }) => {
  const formattedDate = new Date(item.dateTime).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <li
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg transition-all duration-300 border ${
        item.isCompleted ? 'bg-gray-100/80 opacity-70 border-gray-200' : 'bg-white hover:bg-blue-50/50 border-gray-200'
      }`}
    >
      <div className="flex-1 mb-4 sm:mb-0">
        <p
          className={`font-bold text-lg ${
            item.isCompleted ? 'line-through text-gray-400' : 'text-blue-600'
          }`}
        >
          {item.topic}
        </p>
        <div className="flex items-center mt-1 flex-wrap">
            <span
              className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full border ${categoryStyles[item.category]}`}
            >
              {item.category}
            </span>
            <p className="text-sm text-gray-600">{item.subject}</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">{formattedDate}</p>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
        <button
          onClick={() => onToggleComplete(item.id)}
          className={`p-2 rounded-full transition-colors bg-gray-100 hover:bg-gray-200 ${
            item.isCompleted
              ? 'text-yellow-500'
              : 'text-green-500'
          }`}
          aria-label={item.isCompleted ? 'Mark as active' : 'Mark as complete'}
        >
          {item.isCompleted ? <UndoIcon className="w-5 h-5" /> : <CheckIcon className="w-5 h-5" />}
        </button>
        <button
          onClick={() => onDeleteItem(item.id)}
          className="p-2 rounded-full text-red-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Delete item"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export default StudyItem;