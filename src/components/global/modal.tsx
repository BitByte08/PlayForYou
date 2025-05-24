'use client'
import {ModalProps} from "@/interface";
import { IoNotificationsOutline } from "react-icons/io5";
import {useEffect} from "react";
import {useModalStore} from "@/stores/modalStore";
import {ColorButton} from "@/components/global/button";

export const Modal = () => {
    const props:ModalProps|undefined = useModalStore(state => state.state);
    const clearModal = useModalStore(state => state.actions.clearModal);
    useEffect(() => {
      console.log(props?.type);
    },[props])
    return (
      <div className={`${props?.type==="alert"?"h-50":"h-26"} border-default rounded-2xl border-1 transition-all duration-500 p-6 background-default`}>
        <a className="h-12 w-full flex-wrap overflow-hidden flex text-xl m-auto leading-[3rem]">
          <IoNotificationsOutline className="h-12 w-12 p-1 mt-0.5 mb-0.5"/>
          {props?.title ? <p>{props?.title}</p>:<p>알람이 없습니다.</p>}
        </a>
        {props?.type==="alert" && <div className="flex flex-col">
          <p>{props?.content}</p>
          <ColorButton function={()=>{
            props.function();
            clearModal();
          }}>확인</ColorButton>
        </div>}
      </div>
    )
}