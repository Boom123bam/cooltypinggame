import { create } from "zustand";

interface IsTypingState {
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}

const useIsTypingStore = create<IsTypingState>()((set) => ({
  isTyping: false,
  setIsTyping: (isTyping: boolean) => set({ isTyping }),
}));

export interface ModeOptions {
  time: number[];
  words: number[];
  infinite: null;
}

interface SelectedModeState {
  mode: keyof ModeOptions;
  value: number | null;
}

interface GameSettings {
  selectedMode: SelectedModeState;
  language: string;
  setSelectedMode: (selectedMode: SelectedModeState) => void;
}

const useGameSettings = create<GameSettings>()((set) => ({
  setSelectedMode: (selectedMode: SelectedModeState) =>
    set({
      selectedMode,
    }),
  selectedMode: {
    mode: "time",
    value: 30,
  },
  language: "English_1k",
}));

export { useIsTypingStore, useGameSettings };
