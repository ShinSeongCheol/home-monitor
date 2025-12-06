import React from "react";

export const useReplyButton = (setIsReplying: React.Dispatch<React.SetStateAction<boolean>>) => {

    const handleClick = () => {
        setIsReplying(true);
    }


    return {handleClick};
}