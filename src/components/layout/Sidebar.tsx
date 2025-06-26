import Container, {GlassHighlightContainer} from "@/components/ui/Containers";
import Link from "next/link";
import React from "react";
import {Modal} from "@/components/layout/Modal";
interface NavBtnProps {
	children?: React.ReactNode;
	to: string;
}
const NavBtn:React.FC<NavBtnProps> = ({children, to}:NavBtnProps) => {
	return(
		<Link href={to} className="w-full h-10 block px-4 rounded-[1rem] hover:bg-[var(--highlight-color)]/60 transition-all duration-200">
			{children}
		</Link>
	)
}
const Sidebar:React.FC = () => {
  return(
    <aside className="h-full w-75 min-w-75">
	    <GlassHighlightContainer className={`h-full w-full rounded-[2rem] py-6 px-4 flex flex-col justify-between`}>
		    <Container className="flex flex-col gap-2">
		      <NavBtn to={"/"}>Home</NavBtn>
			    <NavBtn to={"/room"}>Room</NavBtn>
			    <NavBtn to={"/login"}>Login</NavBtn>
		    </Container>
		    <Modal/>
	    </GlassHighlightContainer>
    </aside>
  )
}
export default Sidebar;
