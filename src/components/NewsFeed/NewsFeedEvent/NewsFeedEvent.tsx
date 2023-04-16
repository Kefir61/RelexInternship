import { EReactionType, INews, NewsTypesOwner, NewsTypesTitle, formattedDateTZ } from "@utils";
import React, { FC, useMemo } from "react";
import { LikeSection } from "../../LikesSection";
import { NewsFeedContent } from "./NewsFeedContent/NewsFeedContent";
import "./NewsFeedEventStyle.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchReactToNews } from "../../../store/slices/newsFeedSlice";
import { appSelector } from "@store";

interface NewsFeedEventProps {
  news: INews;
}

export const NewsFeedEvent: FC<NewsFeedEventProps> = ({ news }) => {
  const dispatch = useDispatch<AppDispatch>();
  const date: string = useMemo(() => formattedDateTZ(news.createdAt), []);
  const currentUserId = appSelector<string>((state) => state.UserInfo.user.id);

  const handleLikeChange = (id: number, reaction: EReactionType) =>
    dispatch(fetchReactToNews({ id, reaction }));

  return (
    <div className="oneNewsBlock">
      <div className="news">
        <div className="typeOfNews">{NewsTypesTitle[news.type]}</div>
        <div className="dateAndCreator">
          <div>{date}</div>
          <div>
            {NewsTypesOwner(news.type, {
              owner: news.owner,
              userTo: news.toUser,
              userFrom: news.fromUser,
              currentUser: currentUserId,
            })}
          </div>
        </div>
      </div>
      <NewsFeedContent
        type={news.type}
        eventTitle={news?.eventTitle}
        eventDescription={news?.eventDescription}
        orderAmount={news?.orderAmount}
        productId={news?.productId}
        productName={news?.productName}
        comment={news?.comment}
        currentUserId={currentUserId}
        user={news?.user}
      />
      <div className="commentAndLikeSection">
        <small>Комментарии {">"}</small>
        <LikeSection
          id={news.id}
          userReaction={news.userReaction}
          votesUp={news.votesUp}
          votesDown={news.votesDown}
          action={handleLikeChange}
        />
      </div>
    </div>
  );
};
