export interface Session {
  sessionId?: string | null;
  classId?: string | null;
  day?: Date | null;
  startTime?: Date | null;
  endTime?: Date | null;
  className?: string | null;
  classCode?: string | null;
  status?: number | null;
  location?: string | null;
  fsu?: string | null;
  name?: string | null;
}
