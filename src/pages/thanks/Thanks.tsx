import { Loader, MyThanks, UserComplete } from "@components";
import { appSelector } from "@store";
import { IUser } from "@utils";
import { Button, Input, InputNumber } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/slices/autoCompleteUsersSlice";
import { selectSendThanks, sendThanks } from "../../store/slices/sendThanksSlice";
import { AppDispatch } from "../../store/store";
import "./Thanks.scss";

export const Thanks: FC = () => {
  const { TextArea } = Input;
  const [thanksValue, setThanksValue] = useState("");
  const [sumValue, setSumValue] = useState(0);
  const [disableSendButton, setDisableSendButton] = useState(true);
  const [disableClearButton, setDisableClearButton] = useState(true);
  const [response, setResponse] = useState(false);
  const [success, setSuccess] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, responseStatus, errorCode, error } = useSelector(selectSendThanks);

  const [userTo, setUserTo] = useState("");
  const allUsers = appSelector<IUser[]>((state) => state.users.usersList);

  useEffect(() => {
    setDisableSendButton(
      !(
        thanksValue.trim().length &&
        sumValue > 0 &&
        allUsers.findIndex((user) => user.id === userTo) + 1
      )
    );
    setDisableClearButton(!(thanksValue.trim().length || sumValue > 0));
  }, [thanksValue, sumValue, userTo]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (responseStatus === 200) {
      setSuccess(true);
      setResponse(true);
      setResponseMessage("Благодарность отправлена успешно");
      setTimeout(() => setResponse(false), 5000);
    }
  }, [responseStatus]);

  useEffect(() => {
    if (error) {
      if (errorCode === "INSUFFICIENT_BALANCE") {
        setResponseMessage("Недостаточно баллов на счете");
      } else {
        setResponseMessage("Что-то пошло не так. Попробуйте еще раз");
      }
      setResponse(true);
      setSuccess(false);
    }
  }, [error]);

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
            <UserComplete
              onSelect={(user: IUser) => {
                setUserTo(user.id);
              }}
              currentUserShowed={false}
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
              max={999999}
            />
          </div>
        </div>

        <div className="form__item">
          <label htmlFor="thanks" className="form__label">
            Благодарность:
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
          <div className={success ? "form__response success" : "form__response error"}>
            <p className="response__title">{responseMessage}</p>
          </div>
        )}

        <Button
          type="primary"
          size="middle"
          disabled={disableSendButton}
          onClick={send}
          className="form__button"
        >
          Отправить
        </Button>

        <Button
          type="primary"
          size="middle"
          onClick={clearFields}
          className="form__button"
          disabled={disableClearButton}
        >
          Очистить поля
        </Button>
      </form>

      <div className="thanks__my-thanks">
        <MyThanks />
      </div>
    </section>
  );
};
