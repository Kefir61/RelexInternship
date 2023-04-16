import { MyThanks, NewsFeed } from "@components";
import React, { FC } from "react";
import "./PersonalNewsFeedStyle.scss";

export const PersonalNewsFeed: FC = () => {
  return (
    <div className="content">
      <div className="feed">
        <NewsFeed type={"LOCAL"} />
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
