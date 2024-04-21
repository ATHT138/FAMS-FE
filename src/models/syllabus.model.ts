import { Material, TrainingDays } from "./outline.model";
export interface Syllabus {
  syllabusId?: string | null;
  topicName: string | null;
  code: string | null;
  version: string | null;
  createDate?: string | null;
  createBy: string | null;
  duration?: number | null;
  outputStandard: string[] | null;
  hours: number | null;
  status: number | null;
  trainingDays?: TrainingDay[],
}
export interface TrainingUnit {
  unitCode: string | null,
  unitName: string | null,
  trainingDayId: string | null,
  unitDuration: number | null,
  unitNumber: number | null,
  trainingContents: TrainingContent[]
}
export interface TrainingDay {
  dayNumber: number | null,
  trainingUnits: TrainingUnit[]
}
export interface TrainingContent {
  trainingContentId: string | null,
  trainingContent1: string | null,
  deliveryType: string | null,
  duration: number | null,
  outputStandard: string | null,
  note: string | null,
  unitCode: string | null,
  trainingMaterials: Material[]
}

export interface SyllabusDetail {
  syllabuseId?: string | null;
  topicName?: string | null;
  technicalRequirement: string | null;
  version: string | null;
  trainingDays: TrainingDays[] | null;
  level: number | null;
  syllabuseCode: string | null;
  listOutputStandard: string[] | null;
  duration: number | null;
  attendeeNumber: number | null;
  dayNumber: number | null;
  status: number | null;
  createdDate: Date | null;
  createdBy: string | null;
  modifiedDate: Date | null;
  modifiedBy: string | null;
  objective: string | null;
}

export interface SyllabusGerenal {
  syllabusId: string | null;
  topicName: string | null;
  technicalGroup: string | null;
  version: string | null;
}

export interface SyllabusOutline {
  syllabuseId: string | null;
  topicName: string | null;
  publishStatus: number | null;
  version: string | null;
  trainingDays: TrainingDays[] | null;
  timeAlocation: TimeAllocation | null;
}
export interface SyllabusOther {
  timeAlocation: TimeAllocation | null;
  assertmentScheme: AssertmentScheme | null;
  topicOutline: string | null;
  trainingPrinciples: string | null;
  priority: string | null;
  publishStatus: number | null;
  level: number | null;
}

export interface AssertmentScheme {
  quizz: number | null;
  assignment: number | null;
  final: number | null;
  finalTheory: number | null;
  finalPractice: number | null;
  gpa: number | null;
  syllabusId: string | null;
}
export interface TimeAllocation {
  assignment: number | null;
  concept: number | null;
  guide: number | null;
  test: number | null;
  exam: number | null;
}

export interface SelectedSyllabusInTrainingProgramRequestModel {
  syllabusesId?: string | null;
  sequence?: number | null;
}

export interface CreateSyllabus {
  syllabuseCode?: string | null;
  topicName?: string | null;
  technicalRequirement?: string | null;
  trainingPrinciples?: string | null;
  priority?: string | null;
  publishStatus?: number | null;
  level?: number | null;
  attendeeNumber?: number | null;
  objective?: string | null;
  outlineRequestModel?: TrainingDays[];
  createOtherRequestModel?: {
    quizz?: number | null;
    assignment?: number | null;
    final?: number | null;
    finalTheory?: number | null;
    finalPractice?: number | null;
    gpa?: number | null;
    trainingPrinciples?: string | null;
  };
}
export interface UpdateSyllabus {
  syllabuseId?: string | null;
  syllabuseCode?: string | null;
  topicName?: string | null;
  technicalRequirement?: string | null;
  trainingPrinciples?: string | null;
  priority?: string | null;
  publishStatus?: number | null;
  level?: number | null;
  attendeeNumber?: number | null;
  objective?: string | null;
  outlineRequestModel?: TrainingDays[];
  createOtherRequestModel?: {
    quizz?: number | null;
    assignment?: number | null;
    final?: number | null;
    finalTheory?: number | null;
    finalPractice?: number | null;
    gpa?: number | null;
    trainingPrinciples?: string | null;
  };
}

export interface ImportSyllabusModel {
  file: File;
  delimiter: string;
  byCode: boolean;
  byName: boolean;
  duplicationHandle: number;
}
