import { create } from 'zustand';

type UIState = {
  isModalOpen: boolean;
  isSidebarOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  isSidebarOpen: false,

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
}));

