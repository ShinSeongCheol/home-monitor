import { Heart } from "lucide-react"
import type { Reaction } from "../model/type";

type PostReactionButtonProps = {
    reactions: Reaction[];
    isReactionExist: boolean | undefined;
    handleReaction: () => void;
}

export const PostReactionButton = ({reactions, isReactionExist, handleReaction}: PostReactionButtonProps) => {

    return (
        <div className='flex justify-start items-center gap-2 select-none hover:cursor-pointer'>
            <Heart size={"24px"} fill={ isReactionExist ? '#f38383ff' : 'none'} color={isReactionExist ? '#f38383ff' : 'black'} strokeWidth={1} onClick={handleReaction} /> {reactions.length}
        </div>
    )
}