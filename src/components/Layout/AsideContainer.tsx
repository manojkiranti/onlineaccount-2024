import { CSSProperties, FC } from "react";

interface ContainerProps {
  children?: React.ReactNode;
  style?: CSSProperties;
}
export const AsideContainer: FC<ContainerProps> = ({ children, style }) => {
  return (
    <div
     className="aside-container"
      style={{
        
        ...style,
      }}
    >
      {children}
    </div>
  );
};
