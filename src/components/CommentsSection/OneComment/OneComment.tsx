import React, { useMemo } from "react";
import { FC } from "react";
import "./OneCommentStyle";
import { IComment, generateFio } from "@utils";

interface IOneCommentProps {
  comment: IComment;
}

export const OneComment: FC<IOneCommentProps> = ({ comment }) => {
  const fio: string = useMemo(() => generateFio(comment.user), []);
  return (
    <div className="oneComment">
      <strong>
        {fio} ({comment.createdAt.replace("T", " ")})
      </strong>
      <div>{comment.comment}</div>
    </div>
  );
};
