'use client';
import {useState, useEffect} from 'react';
import {IoCreateOutline, IoPersonOutline} from "react-icons/io5";
import {Modal} from "@/components/layout/modal";
import Link from "next/link";
import {useModalStore} from "@/stores/modalStore";

interface SectionProps {
  href: string;
  children: React.ReactNode;
}

export const Sidebar = () => {
  const modal = useModalStore(state => state.state);
  const modalHandle = (state:boolean) => {
    if (modal) setIsSidebarOpen(true);
    else setIsSidebarOpen(state);
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    modalHandle(false);
  }, [modal]);
  return (
    <div className={`h-full ${isSidebarOpen ? "w-128" : " w-26"} transition-all duration-500 flex flex-col gap-4`}
         onMouseEnter={() => modalHandle(true)}
         onMouseLeave={() => modalHandle(false)}>
      <section
        className={`h-[calc(100%-7.5rem)] border-default rounded-2xl border-1 transition-all duration-500 flex flex-col p-6 background-default`}
        id="sidebar"
      >
        <Section href={"/login"}>
          <IoPersonOutline className="h-12 w-12 p-1"/>
          사용자
        </Section>
        <Section href={"/room"}>
          <IoCreateOutline className="h-12 w-12 pl-1.5 pr-0.5 pt-1 pb-1"/>
          방 생성하기
        </Section>
      </section>
      <Modal/>
    </div>
  )
}

const Section = (props: SectionProps) => {
  return (
    <div className="h-fit min-h-12 border-b-1 flex flex-col">
      <Link href={props?.href}
            className="w-full m-auto cursor-pointer h-12 leading-[3rem] text-xl overflow-hidden flex flex-wrap"
      >
        {props?.children}
      </Link>
    </div>
  )
}
