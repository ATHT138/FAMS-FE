export interface Material {
  materialId?: string;
  name?: string;
  link: string;
  createBy?: string;
  createDate: Date;
  trainingContentId?: string;
  status: boolean;
}

export interface Content {
  id?: string;
  countContent: number;
  name?: string;
  materials: Material[] | null;
  outputStandard?: string;
  trainingFormat?: string;
  time?: number;
  status: boolean;
  deliveryType?: string;
  note?: string;
  upload?: string;
}

export interface Unit {
  id?: string;
  countUnit: number;
  name: string;
  createContent?: boolean;
  contents: Content[];
}

export interface Day {
  id?: string;
  countDay: number;
  units: Unit[];
}

export interface Data {
  days: Day[];
}

export interface TrainingDays {
  dayNumber: number | null;
  trainingUnitRequestModels: TrainingUnits[] | null;
}

export interface TrainingUnits {
  // unitCode: string | null;
  unitName: string | null;
  trainingContents: TrainingContents[] | null;
  // trainingDayId: string | null;
  unitDuration?: number | null;
  unitNumber?: number | null;
}

export interface TrainingContents {
  trainingContent1: string | null;
  // trainingContentId: string | null;
  deliveryType: string | null;
  duration: number | null;
  outputStandard: string | null;
  trainingFormat: string | null;
  note: string | null;
  materialViewModels: Material[] | null;
  // unitCode: string | null;
}

export interface MaterialViewModels {
  materialId: string | null;
  name: string | null;
  link: string | null;
  createdBy: string | null;
  createdDate: Date | null;
  trainingContentId: string | null;
  status: boolean | null;
}

export interface OutlineRequestModel {
  dayNumber?: number;
  trainingUnitRequestModal?: TrainingUnitRequestModel[];
}

export interface TrainingUnitRequestModel {
  unitName?: string;
  trainingContents?: TrainingContents[];
}

export interface TrainingContentsRequestModel {
  trainingContent1?: string;
  deliveryType?: string;
  duration?: number;
  trainingFormat?: string;
  note?: string;
}

export interface materialRequestModel {
  name?: string;
  link?: string;
  createdBy?: string;
}
