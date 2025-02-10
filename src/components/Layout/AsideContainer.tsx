import { CSSProperties, FC } from "react";

interface ContainerProps {
  children?: React.ReactNode;
  style?: CSSProperties;
}
export const AsideContainer: FC<ContainerProps> = ({ children, style }) => {
  return (
    <div
      style={{
        maxWidth: "1230px",
        width: "calc(100% - 25%)",
        margin: "0 auto",
        marginRight: "26%",
        padding: "0 16px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
