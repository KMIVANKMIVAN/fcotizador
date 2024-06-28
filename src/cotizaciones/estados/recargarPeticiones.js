import create from 'zustand';

const useStoreRecargador = create((set) => ({
  recargador: 0,
  increcargador: () => set((state) => ({ recargador: state.recargador + 1 })),
}));

export default useStoreRecargador;
