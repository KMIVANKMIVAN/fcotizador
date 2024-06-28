import create from 'zustand';

const useStore = create((set) => ({
  idCotizador: 0,
  guardarIdCotizador: (id) => set({ idCotizador: id }),
}));

export default useStore;
