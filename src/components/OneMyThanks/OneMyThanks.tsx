import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { EOperaionType, EReactionType, IOneMyThanks, briefLongNum, generateFio } from "@utils";
import { format, utcToZonedTime } from "date-fns-tz";
import React, { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import { fetchReactToThank } from "../../store/slices/myThanksSlice";
import "./OneMyThanksStyle.scss";

interface OneMyThanksProps {
  thanks: IOneMyThanks;
}
export const OneMyThanks: FC<OneMyThanksProps> = ({ thanks }) => {
  const dispatch = useDispatch<AppDispatch>();
  const fio: string = useMemo(() => generateFio(thanks.user), []);
  const farmatedDate = useMemo(() => {
    const date = new Date(thanks.createdAt);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = utcToZonedTime(date, timeZone);
    const pattern = "dd.MM.yyyy HH:mm";
    return format(zonedDate, pattern, { timeZone });
  }, []);

  const formatedValue = useMemo(() => {
    return briefLongNum(thanks.thankAmount);
  }, []);

  const onReactToThank = (type: EReactionType) => {
    if (thanks.userReaction != type) {
      dispatch(fetchReactToThank({ id: thanks.id, reaction: type }));
    } else {
      dispatch(fetchReactToThank({ id: thanks.id, reaction: EReactionType.NONE }));
    }
  };

  const ThankFromOrTo = useMemo(
    () => `Благодарность ${thanks.operationType === EOperaionType.TO ? "для" : "от"} ${fio}`,
    []
  );

  return (
    <div className="congratsElem">
      <div className={thanks.operationType === EOperaionType.FROM ? "getCurrency" : "lostCurrency"}>
        {formatedValue}
      </div>
      <div className="infoBlock">
        <div className="dateAndCreator">
          <div>{ThankFromOrTo}</div>
          <div>{farmatedDate}</div>
        </div>
        <div>{thanks.comment}</div>
        <div className="commentAndLikeSection">
          {/* TODO <CommentsSection/> */}
          <small>Комментарии {">"}</small>
          <div className="likeSection">
            <div
              className={
                thanks.userReaction === EReactionType.LIKE ? "notZeroLikes" : "zeroLikesOrDis"
              }
              onClick={() => onReactToThank(EReactionType.LIKE)}
            >
              <LikeOutlined />
              {thanks.votesUp}
            </div>
            <div
              className={
                thanks.userReaction === EReactionType.DISLIKE ? "notZeroDisLikes" : "zeroLikesOrDis"
              }
              onClick={() => onReactToThank(EReactionType.DISLIKE)}
            >
              <DislikeOutlined />
              {thanks.votesDown}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
