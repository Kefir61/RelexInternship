import { appSelector } from "@store";
import { IUser, generateFio } from "@utils";
import React, { FC, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/slices/autoCompleteUsersSlice";
import { AppDispatch } from "../../store/store";
import { AutoComplete } from "../AutoComplete";
import { AutoCompleteUserRow } from "./AutoCopmleteUserRow/AutoCopmleteUserRow";

interface UserCompleteProps {
  currentUserShowed: boolean;
  onSelect: (user: IUser) => void;
  width?: string;
}

export const UserComplete: FC<UserCompleteProps> = ({ currentUserShowed, onSelect, width }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = appSelector<string>((state) => state.UserInfo.user.id);
  const allUsers = appSelector<IUser[]>((state) => state.users.usersList);

  const getYouContent = (user: IUser): IUser => {
    return {
      firstName: "",
      lastName: "Вы",
      patronymic: "",
      mainImageId: user.mainImageId,
      id: user.id,
    };
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const contentWithUser = useMemo(
    () =>
      currentUserShowed
        ? allUsers
            .map((user) => {
              if (user.id === currentUserId) {
                return {
                  fieldFillText: "Вы",
                  item: getYouContent(user),
                  strToFindIn: `${user.firstName} ${user.lastName} ${user.patronymic || ""}`,
                };
              }
              return {
                fieldFillText: generateFio(user),
                item: user,
                strToFindIn: `${user.firstName} ${user.lastName} ${user.patronymic || ""}`,
              };
            })
            .sort((x, y) => (x.item.id === currentUserId ? -1 : y.item.id == currentUserId ? 1 : 0))
        : [],
    [allUsers, currentUserShowed]
  );

  const contentWithoutUser = useMemo(
    () =>
      !currentUserShowed
        ? allUsers
            .filter((user) => user.id !== currentUserId)
            .map((user) => {
              return {
                fieldFillText: generateFio(user),
                item: user,
                strToFindIn: `${user.firstName} ${user.lastName} ${user.patronymic || ""}`,
              };
            })
        : [],
    [allUsers, currentUserShowed]
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <AutoComplete
      width="250px"
      onSelect={(user: IUser) => onSelect(user)}
      content={currentUserShowed ? contentWithUser : contentWithoutUser}
      renderElement={(user: IUser) => <AutoCompleteUserRow user={user} />}
      placeholder="Сотрудник"
    />
  );
};
