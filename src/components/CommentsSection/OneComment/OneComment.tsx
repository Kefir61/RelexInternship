import React from "react";
import { FC } from "react";
import "./OneCommentStyle";

interface IOneCommentProps {
  comment: IComment;
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

export const OneComment: FC<IOneCommentProps> = ({ comment }) => {
  return (
    <div className="oneComment">
      <strong>
        {comment.user.surname} {comment.user.name[0]}. {comment.user.surname[0]} (
        {comment.createdAt.replace("T", " ")})
      </strong>
      <div>{comment.comment}</div>
    </div>
  );
};
