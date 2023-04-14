import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { MyThanks } from "@components";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import "./SharedFeedStyle.scss";

export const SharedFeed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="content">
      <div className="feed">
        <div className="searchBar">
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
          <MyThanks />
        </div>
      </div>
    </div>
  );
};