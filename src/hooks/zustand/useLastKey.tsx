import { create } from "zustand";
import { LastKeyStore } from "../../types/types";

const useLastKey = create<LastKeyStore>()((set) => ({
  lastKeyPressed: "",
  lastKeyUpdateFlag: true,
  setLastKey: (lastKeyPressed: string) => {
    set((state) => ({
      lastKeyPressed,
      lastKeyUpdateFlag: !state.lastKeyUpdateFlag,
    }));
  },
}));

export { useLastKey };
