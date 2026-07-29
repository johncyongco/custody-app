import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TraceEntry } from "@/types";
import { normalizeFaculty } from "@/types";
import { faculties } from "@/data/faculties";

interface TraceState {
  entries: TraceEntry[];
  addEntry: (entry: Omit<TraceEntry, "id" | "created_at">) => void;
  removeEntry: (id: string) => void;
}

function generateId(): string {
  return `t-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

const labelMap: Record<string, string> = {};
for (const f of faculties) {
  labelMap[f.id] = f.label;
}

const allLabels = new Set(faculties.map((f) => f.label));

function isFullyConsecratedDay(dayEntries: TraceEntry[]): boolean {
  const consecrated = new Set<string>();
  for (const e of dayEntries) {
    if (e.movement === "Consecrated to the Holy Spirit") {
      consecrated.add(labelMap[normalizeFaculty(e.faculty)]);
    }
  }
  return allLabels.size > 0 && allLabels.size === consecrated.size;
}

export function computeDailyFaithfulness(entries: TraceEntry[]): { current: number; longest: number } {
  const toDate = (s: string) => new Date(s).toDateString();
  const groups = new Map<string, TraceEntry[]>();
  for (const e of entries) {
    if (e.movement === "Consecrated to the Holy Spirit") {
      const key = toDate(e.created_at);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(e);
    }
  }

  const faithfulDays = new Set<string>();
  for (const [day, dayEntries] of groups) {
    if (isFullyConsecratedDay(dayEntries)) {
      faithfulDays.add(day);
    }
  }

  let current = 0;
  const d = new Date();
  while (faithfulDays.has(toDate(d.toISOString()))) {
    current++;
    d.setDate(d.getDate() - 1);
  }

  const sorted = [...faithfulDays].sort();
  let longest = 0;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    if ((curr.getTime() - prev.getTime()) / 86400000 === 1) {
      run++;
    } else {
      longest = Math.max(longest, run);
      run = 1;
    }
  }
  longest = Math.max(longest, run, current);

  return { current, longest };
}

export const useTraceStore = create<TraceState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              ...entry,
              id: generateId(),
              created_at: new Date().toISOString(),
            },
            ...state.entries,
          ],
        })),
      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),
    }),
    { name: "trace-entries" }
  )
);
