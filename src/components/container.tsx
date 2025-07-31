import type { PropsWithChildren } from "react";
import "./container.css";

interface IContainer {
  vertical?: boolean;
}

export const Container = ({ vertical, children }: PropsWithChildren<IContainer>) =>
  <div className={`container ${vertical?'container--vertical':'container--horizontal'}`}>
    {children}
  </div>;
