import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from "@react-native-firebase/firestore";
import { Stats } from "../../types/stats";

const statsDoc = (userId: string) => doc(getFirestore(), "stats", userId);

export const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/** Live streak/activity for the current user (defaults to zeros before their first session). */
export const subscribeToStats = (
  userId: string,
  onChange: (stats: Stats) => void,
) => {
  return onSnapshot(statsDoc(userId), snap => {
    const data = snap.data() as Partial<Stats> | undefined;
    onChange({
      currentStreak: data?.currentStreak ?? 0,
      longestStreak: data?.longestStreak ?? 0,
      activeDates: data?.activeDates ?? [],
    });
  });
};

/**
 * Call once when a user finishes a study or quiz session. Bumps the streak if
 * today continues yesterday's, resets it if a day was missed, and records
 * today in the rolling activity window (used for the "This Week" calendar).
 */
export const recordStudyActivity = async (userId: string) => {
  const ref = statsDoc(userId);
  const snap = await getDoc(ref);
  const existing = snap.data() as Partial<Stats & { lastStudyDate: string }> | undefined;

  const today = formatDateKey(new Date());
  if (existing?.lastStudyDate === today) return; // already logged today

  let currentStreak = 1;
  if (existing?.lastStudyDate) {
    const yesterday = formatDateKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
    if (existing.lastStudyDate === yesterday) {
      currentStreak = (existing.currentStreak ?? 0) + 1;
    }
  }

  const activeDates = Array.from(new Set([...(existing?.activeDates ?? []), today]))
    .sort()
    .slice(-30);

  await setDoc(
    ref,
    {
      lastStudyDate: today,
      currentStreak,
      longestStreak: Math.max(currentStreak, existing?.longestStreak ?? 0),
      activeDates,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};
