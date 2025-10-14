import { ReactionButton } from "../../../entities/reaction"
import { useReactionFeature } from "../model/useReactionFeature"

export const ReactionFeature = () => {

    const {handleReaction} = useReactionFeature();

    return (
        <ReactionButton handleReaction={handleReaction}/>
    )
}