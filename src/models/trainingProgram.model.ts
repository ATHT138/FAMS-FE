import {
  SelectedSyllabusInTrainingProgramRequestModel,
  Syllabus,
  User,
} from ".";
import { Class } from "./class.model";

export interface TrainingProgram {
  trainingProgramCode?: number | null;
  name?: string | null;
  startTime?: string;
  status?: number | null;
  generalInformation?: string | null;
  createdAt: string;
  createdBy?: User;
  modifiedBy?: User | null;
  lastModifiedAt: string;
  totalDays: number | -1;
  totalHours: number | -1;
  classes?: Class[] | null;
  syllabuses?: Syllabus[] | null;
}

export interface ImportTrainingProgramModel {
  file: File;
  delimiter: string;
  byCode: boolean;
  byName: boolean;
  duplicationHandle: number;
}

export interface SearchTrainingProgram {
  page: number;
  pageSize: number;
  idSortBy: boolean;
  programNameSortBy: boolean;
  createdOnSortBy: boolean;
  createdBySortBy: boolean;
  durationSortBy: boolean;
  statusSortBy: boolean;
  Filers: string[];
}

export interface CreateTrainingProgram {
  name?: string | null;
  startTime?: Date | null;
  syllabusesIds?: SelectedSyllabusInTrainingProgramRequestModel[] | null;
  status?: number | null;
  generalInformation?: string | null;
}

export interface UpdateTrainingProgram {
  name?: string | null;
  startTime?: string | null;
  duration?: number | null;
  status?: number | null;
  generalInformation?: string | null;
  syllabusesIds?: SelectedSyllabusInTrainingProgramRequestModel[] | null;
}