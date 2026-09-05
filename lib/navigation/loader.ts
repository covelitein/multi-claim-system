import { create } from "zustand";

type NavigationLoaderState = {
  visible: boolean;
  message: string;
  show: (message?: string) => void;
  hide: () => void;
};

export const useNavigationLoader = create<NavigationLoaderState>((set) => ({
  visible: false,
  message: "Loading...",
  show: (message = "Loading...") => set({ visible: true, message }),
  hide: () => set({ visible: false }),
}));
