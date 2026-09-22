import { create } from 'zustand';

export interface Strength {
  title: string;
  evidence: string;
  leverage: string;
}

export interface Opportunity {
  id: string;
  category: string;
  title: string;
  what: string;
  why: string;
  how: string;
  effort: 'low' | 'medium' | 'high';
  timeline: string;
  maintenance: 'low' | 'medium' | 'high';
  impact: 'high' | 'medium' | 'low';
}

export interface CategoryAssessment {
  status: 'strong' | 'good' | 'opportunity';
  notes: string;
}

export interface ImpactMap {
  high: string[];
  medium: string[];
  low: string[];
}

export interface Analysis {
  profile_summary: string;
  strengths: Strength[];
  opportunities: Opportunity[];
  categories: Record<string, CategoryAssessment>;
  impact_map: ImpactMap;
  confidence: 'low' | 'medium' | 'high';
  is_demo: boolean;
  provider: string;
}

interface AnalysisState {
  current: Analysis | null;
  isAnalyzing: boolean;
  setAnalysis: (a: Analysis) => void;
  setAnalyzing: (v: boolean) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  current: null,
  isAnalyzing: false,
  setAnalysis: (current) => set({ current }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
}));
