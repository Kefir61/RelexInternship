import React, { FC, useState } from "react";
import { OneComment } from "../OneComment/OneComment";
import "./PopOverContentStyle";
import { IComment } from "@utils";
interface IPopOverContentProps {
  comments: IComment[];
  createComment: (comment: string) => void;
}

export const PopOverContent: FC<IPopOverContentProps> = ({ comments, createComment }) => {
  const [commentInputText, setCommentInputText] = useState("");

  return (
    <div className="CommentsSection">
      {comments.map((comment) => (
        <OneComment key={comment.id} comment={comment} />
      ))}
      <div>
        <input value={commentInputText} onChange={(e) => setCommentInputText(e.target.value)} />
        <button onClick={() => createComment(commentInputText)}>add</button>
      </div>
    </div>
  );
};
