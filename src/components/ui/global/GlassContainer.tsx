import React from "react";

interface GlassCardProps {
	children: React.ReactNode;
	className?: string;
}

const GlassContainer: React.FC<GlassCardProps> = ({ children, className }) => {
	return (
		<div className={`glass text-default ${className}`}>
			{children}
		</div>
	);
};

export default GlassContainer;
