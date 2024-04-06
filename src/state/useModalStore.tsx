import {create} from 'zustand';


interface ModalState {
    modals: { [key: string]: boolean };
    openModal: (key: string) => void;
    closeModal: (key: string) => void;
  }
  
const useModalStore = create<ModalState>((set) => ({
  modals: {},
  openModal: (key: string) => set((state) => ({ modals: { ...state.modals, [key]: true } })),
  closeModal: (key: string) => set((state) => ({ modals: { ...state.modals, [key]: false } })),
}));

export default useModalStore;
