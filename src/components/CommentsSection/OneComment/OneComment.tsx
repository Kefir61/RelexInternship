import React from "react";
import { FC } from "react";
import "./OneCommentStyle";
import { IComment } from "@utils";

interface IOneCommentProps {
  comment: IComment;
}

export const OneComment: FC<IOneCommentProps> = ({ comment }) => {
  return (
    <div className="oneComment">
      <strong>
        {comment.user.lastName} {comment.user.firstName[0]}. {comment.user.patronymic[0]} (
        {comment.createdAt.replace("T", " ")})
      </strong>
      <div>{comment.comment}</div>
    </div>
  );
};
