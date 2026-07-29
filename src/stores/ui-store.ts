import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

export interface LifeVerse {
  id: string;
  reference: string;
  text: string;
}

interface UIState {
  settings: { name: string; theme: Theme };
  verses: LifeVerse[];
  updateSettings: (settings: Partial<{ name: string; theme: Theme }>) => void;
  addVerse: (verse: Omit<LifeVerse, "id">) => void;
  removeVerse: (id: string) => void;
}

function generateId(): string {
  return `v-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      settings: { name: "", theme: "light" },
      verses: [],
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),
      addVerse: (verse) =>
        set((state) => ({
          verses: [{ ...verse, id: generateId() }, ...state.verses],
        })),
      removeVerse: (id) =>
        set((state) => ({
          verses: state.verses.filter((v) => v.id !== id),
        })),
    }),
    { name: "trace-ui" }
  )
);
