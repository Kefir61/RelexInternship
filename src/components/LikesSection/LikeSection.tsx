import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { EReactionType } from "@utils";
import React, { FC } from "react";
import "./LikeSectionStyle.scss";

interface LikeSectionProps {
  id: number;
  votesUp: number;
  votesDown: number;
  userReaction: EReactionType;
  action: (id: number, reaction: EReactionType) => {};
}

export const LikeSection: FC<LikeSectionProps> = ({
  id,
  votesUp,
  votesDown,
  userReaction,
  action,
}) => {
  const onReactToThank = (type: EReactionType) => {
    if (userReaction != type) {
      action(id, type);
    } else {
      action(id, EReactionType.NONE);
    }
  };

  return (
    <div className="likeSection">
      <div
        className={userReaction === EReactionType.LIKE ? "notZeroLikes" : "zeroLikesOrDis"}
        onClick={() => onReactToThank(EReactionType.LIKE)}
      >
        <LikeOutlined />
        {votesUp}
      </div>
      <div
        className={userReaction === EReactionType.DISLIKE ? "notZeroDisLikes" : "zeroLikesOrDis"}
        onClick={() => onReactToThank(EReactionType.DISLIKE)}
      >
        <DislikeOutlined />
        {votesDown}
      </div>
    </div>
  );
};
