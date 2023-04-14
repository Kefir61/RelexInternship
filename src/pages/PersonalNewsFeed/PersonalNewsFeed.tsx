import { MyThanks, NewsFeed, UserComplete } from "@components";
import { INews } from "@utils";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import { appSelector } from "../../store/hooks";
import { fetchNews } from "../../store/slices/newsFeedSlice";
import "./PersonalNewsFeedStyle.scss";

export const PersonalNewsFeed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const feed = appSelector<INews[]>((state) => state.feed.content);
  console.log(feed);

  useEffect(() => {
    dispatch(
      fetchNews({
        currentPage: 0,
        pageSize: 4,
      })
    );
  }, []);

  return (
    <div className="content">
      <div className="feed">
        <div className="searchBar">
          <div className="chooseBlock">
            <UserComplete onSelect={() => {}} currentUserShowed={true} />
          </div>
        </div>
        <div className="newsBlock">
          <NewsFeed type={"GLOBAL"} />
        </div>
      </div>
      <div className="eventsAndCongrats">
        <div className="eventBlock">
          <h3>Мои события:</h3>
          <a className="event" href="#">
            Конкурс "профессионал"
          </a>
          <a className="event" href="#">
            Конкурс "8 марта"
          </a>
          <a className="event" href="#">
            Конкурс "23 февраля"
          </a>
        </div>
        <div className="congratsBlock">
          <MyThanks />
        </div>
      </div>
    </div>
  );
};
