import {createPortal} from "react-dom";
import type {ReactNode} from "react";

type ModalPortalProps = {
    children: ReactNode;
}

export const ModalPortal = ({children} : ModalPortalProps) => {
    const modalRoot = document.getElementById('modal-root');
    if(!modalRoot) return;

    return createPortal(children, modalRoot);
}