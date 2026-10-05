"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

export interface StageConfig {
  stage: number;
  route: string;
  codename: string;
}

export const STAGE_ROUTES: Record<number, StageConfig> = {
  1: { stage: 1, route: "/", codename: "Projector Clue" },
  2: { stage: 2, route: "/rebel", codename: "Rebel Clandestine Cache" },
  3: { stage: 3, route: "/orbital", codename: "Corporate Portal & Employee Badge" },
  4: { stage: 4, route: "/auth/login", codename: "Credential Ingestion" },
  5: { stage: 5, route: "/dashboard/t4", codename: "Tier 4 Intranet & O.R.B.I.T." },
  6: { stage: 6, route: "/dashboard/t3", codename: "Tier 3 Incident Logs" },
  7: { stage: 7, route: "/dashboard/t2", codename: "Tier 2 Route Selection" },
  8: { stage: 8, route: "/git", codename: "Simulated Repo Browser" },
  9: { stage: 9, route: "/wcc", codename: "Win Condition Checker" },
} as const;

export const MIN_STAGE = 1;
export const MAX_STAGE = 9;

export type ClassLevel = "3-5" | "6-8" | "9-12";

export interface UserProfile {
  id: string;
  name: string;
  clearance: string;
}

export interface GameStateContextValue {
  unlockedStage: number;
  completedStages: number[];
  penaltyTimeSec: number;
  classLevel: ClassLevel;
  setClassLevel: (level: ClassLevel) => void;
  isTeacherNoteOpen: boolean;
  setIsTeacherNoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unlockNextStage: (stageIndex: number) => void;
  resetGame: () => void;
  addPenaltyTime: (seconds: number) => void;
  highestAccessibleRoute: string;
  isHydrated: boolean;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
}

const STORAGE_KEY = "orbital_eclipse_protocol_state_v1";

interface SerializedState {
  unlockedStage: number;
  completedStages: number[];
  penaltyTimeSec: number;
  classLevel?: ClassLevel;
  currentUser?: UserProfile | null;
}

const DEFAULT_STATE: SerializedState = {
  unlockedStage: 1,
  completedStages: [],
  penaltyTimeSec: 0,
  classLevel: "6-8",
  currentUser: null,
};

const GameStateContext = createContext<GameStateContextValue | undefined>(undefined);

export interface GameStateProviderProps {
  children: ReactNode;
}

export const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
  const [unlockedStage, setUnlockedStage] = useState<number>(DEFAULT_STATE.unlockedStage);
  const [completedStages, setCompletedStages] = useState<number[]>(DEFAULT_STATE.completedStages);
  const [penaltyTimeSec, setPenaltyTimeSec] = useState<number>(DEFAULT_STATE.penaltyTimeSec);
  const [classLevel, setClassLevel] = useState<ClassLevel>(DEFAULT_STATE.classLevel ?? "6-8");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEFAULT_STATE.currentUser ?? null);
  const [isTeacherNoteOpen, setIsTeacherNoteOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Hydrate state from localStorage on mount (SSR safe)
  useEffect(() => {
    try {
      const persisted = localStorage.getItem(STORAGE_KEY);
      if (persisted) {
        const parsed: Partial<SerializedState> = JSON.parse(persisted);
        if (typeof parsed.unlockedStage === "number") {
          setUnlockedStage(Math.min(MAX_STAGE, Math.max(MIN_STAGE, parsed.unlockedStage)));
        }
        if (Array.isArray(parsed.completedStages)) {
          setCompletedStages(parsed.completedStages);
        }
        if (typeof parsed.penaltyTimeSec === "number") {
          setPenaltyTimeSec(Math.max(0, parsed.penaltyTimeSec));
        }
        if (parsed.classLevel && ["3-5", "6-8", "9-12"].includes(parsed.classLevel)) {
          setClassLevel(parsed.classLevel);
        }
        if (parsed.currentUser) {
          setCurrentUser(parsed.currentUser);
        }
      }
    } catch (err) {
      console.warn("[ORBITAL Protocol] Failed to parse local game state:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist updates to localStorage once hydrated
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const payload: SerializedState = {
        unlockedStage,
        completedStages,
        penaltyTimeSec,
        classLevel,
        currentUser,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("[ORBITAL Protocol] Failed to persist game state:", err);
    }
  }, [unlockedStage, completedStages, penaltyTimeSec, classLevel, currentUser, isHydrated]);

  const unlockNextStage = useCallback((stageIndex: number) => {
    setCompletedStages((prev) => (prev.includes(stageIndex) ? prev : [...prev, stageIndex]));
    setUnlockedStage((prev) => {
      const nextStage = Math.min(MAX_STAGE, Math.max(prev, stageIndex + 1));
      return nextStage;
    });
  }, []);

  const addPenaltyTime = useCallback((seconds: number) => {
    setPenaltyTimeSec((prev) => Math.max(0, prev + seconds));
  }, []);

  const resetGame = useCallback(() => {
    setUnlockedStage(DEFAULT_STATE.unlockedStage);
    setCompletedStages(DEFAULT_STATE.completedStages);
    setPenaltyTimeSec(DEFAULT_STATE.penaltyTimeSec);
    setClassLevel(DEFAULT_STATE.classLevel ?? "6-8");
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn("[ORBITAL Protocol] Failed to clear game state:", err);
    }
  }, []);

  const highestAccessibleRoute = useMemo(() => {
    return STAGE_ROUTES[unlockedStage]?.route ?? "/";
  }, [unlockedStage]);

  const value = useMemo<GameStateContextValue>(
    () => ({
      unlockedStage,
      completedStages,
      penaltyTimeSec,
      classLevel,
      setClassLevel,
      isTeacherNoteOpen,
      setIsTeacherNoteOpen,
      unlockNextStage,
      resetGame,
      addPenaltyTime,
      highestAccessibleRoute,
      isHydrated,
      currentUser,
      setCurrentUser,
    }),
    [
      unlockedStage,
      completedStages,
      penaltyTimeSec,
      classLevel,
      isTeacherNoteOpen,
      unlockNextStage,
      resetGame,
      addPenaltyTime,
      highestAccessibleRoute,
    ]
  );

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
};

export const useGameState = (): GameStateContextValue => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a <GameStateProvider>");
  }
  return context;
};
