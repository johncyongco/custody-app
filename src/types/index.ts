export interface TraceEntry {
  id: string;
  faculty: Faculty;
  movement: string;
  reflection: string;
  fruit: string;
  source: string;
  time: string;
  notes: string;
  created_at: string;
}

export type Faculty =
  | "mind"
  | "eyes"
  | "ears"
  | "nose"
  | "mouth"
  | "heart"
  | "hands"
  | "feet"
  | "whole body";

export interface FacultyInfo {
  id: Faculty;
  label: string;
  description: string;
  scripture: string;
  consecration: string;
}

export type HolySymbol =
  | "dove"
  | "fire"
  | "wind"
  | "breath"
  | "clothing"
  | "temple"
  | "fruit";

export interface HolySymbolInfo {
  id: HolySymbol;
  emoji: string;
  icon: string;
  title: string;
  meaning: string;
  scripture: string;
  prayer: string;
  reflection: string;
  consecration: string;
}
