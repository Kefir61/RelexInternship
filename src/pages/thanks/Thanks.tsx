import { AutoComplete, Loader } from "@components";
import { appSelector } from "@store";
import { IUser, generateFio } from "@utils";
import { Button, Input, InputNumber } from "antd";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AutoCompleteUserRow } from "../../components/AutoCopmleteUserRow/AutoCopmleteUserRow";
import { selectSendThanks, sendThanks } from "../../store/slices/sendThanksSlice";
import { AppDispatch } from "../../store/store";
import "./Thanks.scss";
import { fetchUsers } from "../../store/slices/autoCompleteUsersSlice";

export const Thanks: FC = () => {
  const { TextArea } = Input;
  const [thanksValue, setThanksValue] = useState("");
  const [sumValue, setSumValue] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState(true);
  const [response, setResponse] = useState(false);
  const [success, setSuccess] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, responseStatus, errorCode } = useSelector(selectSendThanks);
  const [userTo, setUserTo] = useState("");

  const allUsers = appSelector<IUser[]>((state) => state.users.usersList);
  const currentUserId = appSelector<string>((state) => state.UserInfo.user.id);
  const contentAutoComplete = useMemo(
    () =>
      allUsers
        .filter((user) => user.id != currentUserId)
        .map((user) => {
          return {
            fieldFillText: generateFio(user),
            item: user,
            strToFindIn: `${user.firstName} ${user.lastName} ${user.patronymic || ""}`,
          };
        }),
    [allUsers]
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    thanksValue.trim().length &&
    sumValue > 0 &&
    allUsers.findIndex((user) => user.id === userTo) + 1
      ? setDisabledButtons(false)
      : setDisabledButtons(true);
  }, [thanksValue, sumValue, userTo]);

  useEffect(() => {
    if (responseStatus === 200) {
      setSuccess(true);
      setResponse(true);
      setResponseMessage("Благодарность отправлена успешно");
      setTimeout(() => setResponse(false), 5000);
    }
  }, [responseStatus]);

  useEffect(() => {
    if (errorCode) {
      if (errorCode === "INSUFFICIENT_BALANCE") {
        setResponseMessage("Недостаточно баллов на счете");
      } else {
        setResponseMessage("Что-то пошло не так. Попробуйте еще раз");
      }
      setResponse(true);
      setSuccess(false);
    }
  }, [errorCode]);

  const send = () => {
    const data = JSON.stringify({
      toUserId: userTo,
      amount: sumValue,
      comment: thanksValue,
    });

    dispatch(sendThanks(data));
    clearFields();
  };

  const clearFields = () => {
    setSumValue(0);
    setThanksValue("");
    setResponse(false);
  };

  const onChangeTextfield = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setThanksValue(e.target.value);

  const onChangeSumField = (sum: number) => setSumValue(sum);

  return (
    <section className="thanks">
      <form className="thanks__form form">
        <div className="form__item">
          <label htmlFor="employee" className="form__label">
            Сотрудник:
          </label>
          <div className="form__input-wrapper">
            <AutoComplete
              onSelect={(user: IUser) => {
                setUserTo(user.id);
              }}
              content={contentAutoComplete}
              renderElement={(user: IUser) => <AutoCompleteUserRow user={user} />}
            />
          </div>
        </div>

        <div className="form__item">
          <label htmlFor="sum" className="form__label">
            Сумма:
          </label>
          <div className="form__input-wrapper">
            <InputNumber
              value={sumValue}
              id="sum"
              name="sum"
              className="form__input"
              placeholder="10"
              onChange={onChangeSumField}
              type="number"
              min={0}
            />
          </div>
        </div>

        <div className="form__item">
          <label htmlFor="thanks" className="form__label">
            Благодарность:{" "}
          </label>
          <div className="form__input-wrapper form__textarea">
            <TextArea
              placeholder="Коллега, большое спасибо"
              autoSize={{ minRows: 3, maxRows: 6 }}
              value={thanksValue}
              onChange={onChangeTextfield}
              className="form__input"
              id="thanks"
              name="thanks"
            />
          </div>
        </div>

        {loading && (
          <div className="form__loader">
            <Loader />
          </div>
        )}

        {response && (
          <div className={success ? "form__error success" : "form__error error"}>
            <p className="error__title">{responseMessage}</p>
          </div>
        )}

        <Button
          type="primary"
          size="middle"
          disabled={disabledButtons}
          onClick={send}
          className="form__button"
        >
          Отправить
        </Button>

        <Button type="primary" size="middle" onClick={clearFields} className="form__button">
          Отменить
        </Button>
      </form>
    </section>
  );
};
