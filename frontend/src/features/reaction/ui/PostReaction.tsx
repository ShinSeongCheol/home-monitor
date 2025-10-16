import { ReactionButton } from "../../../entities/reaction"
import { usePostReactionFeature } from "../model/usePostReactionFeature"

export const PostReaction = () => {

    const {reactions, isReactionExist, handleReaction} = usePostReactionFeature();

    return (
        <ReactionButton reactions={reactions} isReactionExist={isReactionExist} handleReaction={handleReaction} />
    )
}