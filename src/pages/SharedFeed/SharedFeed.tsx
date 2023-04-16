import { MyThanks, NewsFeed } from "@components";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import "./SharedFeedStyle.scss";

export const SharedFeed: FC = () => {
  return (
    <div className="content">
      <div className="feed">
        <NewsFeed type={"GLOBAL"} />
      </div>
      <div className="eventsAndCongrats">
        <div className="eventBlock">
          <h3>Мои события</h3>
          <a href="#">Конкурс "профессионал"</a>
          <a href="#">Конкурс "8 марта"</a>
          <a href="#">Конкурс "23 февраля"</a>
        </div>
        <MyThanks />
      </div>
    </div>
  );
};
