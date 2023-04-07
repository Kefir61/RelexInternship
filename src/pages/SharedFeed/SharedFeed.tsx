import React, { FC, useEffect } from "react";
import "./SharedFeedStyle.scss";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { fetchMyThanks } from "../../store/slices/myThanksSlice";
import { AppDispatch } from "src/store/store";
import { IOneMyThanks } from "@utils";
import { CommentsSection, ListWithPagination, Loader, OneMyThanks } from "@components";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { appSelector } from "../../store/hooks";

export const SharedFeed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const MyThanksList = appSelector<IOneMyThanks[]>((state) => state.MyThanks.list);
  const MyThanksPageCount = appSelector<number>((state) => state.MyThanks.totalPages);
  const MyThanksLoading = appSelector<number>((state) => state.MyThanks.totalPages);

  useEffect(() => {
    dispatch(fetchMyThanks({ currentPage: 0, pageSize: 3 }));
  }, []);
  const onChangeThanksPage = (pageNum: number) => {
    dispatch(
      fetchMyThanks({
        currentPage: pageNum - 1,
        pageSize: 3,
      })
    );
  };

  return (
    <div className="content">
      <div className="feed">
        <div className="searchBar">
          <Input className="contextSearch" placeholder="Context Search" />
          <div className="chooseBlock">
            <div>Тип сообщение: </div>
            <select>
              <option>Благодарность</option>
              <option>Событие</option>
            </select>
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
          <h3>Мои благодарности:</h3>
          {MyThanksLoading ? (
            <ListWithPagination
              content={MyThanksList}
              onChangePage={onChangeThanksPage}
              renderElement={(OneThank: IOneMyThanks) => (
                <OneMyThanks key={`${OneThank.user.id} ${OneThank.createdAt}`} thanks={OneThank} />
              )}
              totalPages={MyThanksPageCount}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
