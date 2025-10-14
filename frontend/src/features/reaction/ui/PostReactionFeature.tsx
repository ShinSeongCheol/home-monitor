import { PostReactionButton } from "../../../entities/reaction"
import { usePostReactionFeature } from "../model/usePostReactionFeature"

export const PostReactionFeature = () => {

    const {reactions, isReactionExist, handleReaction} = usePostReactionFeature();

    return (
        <PostReactionButton reactions={reactions} isReactionExist={isReactionExist} handleReaction={handleReaction} />
    )
}