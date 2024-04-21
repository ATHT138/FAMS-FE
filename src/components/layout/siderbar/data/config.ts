import { ReactNode } from "react";

export type menuType = {
  displayText: string;
  path?: string;
  icon?: ReactNode;
  child?: menuType[];
};
