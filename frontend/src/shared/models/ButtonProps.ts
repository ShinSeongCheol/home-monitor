import type { ReactNode } from "react";

export type ButtonProps = {
    svg?: ReactNode;
    value: string;
    type: "button" | "submit" | "reset";
    onClick?: () => void;
}