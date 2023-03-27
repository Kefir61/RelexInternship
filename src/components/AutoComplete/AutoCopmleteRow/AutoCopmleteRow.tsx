import React from "react";
import { FC } from "react";

interface IUser {
  id: number;
  name: string;
  surname: string;
}

interface AutoCompleteRowProps {
  user: IUser;
}

export const AutoCompleteRow: FC<AutoCompleteRowProps> = ({ user }) => {
  return (
    <div>
      {user.name} {user.surname}
    </div>
  );
};
