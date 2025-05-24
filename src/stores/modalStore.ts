import { ModalProps } from "@/interface";
import {create} from "zustand";

type ModalState = {
  state: ModalProps|undefined
}
type ModalActions = {
  actions: {
    setModal: (state: ModalProps) => void;
    clearModal: () => void;
  }
}

export const useModalStore = create<ModalState & ModalActions>((set) => ({
  state : undefined,
  actions: {
    setModal: (props: ModalProps) => set({state:props}),
    clearModal: () => set({state: undefined}),
  }
}))