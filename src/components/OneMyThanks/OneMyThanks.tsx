import React from "react";
import { FC } from "react";
import { IOneMyThanks } from "src/utils/types/IOneMyThanks";

interface OneMyThanksProps {
  thanks: IOneMyThanks;
}

export const OneMyThanks: FC<OneMyThanksProps> = ({ thanks }) => {
  return (
    <div className="congratsElem">
      <div className="getCurrency">{thanks.thanksAmount}</div>
      <div className="infoBlock">
        <div className="itemInformation">
          <div>
            Благодарность {thanks.operationType === 0 ? "для" : "от"} {thanks.user.lastName}{" "}
            {thanks.user.firstName[0]}. {thanks.user.patronymic[0]}.
          </div>
          <div>{thanks.createdAt.replace("T", " ")}</div>
        </div>
        <div>{thanks.comment}</div>
        <div className="commentAndLikeSection">
          <div className="commentSection">Комментарии (0) {">"}</div>
          <div>
            <div>Лайки:{thanks.votesUp}</div>
            <div>Дизлайки:{thanks.votesDown}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
