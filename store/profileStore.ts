import { create } from 'zustand';

interface Profile {
  displayName?: string;
  goals: string[];
  maintenance: 'low' | 'medium' | 'high';
  time: '5' | '10' | '15+';
  budget: '$' | '$$' | '$$$';
}

interface ProfileState extends Profile {
  setGoals: (goals: string[]) => void;
  setMaintenance: (m: Profile['maintenance']) => void;
  setTime: (t: Profile['time']) => void;
  setBudget: (b: Profile['budget']) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  goals: [],
  maintenance: 'medium',
  time: '10',
  budget: '$$',
  setGoals: (goals) => set({ goals }),
  setMaintenance: (maintenance) => set({ maintenance }),
  setTime: (time) => set({ time }),
  setBudget: (budget) => set({ budget }),
}));
