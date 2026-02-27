export type PenaltyType = 'TIME' | 'SUPER_RALLY';

export interface PenaltyConfig {
  id: string;
  name: string;
  type: PenaltyType;
  timeValueMs: number;
}

export interface Participant {
  id: string;
  driverName: string;
  hasCoDriver: boolean;
  coDriverName?: string;
  car: string;
  nationality?: string;
}

export interface Stage {
  id: string;
  identifier: string; // e.g., SS1
  name: string;
}

export interface StageTime {
  id: string;
  participantId: string;
  stageId: string;
  timeMs: number;
  penaltyConfigIds?: string[];
  isDnf?: boolean;
}

export interface Rally {
  id: string;
  name: string;
  participants: Participant[];
  stages: Stage[];
  penaltyConfigs: PenaltyConfig[];
  stageTimes: StageTime[];
}
