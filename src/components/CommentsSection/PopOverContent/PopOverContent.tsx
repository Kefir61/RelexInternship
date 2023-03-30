import React, { FC, useState } from "react";
import { OneComment } from "../OneComment/OneComment";
import "./PopOverContentStyle";

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

interface IPopOverContentProps {
  comments: IComment[];
  createComment: (comment: string) => void;
}

export const PopOverContent: FC<IPopOverContentProps> = ({ comments, createComment }) => {
  const [commentInputText, setCommentInputText] = useState("");

  return (
    <div className="CommentsSection">
      {comments.map((comment) => (
        <OneComment comment={comment} />
      ))}
      <div>
        <input value={commentInputText} onChange={(e) => setCommentInputText(e.target.value)} />
        <button onClick={() => createComment(commentInputText)}>add</button>
      </div>
    </div>
  );
};
