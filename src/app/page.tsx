'use client'
import RoomList from "@/app/_features/ui/RoomList";
import {useSocketStore} from "@/stores/socketStore";
import {useEffect} from "react";

export default function HomePage() {
		const socket = useSocketStore(state => state.socket);
		const { disconnect } = useSocketStore(state => state.actions);
		useEffect(() => {
			window.addEventListener('beforeunload', disconnect);
			return () => window.removeEventListener('beforeunload', disconnect);
		}, [socket,disconnect]);
    return (
      <section className="h-full w-full">
        <RoomList />
      </section>
    );
}
