
export enum StudyItemCategory {
    HOMEWORK = 'Homework',
    TEST = 'Test',
    PROJECT = 'Project',
    ESSAY = 'Essay',
}

export interface StudyItem {
  id: string;
  topic: string;
  subject: string;
  dateTime: string;
  isCompleted: boolean;
  category: StudyItemCategory;
}

export enum FilterType {
    ALL = 'ALL',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
}