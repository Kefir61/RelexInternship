import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { INews, NewsTypesOwner, NewsTypesTitle } from "@utils";
import { format, utcToZonedTime } from "date-fns-tz";
import React, { FC, useMemo } from "react";
import { NewsFeedContent } from "./NewsFeedContent/NewsFeedContent";
import "./NewsFeedEventStyle.scss";

interface NewsFeedEventProps {
  news: INews;
}

export const NewsFeedEvent: FC<NewsFeedEventProps> = ({ news }) => {
  const farmatedDate = useMemo(() => {
    const date = new Date(news.createdAt);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = utcToZonedTime(date, timeZone);
    const pattern = "dd.MM.yyyy HH:mm";
    return format(zonedDate, pattern, { timeZone });
  }, []);

  return (
    <div>
      <div className="news">
        <div className="typeOfNews">{NewsTypesTitle[news.type]}</div>
        <div className="dateAndCreator">
          <div>{farmatedDate}</div>
          <div>
            {NewsTypesOwner(news.type, {
              owner: news.owner,
              userTo: news.toUser,
              userFrom: news.fromUser,
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
      />
      <div className="commentAndLikeSection">
        <small>Комментарии {">"}</small>
        <div className="likeSection">
          <div className="notZeroLikes">
            <LikeOutlined /> {news.votesUp}
          </div>
          <div className="notZeroDisLikes">
            <DislikeOutlined /> {news.votesDown}
          </div>
        </div>
      </div>
    </div>
  );
};
