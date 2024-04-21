import { Session } from "./session.model";
import { TrainingProgram } from "./trainingProgram.model";

export interface Class {
  classId?: string | null;
  className?: string | null;
  classCode?: string | null;
  status?: number | null;
  location?: string | null;
  fsu?: string | null;
  duration?: number | null;
  createdBy?: string | null;
  createdOn?: string | null;
  modifiedBy?: string | null;
  modifiedDate?: string | null;
  trainingProgramId?: number | null;
  trainingProgram?: TrainingProgram | null;
  createdByName?: string | null;
  sessions?: Session[] | null;
  userManageClasses?: userManageClass[];
  trainingProgramViewClass: trainingProgramViewClass;
}

export interface trainingProgramViewClass {
  trainingProgramCode: number;
  name: string;
  createDate: Date;
  createBy: string;
  duration: number;
  totalHours: number;
  status: number;
  generalInformation: string | null;
  syllabuseViewClass: SyllabusView[];
}

export interface SyllabusView {
  syllabuseId: string | null;
  syllabuseCode: string | null;
  topicName: string | null;
  publishStatus: number | null;
  createDate: Date | null;
  createBy: string | null;
  technicalRequirement: string | null;
  version: string | null;
}

export interface userManageClass {
  userID: string | null;
  userType?: string | null;
  userName?: string | null;
}

export interface ListParamsClassCreate {
  className?: string;
  classCode?: string;
  location?: string;
  fsu?: string;
  status?: number;
  trainingProgramCode?: number;
  createSessionRequestModel?: SessionRequestModel;
  classUserRequests?: ClassUserRequest[];
}

export interface SessionRequestModel {
  days?: string[];
  startTime?: string;
  endTime?: string;
}

export interface ClassUserRequest {
  userId?: string;
}
