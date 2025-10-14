import { Heart } from "lucide-react"
import { useReactionButton } from "../model/useReactionButton";

type ReactionButtonProps = {
    handleReaction: () => void;
}

export const ReactionButton = ({handleReaction}: ReactionButtonProps) => {

    const {reactions, isReactionExist} = useReactionButton();

    return (
        <div className='flex justify-start items-center gap-2 select-none hover:cursor-pointer'>
            <Heart size={"24px"} fill={ isReactionExist ? '#f38383ff' : 'none'} color={isReactionExist ? '#f38383ff' : 'black'} strokeWidth={1} onClick={handleReaction} /> {reactions.length}
        </div>
    )
}