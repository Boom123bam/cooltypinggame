export type PageState = "game" | "results";

export interface GameState {
  page: PageState;
  setPage: (page: PageState) => void;

  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}

export interface ModeOptions {
  time: number[];
  words: number[];
  infinite: null;
}

export interface SelectedModeState {
  mode: keyof ModeOptions;
  value: number | null;
}

export interface GameSettings {
  selectedMode: SelectedModeState;
  language: string;
  setSelectedMode: (selectedMode: SelectedModeState) => void;
}
