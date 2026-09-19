import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "@react-native-firebase/auth";
import { subscribeToStats } from "../services/firebase/stats";
import { Stats } from "../types/stats";

const defaultStats: Stats = { currentStreak: 0, longestStreak: 0, activeDates: [] };

interface StatsContextValue {
  stats: Stats;
  loading: boolean;
}

const StatsContext = createContext<StatsContextValue | undefined>(undefined);

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToStats(uid, next => {
      setStats(next);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <StatsContext.Provider value={{ stats, loading }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error("useStats must be used within a StatsProvider");
  return ctx;
};
