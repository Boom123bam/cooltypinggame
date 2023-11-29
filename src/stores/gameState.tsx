import { create } from "zustand";

interface isTypingState {
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}

const useIsTypingStore = create<isTypingState>()((set) => ({
  isTyping: false,
  setIsTyping: (isTyping: boolean) => set({ isTyping }),
}));

export { useIsTypingStore };
