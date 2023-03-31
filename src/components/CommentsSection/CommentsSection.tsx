import React, { useState } from "react";
import { FC } from "react";
import { Popover, Space } from "antd";
import { PopOverContent } from "./PopOverContent/PopOverContent";
import { IComment } from "@utils";

interface ICommentSectionProps {
  comments: IComment[];
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
