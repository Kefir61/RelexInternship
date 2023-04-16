import { IUser, generateFio } from "@utils";
import React, { FC, useMemo } from "react";
import "./AutoCopmleteUserRowStyle.scss";
import defaultImage from "../../../assets/images/profile.png";

interface AutoCompleteRowUserProps {
  user: IUser;
}

export const AutoCompleteUserRow: FC<AutoCompleteRowUserProps> = ({ user }) => {
  const fio = useMemo(() => generateFio(user), []);
  return (
    <div className="userRow">
      <div>{fio}</div>
      {user.mainImageId && <img className="userImage" src={user.mainImageId} alt="" />}
    </div>
  );
};
