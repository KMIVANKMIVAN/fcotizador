import create from 'zustand';

const authTienda = create((set) => ({
  id: '',
  ci: '',
  camb_contra: false,
  setId: (newId) => set({ id: newId }),
  setCi: (newCi) => set({ ci: newCi }),
  setCambContra: (newCambContra) => set({ camb_contra: newCambContra }),
}));

export { authTienda };
