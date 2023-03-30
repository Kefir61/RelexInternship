import React, { useState } from "react";
import { FC } from "react";
import { Popover, Space } from "antd";
import { PopOverContent } from "./PopOverContent/PopOverContent";

interface ICommentSectionProps {
  comments: IComment[];
}

interface IComment {
  id: number;
  user: IUser;
  comment: string;
  createdAt: string;
}

interface IUser {
  id: string;
  name: string;
  surname: string;
  midlename: string;
}

export const CommentsSection: FC<ICommentSectionProps> = ({ comments }) => {
  const addCommentToStore = () => {};

  return (
    <div>
      <Popover
        trigger="click"
        content={<PopOverContent comments={comments} createComment={addCommentToStore} />}
        placement="topLeft"
      >
        <a onClick={(e) => e.preventDefault()} href="#">
          <Space>Комментарии ({comments.length})</Space>
        </a>
      </Popover>
    </div>
  );
};
