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

export interface modeSettingsState {
  mode: keyof ModeOptions;
  value: number | null;
}

export interface GameSettings {
  modeSettings: modeSettingsState;
  language: string;
  setModeSettings: (modeSettings: modeSettingsState) => void;
}

export interface Timer {
  start: () => void;
  stop: () => void;
}
