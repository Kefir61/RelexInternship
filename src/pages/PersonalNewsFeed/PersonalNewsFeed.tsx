import React, { FC, useEffect } from "react";
import "./PersonalNewsFeedStyle.scss";
import { Input } from "antd";
import { AutoComplete } from "../../components/AutoComplete/AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyThanks } from "../../store/slices/myThanksSlice";
import { AppDispatch, RootState } from "src/store/store";

export const PersonalNewsFeed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const currentUser = useSelector<RootState>((state) => state.User.list);
  const MyThanksList = useSelector<RootState>((state) => state.MyThanks.list);
  useEffect(() => {
    dispatch(fetchMyThanks({ id: 1, currentPage: 1, pageSize: 6 }));
  }, [dispatch]);

  return (
    <div className="content">
      <div className="feed">
        <h1>Личная лента событий</h1>
        <div className="searchBar">
          <Input className="contextSearch" placeholder="Context Search" />
          <div className="chooseBlock">
            <div>Сотрудник: </div>
            <AutoComplete />
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
              <div className="commentSection">Комментарии (8) {">"}</div>
              <div className="likeSection">
                <div className="notZeroLikes">Лайки: 1</div>
                <div className="notZeroDisLikes">Дизлайки: 0</div>
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
              <div className="commentSection">Комментарии (0) {">"}</div>
              <div className="likeSection">
                <div className="notZeroLikes">Лайки: 0</div>
                <div className="notZeroDisLikes">Дизлайки: 0</div>
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
              <div className="commentSection">Комментарии (2) {">"}</div>
              <div className="likeSection">
                <div className="notZeroLikes">Лайки: 6</div>
                <div className="notZeroDisLikes">Дизлайки: 0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="linksAndCongrats">
        <div className="linksBlock">
          <a className="link">Общая лента событий</a>
          <a className="link">История финансовых операций</a>
        </div>
        <div className="eventBlock">
          <h3>Мои события:</h3>
          <a className="event">Конкурс "профессионал"</a>
          <a className="event">Конкурс "8 марта"</a>
          <a className="event">Конкурс "23 февраля"</a>
        </div>
        <div className="congratsBlock">
          <h3>Мои благодарности:</h3>
          {/* <ListWithPagination /> */}
          {/* <div className="congratsElem">
            <div className="lostCurrency">-21</div>
            <div className="infoBlock">
              <div className="itemInformation">
                <div>Благодарность для К.П. Ни</div>
                <div>03.03.2023 11:15</div>
              </div>
              <div>Спасибо</div>
              <div className="commentAndLikeSection">
                <div className="commentSection">Комментарии (141) {">"}</div>
                <div className="notZeroLikes">Лайки: 141</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
