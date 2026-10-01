'use client';

import { create } from 'zustand';

type UIState = {
  searchOpen: boolean;
  menuOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openMenu: () => void;
  closeMenu: () => void;
};

/** Paneles globales (buscador y menú) que se abren desde el header o la barra inferior. */
export const useUI = create<UIState>()((set) => ({
  searchOpen: false,
  menuOpen: false,
  openSearch: () => set({ searchOpen: true, menuOpen: false }),
  closeSearch: () => set({ searchOpen: false }),
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
}));
