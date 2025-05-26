'use client';
import {ModalProps} from "@/interface";
import {IoNotificationsOutline} from "react-icons/io5";
import {useEffect, useState} from "react";
import {useModalStore} from "@/stores/modalStore";
import {ColorButton} from "@/components/global/button";

export const Modal = () => {
  const props: ModalProps | undefined = useModalStore(state => state.state);
  const clearModal = useModalStore(state => state.actions.clearModal);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(props?.type);
    if (props?.autoClose) {
      setCount(5);
      const timer = setTimeout(() => {
        clearModal();
      }, 5000)
      return () => clearTimeout(timer);
    }
  }, [props])
  useEffect(() => {
    if (count <= 0) return;
    console.log(count);
    const timer = setTimeout(() => {
      setCount(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count]);
  return (
    <div
      className={`${props?.type === "alert" ? "h-50" : "h-26"} border-default rounded-2xl border-1 transition-all duration-500 p-6 background-default`}>
      <a className="h-12 w-full flex-wrap overflow-hidden flex text-xl m-auto leading-[3rem]">
        <IoNotificationsOutline className="h-12 w-12 p-1 mt-0.5 mb-0.5"/>
        <p className="leading-[3.25rem]">{props?.title ? props?.title : "알람이 없습니다."}</p>
      </a>
      {props?.type === "alert" && <div className="flex flex-col gap-2 pt-1">
        <p>{props?.content}</p>
        <ColorButton function={() => {
          if (props?.action) props.action();
          clearModal();
        }}>확인 {props?.autoClose && `(${count})`}</ColorButton>
      </div>}
    </div>
  )
}