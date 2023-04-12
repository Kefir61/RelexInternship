import React, { FC, useEffect, useMemo } from "react";
import "./PersonalNewsFeedStyle.scss";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import { AutoComplete, MyThanks } from "@components";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { IUser, generateFio } from "@utils";
import { AutoCompleteUserRow } from "../../components/AutoCopmleteUserRow/AutoCopmleteUserRow";
import { appSelector } from "../../store/hooks";
import { fetchUsers } from "../../store/slices/autoCompleteUsersSlice";
import "./PersonalNewsFeedStyle.scss";

export const PersonalNewsFeed: FC = () => {
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

  const contentAutoComplete = useMemo(
    () =>
      allUsers
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
        .sort((x, y) => (x.item.id === currentUserId ? -1 : y.item.id == currentUserId ? 1 : 0)),
    [allUsers]
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="content">
      <div className="feed">
        <div className="searchBar">
          <Input className="contextSearch" placeholder="Context Search" />
          <div className="chooseBlock">
            <div>Сотрудник: </div>
            <AutoComplete
              onSelect={(user: IUser) => {}}
              content={contentAutoComplete}
              renderElement={(user: IUser) => <AutoCompleteUserRow user={user} />}
            />
          </div>
        </div>
        <div className="newsBlock">
          <div className="news">
            <div>
              <div className="typeOfNews">Участие в конкурсе</div>
              <div className="dateAndCreator">
                <div>10.03.2023 17:30</div>
                <div>Огранизатор: Техдиректор</div>
              </div>
            </div>
            <h3>Вы зарегистрировались в качестве участника конкурса "Профессионал"</h3>
            <div className="commentAndLikeSection">
              <small>Комментарии {">"}</small>
              <div className="likeSection">
                <div className="notZeroLikes">
                  <LikeOutlined /> 1
                </div>
                <div className="notZeroDisLikes">
                  <DislikeOutlined /> 0
                </div>
              </div>
            </div>
          </div>
          <div className="news">
            <div>
              <div className="typeOfNews">Вас благодарят!</div>
              <div className="dateAndCreator">
                <div>10.03.2023 16:15</div>
                <div>Автор: В.С. Сорокин</div>
              </div>
            </div>
            <h3>Спасибо за помощь в проекте</h3>
            <div className="commentAndLikeSection">
              <small>Комментарии {">"}</small>
              <div className="likeSection">
                <div className="notZeroLikes">
                  <LikeOutlined /> 0
                </div>
                <div className="notZeroDisLikes">
                  <DislikeOutlined /> 0
                </div>
              </div>
            </div>
          </div>
          <div className="news">
            <div>
              <div className="typeOfNews">Вы победитель</div>
              <div className="dateAndCreator">
                <div>9.03.2023 16:15</div>
                <div>Огранизатор: HR</div>
              </div>
            </div>
            <h3>Конкурс "8 марта" Подведены итоги конкурса.</h3>
            <div className="commentAndLikeSection">
              <small>Комментарии {">"}</small>
              <div className="likeSection">
                <div className="notZeroLikes">
                  <LikeOutlined /> 6
                </div>
                <div className="notZeroDisLikes">
                  <DislikeOutlined /> 0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="eventsAndCongrats">
        <div className="eventBlock">
          <h3>Мои события:</h3>
          <a className="event" href="#">
            Конкурс "профессионал"
          </a>
          <a className="event" href="#">
            Конкурс "8 марта"
          </a>
          <a className="event" href="#">
            Конкурс "23 февраля"
          </a>
        </div>
        <div className="congratsBlock">
          <MyThanks />
        </div>
      </div>
    </div>
  );
};
