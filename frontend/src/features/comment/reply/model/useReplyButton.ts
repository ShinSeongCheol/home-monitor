import {useState} from "react";

export const useReplyButton = () => {

    const [isReplying, setIsReplying] = useState<boolean>(false);

    const handleClick = () => {
        setIsReplying(!isReplying);
    }

    return {isReplying, handleClick};
}