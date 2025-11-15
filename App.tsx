import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { StudyItem as StudyItemType, FilterType } from './types';
import Header from './components/Header';
import AddStudyItemForm from './components/AddStudyItemForm';
import StudyItem from './components/StudyItem';

const App: React.FC = () => {
  const [studyItems, setStudyItems] = useLocalStorage<StudyItemType[]>('studyItems', []);
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  
  const handleAddItem = (item: Omit<StudyItemType, 'id' | 'isCompleted'>) => {
    const newItem: StudyItemType = {
      ...item,
      id: crypto.randomUUID(),
      isCompleted: false,
    };
    setStudyItems(prevItems => [...prevItems, newItem]);
  };

  const handleToggleComplete = (id: string) => {
    setStudyItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setStudyItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const filteredItems = useMemo(() => {
    const sortedItems = [...studyItems].sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
    switch (filter) {
      case FilterType.COMPLETED:
        return sortedItems.filter(item => item.isCompleted);
      case FilterType.ACTIVE:
        return sortedItems.filter(item => !item.isCompleted);
      case FilterType.ALL:
      default:
        return sortedItems;
    }
  }, [studyItems, filter]);
  
  const FilterButton: React.FC<{
    buttonFilter: FilterType;
    text: string;
  }> = ({ buttonFilter, text }) => {
    const isActive = filter === buttonFilter;
    return (
      <button
        onClick={() => setFilter(buttonFilter)}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main>
          <AddStudyItemForm onAddItem={handleAddItem} />
          <div className="mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-blue-600">Your Study Plan</h2>
              <div className="flex space-x-2">
                <FilterButton buttonFilter={FilterType.ALL} text="All" />
                <FilterButton buttonFilter={FilterType.ACTIVE} text="Active" />
                <FilterButton buttonFilter={FilterType.COMPLETED} text="Completed" />
              </div>
            </div>
            {filteredItems.length > 0 ? (
              <ul className="space-y-4">
                {filteredItems.map(item => (
                  <StudyItem
                    key={item.id}
                    item={item}
                    onToggleComplete={handleToggleComplete}
                    onDeleteItem={handleDeleteItem}
                  />
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 px-6 bg-blue-50/50 rounded-lg">
                <p className="text-gray-500">Your study plan is empty.</p>
                <p className="text-gray-400 text-sm mt-1">Add a topic above to get started!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;