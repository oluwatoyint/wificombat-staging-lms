import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DashboardState {
  dashboardData: any;
  setDashboardData: (data: any) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      dashboardData: null,
      setDashboardData: (data: any) => set({ dashboardData: data }),
    }),
    {
      name: 'dashboard-storage', // unique name for the localStorage key
      storage: createJSONStorage(() => localStorage), // use createJSONStorage to handle storage with JSON
    }
  )
);