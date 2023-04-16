import { appSelector } from "@store";
import {
  EOperaionType,
  EReactionType,
  IOneMyThanks,
  briefLongNum,
  formattedDateTZ,
  generateFio,
} from "@utils";
import React, { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import { fetchReactToThank } from "../../store/slices/myThanksSlice";
import { LikeSection } from "../LikesSection";
import "./OneMyThanksStyle.scss";

interface OneMyThanksProps {
  thanks: IOneMyThanks;
}
export const OneMyThanks: FC<OneMyThanksProps> = ({ thanks }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = appSelector<string>((state) => state.UserInfo.user.id);
  const date: string = useMemo(() => formattedDateTZ(thanks.createdAt), []);

  const formatedValue = useMemo(() => {
    return briefLongNum(thanks.thankAmount);
  }, []);

  const handleLikeChange = (id: number, reaction: EReactionType) =>
    dispatch(fetchReactToThank({ id, reaction }));

  const ThankFromOrTo = useMemo(() => {
    if (thanks.fromUser.id === currentUserId) {
      return `Благодарность для ${generateFio(thanks.toUser)}`;
    } else if (thanks.toUser.id === currentUserId) {
      return `Благодарность от ${generateFio(thanks.fromUser)}`;
    }
  }, []);

  return (
    <div className="congratsElem">
      <div className={thanks.toUser.id === currentUserId ? "getCurrency" : "lostCurrency"}> 
        {formatedValue}
      </div>
      <div className="infoBlock">
        <div className="dateAndCreator">
          <div>{ThankFromOrTo}</div>
          <div>{date}</div>
        </div>
        <div>{thanks.comment}</div>
        <div className="commentAndLikeSection">
          {/* TODO <CommentsSection/> */}
          <small>Комментарии {">"}</small>
          <div className="likeSection">
            <LikeSection
              id={thanks.id}
              userReaction={thanks.userReaction}
              votesUp={thanks.votesUp}
              votesDown={thanks.votesDown}
              action={handleLikeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
