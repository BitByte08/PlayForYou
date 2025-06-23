import React from "react";

interface GlassCardProps {
	children: React.ReactNode;
	className?: string;
}

const Container: React.FC<GlassCardProps> = ({ children, className }) => {
	return (
		<div className={`text-default ${className}`}>
			{children}
		</div>
	);
};

export default Container;
