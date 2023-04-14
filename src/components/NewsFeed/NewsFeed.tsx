import { mockNews2 } from "@utils";
import React, { FC } from "react";
import { NewsFeedEvent } from "./NewsFeedEvent/NewsFeedEvent";

interface NewsFeedProps {
  type: "GLOBAL" | "LOCAL";
}

export const NewsFeed: FC<NewsFeedProps> = ({ type }) => {
  return (
    <>
      {mockNews2.map((news) => (
        <NewsFeedEvent news={news} />
      ))}
    </>
  );
};
