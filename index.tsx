document.addEventListener('DOMContentLoaded', () => {
    // --- STATE ---
    let studyItems = [];
    let currentFilter = 'ALL'; // 'ALL', 'ACTIVE', 'COMPLETED'

    // --- CONSTANTS ---
    const categoryStyles = {
        Homework: 'bg-purple-100 text-purple-800 border-purple-200',
        Test: 'bg-red-100 text-red-800 border-red-200',
        Project: 'bg-green-100 text-green-800 border-green-200',
        Essay: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };

    // --- DOM ELEMENTS ---
    // FIX: Cast elements to their specific types to access properties like .value and .reset()
    const form = document.getElementById('add-item-form') as HTMLFormElement;
    const topicInput = document.getElementById('topic') as HTMLInputElement;
    const subjectInput = document.getElementById('subject') as HTMLInputElement;
    const categoryInput = document.getElementById('category') as HTMLSelectElement;
    const dateTimeInput = document.getElementById('datetime') as HTMLInputElement;
    const studyList = document.getElementById('study-list');
    const emptyListMessage = document.getElementById('empty-list-message');
    const filterButtonsContainer = document.getElementById('filter-buttons');

    // --- ICONS (SVGs) ---
    const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`;
    const undoIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>`;
    const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>`;


    // --- LOCAL STORAGE ---
    const getItemsFromStorage = () => JSON.parse(localStorage.getItem('studyItems')) || [];
    const saveItemsToStorage = (items) => localStorage.setItem('studyItems', JSON.stringify(items));

    // --- RENDER ---
    const renderStudyItems = () => {
        const sortedItems = [...studyItems].sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
        
        let filteredItems = sortedItems;
        if (currentFilter === 'ACTIVE') {
            filteredItems = sortedItems.filter(item => !item.isCompleted);
        } else if (currentFilter === 'COMPLETED') {
            filteredItems = sortedItems.filter(item => item.isCompleted);
        }

        studyList.innerHTML = '';

        if (filteredItems.length === 0 && studyItems.length > 0) {
             emptyListMessage.style.display = 'block';
             emptyListMessage.querySelector('p.text-gray-500').textContent = `No ${currentFilter.toLowerCase()} items.`;
             emptyListMessage.querySelector('p.text-gray-400').textContent = 'Try selecting a different filter!';

        } else if (studyItems.length === 0) {
            emptyListMessage.style.display = 'block';
            emptyListMessage.querySelector('p.text-gray-500').textContent = `Your study plan is empty.`;
            emptyListMessage.querySelector('p.text-gray-400').textContent = 'Add a topic above to get started!';
        }
        else {
            emptyListMessage.style.display = 'none';
        }

        filteredItems.forEach(item => {
            const formattedDate = new Date(item.dateTime).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
            });
            
            const li = document.createElement('li');
            li.dataset.id = item.id;
            li.className = `flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg transition-all duration-300 border ${
                item.isCompleted ? 'bg-gray-100/80 opacity-70 border-gray-200' : 'bg-white hover:bg-blue-50/50 border-gray-200'
            }`;

            li.innerHTML = `
                <div class="flex-1 mb-4 sm:mb-0">
                    <p class="font-bold text-lg ${item.isCompleted ? 'line-through text-gray-400' : 'text-blue-600'}">
                        ${item.topic}
                    </p>
                    <div class="flex items-center mt-1 flex-wrap gap-y-2">
                        <span class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full border ${categoryStyles[item.category]}">
                            ${item.category}
                        </span>
                        <p class="text-sm text-gray-600">${item.subject}</p>
                    </div>
                    <p class="text-xs text-gray-400 mt-2">${formattedDate}</p>
                </div>
                <div class="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <button data-action="toggle" class="p-2 rounded-full transition-colors bg-gray-100 hover:bg-gray-200 ${item.isCompleted ? 'text-yellow-500' : 'text-green-500'}" aria-label="${item.isCompleted ? 'Mark as active' : 'Mark as complete'}">
                        ${item.isCompleted ? undoIcon : checkIcon}
                    </button>
                    <button data-action="delete" class="p-2 rounded-full text-red-500 bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Delete item">
                        ${trashIcon}
                    </button>
                </div>
            `;
            studyList.appendChild(li);
        });
        
        updateFilterButtons();
    };
    
    const updateFilterButtons = () => {
        const buttons = filterButtonsContainer.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.dataset.filter === currentFilter) {
                button.className = 'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 bg-blue-500 text-white shadow-md';
            } else {
                button.className = 'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300';
            }
        });
    };

    // --- EVENT HANDLERS ---
    const handleAddItem = (e) => {
        e.preventDefault();
        const topic = topicInput.value.trim();
        const subject = subjectInput.value.trim();
        const category = categoryInput.value;
        const dateTime = dateTimeInput.value;

        if (!topic || !subject || !dateTime) return;

        const newItem = {
            id: crypto.randomUUID(),
            topic,
            subject,
            category,
            dateTime,
            isCompleted: false,
        };
        studyItems.push(newItem);
        saveItemsToStorage(studyItems);
        renderStudyItems();
        form.reset();
        categoryInput.value = 'Homework'; // Reset select to default
    };

    const handleListClick = (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const li = e.target.closest('li');
        const itemId = li.dataset.id;
        const action = button.dataset.action;

        if (action === 'toggle') {
            studyItems = studyItems.map(item =>
                item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
            );
        }

        if (action === 'delete') {
            studyItems = studyItems.filter(item => item.id !== itemId);
        }

        saveItemsToStorage(studyItems);
        renderStudyItems();
    };

    const handleFilterClick = (e) => {
        const button = e.target.closest('button');
        if (button && button.dataset.filter) {
            currentFilter = button.dataset.filter;
            renderStudyItems();
        }
    };

    // --- INITIALIZATION ---
    const init = () => {
        studyItems = getItemsFromStorage();
        form.addEventListener('submit', handleAddItem);
        studyList.addEventListener('click', handleListClick);
        filterButtonsContainer.addEventListener('click', handleFilterClick);
        renderStudyItems();
    };

    init();
});