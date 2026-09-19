export interface Stats {
  currentStreak: number;
  longestStreak: number;
  // "YYYY-MM-DD" (local date), most recent ~30 kept.
  activeDates: string[];
}
