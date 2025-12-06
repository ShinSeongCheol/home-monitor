import {Heart} from "lucide-react"
import type {Reaction} from "../model/type";

type ReactionButtonProps = {
    reactions: Reaction[] | undefined;
    isReactionExist: boolean | undefined;
    handleReaction: () => void;
}

export const ReactionButton = ({reactions, isReactionExist, handleReaction}: ReactionButtonProps) => {

    return (
        <div className='flex justify-start items-center gap-2 select-none hover:cursor-pointer'>
            <Heart size={"24px"} fill={isReactionExist ? '#f38383ff' : 'none'}
                   color={isReactionExist ? '#f38383ff' : 'black'} strokeWidth={1}
                   onClick={handleReaction}/> {reactions?.length ?? 0}
        </div>
    )
}