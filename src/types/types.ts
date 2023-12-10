export interface GameState {
  isFinished: boolean;
  setIsFinished: (isFinished: boolean) => void;

  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}

export interface GameModeOptions {
  time: number[];
  words: number[];
  infinite: null;
}

export interface gamemodeSettingsState {
  gamemode: keyof GameModeOptions;
  value: number | null;
}

export interface GameSettings {
  gamemodeSettings: gamemodeSettingsState;
  language: string;
  setGameModeSettings: (
    gamemodeSettings: gamemodeSettingsState
  ) => void;
}

export interface LastKeyStore {
  lastKeyPressed: string;
  lastKeyUpdateFlag: boolean;
  setLastKey: (lastKeyPressed: string) => void;
}

export interface StatsStore {
  wpm: number;
  accuracy: number;
  setStats: (wpm: number, accuracy: number) => void;
}
