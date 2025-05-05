
interface MusicData {
  name: string;
  id: string;
}
export interface RoomState {
  currentMusic: MusicData;
  startedAt: number;
  endCount: number;
}