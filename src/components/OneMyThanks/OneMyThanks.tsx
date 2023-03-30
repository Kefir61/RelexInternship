import { EOperaionType, IOneMyThanks } from "@utils";
import React, { useState } from "react";
import { FC } from "react";
import "./OneMyThanksStyle.scss";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { CommentsSection } from "@components";

interface OneMyThanksProps {
  thanks: IOneMyThanks;
}

export const OneMyThanks: FC<OneMyThanksProps> = ({ thanks }) => {
  return (
    <div className="congratsElem">
      <div className={thanks.thanksAmount > 0 ? "getCurrency" : "lostCurrency"}>
        {thanks.thanksAmount}
      </div>
      <div className="infoBlock">
        <div className="dateAndCreator">
          <div>
            Благодарность {thanks.operationType === EOperaionType.TO ? "для" : "от"}{" "}
            {thanks.user.lastName} {thanks.user.firstName[0]}. {thanks.user.patronymic[0]}.
          </div>
          <div>{thanks.createdAt.replace("T", " ")}</div>
        </div>
        <div>{thanks.comment}</div>
        <div className="commentAndLikeSection">
          <CommentsSection comments={thanks.comments} />
          <div className="likeSection">
            <div className={thanks.votesUp !== 0 ? "notZeroLikes" : "zeroLikesOrDis"}>
              <LikeOutlined />
              {thanks.votesUp}
            </div>
            <div className={thanks.votesDown !== 0 ? "notZeroDisLikes" : "zeroLikesOrDis"}>
              <DislikeOutlined />
              {thanks.votesDown}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
