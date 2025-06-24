import {useRouter} from "next/navigation";

interface RoomButtonProps {
  roomId: string;
  deleteRoom: (roomId: string) => void;
}

const RoomButton = (props:RoomButtonProps) => {
  const router = useRouter();
  const { roomId, deleteRoom } = props;
  return (
    <div className='w-1/2 h-20 px-1 pt-1 pb-1' >
      <section className='w-full h-ful glass-highlight-default flex rounded-lg p-2' >
        <button className='w-full'
                onClick={() => router.push(`/room/${roomId}`)}>{roomId}</button>
        <div className='ml-auto border-l-1 border-gray-300 dark:border-gray-700 pl-2 min-w-17 flex flex-col justify-between'>
          <button className='w-full border-1 border-default rounded primary' onClick={() => deleteRoom(roomId)}>
            방 삭제
          </button>
          <button className='w-full border-1 border-default rounded primary' onClick={() => deleteRoom(roomId)}>
            방 삭제
          </button>
        </div>
      </section>
    </div>
  )
}
export default RoomButton;