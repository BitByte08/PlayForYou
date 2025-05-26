export interface ModalProps{
  type: string|undefined;
  title: string|undefined;
  content: string|undefined;
  action?: () => void;
  autoClose?: boolean;
}
interface MusicData {
  name: string;
  id: string;
}
export interface RoomState {
  currentMusic: MusicData;
  startedAt: number;
  endCount: number;
}