import {X} from "lucide-react";
import {ModalPortal} from "./Modal.tsx";
import React from "react";

type BackOfficeModalLayoutProps = {
    title: string;
    content: string;
    cancel: () => void;
    children: React.ReactNode;
}

export const BackOfficeModalLayout = ({title, content, cancel, children}: BackOfficeModalLayoutProps) => {
    return (
        <ModalPortal>
            <div className={'fixed top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center z-50'}>
                <div className={'relative bg-white w-xl flex flex-col gap-4 border border-gray-300 rounded-sm p-6 box-border'}>

                    <X className={'absolute top-3 right-3 cursor-pointer'} color='grey' size={24} strokeWidth={1} onClick={cancel}/>

                    <div className={`flex flex-col gap-2 select-none`}>
                        <h2 className={'text-2xl font-medium'}>{title}</h2>
                        <p className={'text-gray-500'}>{content}</p>
                    </div>

                    <div className={`flex flex-col gap-4`}>
                        {children}
                    </div>
                </div>
            </div>
        </ModalPortal>
    )
}