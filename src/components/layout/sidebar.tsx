import Container from "@/components/ui/global/Container";
import Link from "next/link";
import React from "react";
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
	    <Container className={`h-full w-full rounded-[2rem] py-6 px-4 glass-highlight-default flex flex-col gap-2`}>
		      <NavBtn to={"/"}>Home</NavBtn>
			    <NavBtn to={"/room"}>Room</NavBtn>
			    <NavBtn to={"/login"}>Login</NavBtn>
	    </Container>
    </aside>
  )
}
export default Sidebar;