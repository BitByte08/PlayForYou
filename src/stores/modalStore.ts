import {create} from "zustand";

interface ModalProps{
  type: string;
  title: string;
  content: string;
}
type ModalState = {
  state: {
    type: string;
    title: string;
    content: string;
  }|undefined
}
type ModalActions = {
  actions: {
    setModal: (state: ModalProps) => void;
    clearModal: () => void;
  }
}

export const useModalStore = create<ModalState & ModalActions>((set,get) => ({
  state : undefined,
  actions: {
    setModal: (props: ModalProps) => set({state:props}),
    clearModal: () => set({state: undefined}),
  }
}))