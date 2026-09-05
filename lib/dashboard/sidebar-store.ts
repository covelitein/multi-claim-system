import { create } from "zustand";

type SidebarState = {
  expanded: boolean;
  mobileOpen: boolean;
  toggle: () => void;
  openMobile: () => void;
  closeMobile: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  expanded: true,
  mobileOpen: false,
  toggle: () => set((state) => ({ expanded: !state.expanded })),
  openMobile: () => set({ mobileOpen: true }),
  closeMobile: () => set({ mobileOpen: false }),
}));
