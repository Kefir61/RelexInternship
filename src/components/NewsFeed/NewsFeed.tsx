import { appSelector } from "@store";
import { ENewsTypes, INews } from "@utils";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNews } from "../../store/slices/newsFeedSlice";
import { AppDispatch } from "../../store/store";
import { ListWithPagination } from "../ListWithPagination";
import { UserComplete } from "../UserComplete";
import { NewsFeedEvent } from "./NewsFeedEvent/NewsFeedEvent";
import { Select } from "antd";
import { Loader } from "../loader";
interface NewsFeedProps {
  type: "GLOBAL" | "LOCAL";
}

interface SelectOption {
  value: ENewsTypes;
  label: string;
}

export const NewsFeed: FC<NewsFeedProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const feed = appSelector<INews[]>((state) => state.feed.content);
  const totalPages = appSelector<number>((state) => state.feed.totalPages);
  const loading = appSelector<boolean>((state) => state.feed.loading);
  const error = appSelector<string>((state) => state.feed.error);
  const [page, setPage] = useState(1);

  const currentUserId = appSelector<string>((state) => state.UserInfo.user.id);
  const [choosedUserId, setChoosedUserId] = useState("");

  const [category, setCategory] = useState<ENewsTypes>(null);
  const options: SelectOption[] = [
    { value: null, label: "Все" },
    { value: "thanks", label: "Благодарность" },
    { value: "new_product", label: "Новые товары" },
    { value: "new_event", label: "Новые события" },
    { value: "event_results", label: "Результаты событий" },
    { value: "event_user_registered", label: "Пользователь записался на событие" },
  ];

  useEffect(() => setChoosedUserId(currentUserId), [currentUserId]);
  useEffect(() => {
    setPage(1);
    dispatch(
      fetchNews({
        currentPage: 0,
        pageSize: 5,
        userId: type === "LOCAL" ? choosedUserId : undefined,
        category: type === "GLOBAL" ? category : undefined,
      })
    );
  }, [choosedUserId, category]);

  const handleChangePage = (pageNum: number) => {
    setPage(pageNum);
    dispatch(
      fetchNews({
        currentPage: pageNum - 1,
        pageSize: 5,
        userId: type === "LOCAL" ? choosedUserId : undefined,
        category: type === "GLOBAL" ? category : undefined,
      })
    );
  };

  return (
    <div>
      {type === "LOCAL" && (
        <UserComplete
          onSelect={(user) => {
            setChoosedUserId(user.id);
          }}
          currentUserShowed={true}
        />
      )}
      {type === "GLOBAL" && (
        <div>
          Тип сообщение:{" "}
          <Select
            style={{ width: "200px" }}
            onChange={(category) => setCategory(category)}
            defaultValue={null}
            options={options}
          />
        </div>
      )}
      {error && <div>Что-то пошло не так. Попробуйте еще раз</div>}
      {loading && <Loader />}
      {!feed.length && !error && !loading && <p>Лента пуста</p>}
      {!!feed.length && !error && !loading && (
        <ListWithPagination
          content={feed}
          renderElement={(news: INews) => <NewsFeedEvent news={news} key={news.id} />}
          onChangePage={handleChangePage}
          currentPage={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
