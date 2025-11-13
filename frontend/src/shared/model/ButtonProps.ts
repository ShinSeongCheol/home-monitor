import type {ChangeEvent, ReactNode} from "react";

export type ButtonProps = {
    svg?: ReactNode;
    value: string;
    type: "button" | "submit" | "reset";
    onClick?: () => void;
}

export type FileButtonProps = {
    svg?: ReactNode;
    value: string;
    type: "file";
    onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
}