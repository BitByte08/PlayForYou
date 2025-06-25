import React from "react";

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}
const Container: React.FC<ContainerProps> = ({ children, className }) => {
	return (
		<div className={`text-default ${className}`}>
			{children}
		</div>
	);
};
const GlassContainer: React.FC<ContainerProps> = ({ children, className }) => {
	return (
		<div className={`text-default glass-default ${className}`}>
			{children}
		</div>
	)
}
const GlassHighlightContainer: React.FC<ContainerProps> = ({ children, className }) => {
	return (
		<div className={`text-default glass-highlight-default ${className}`}>
			{children}
		</div>
	)
}
export default Container;
export {GlassContainer, GlassHighlightContainer};
