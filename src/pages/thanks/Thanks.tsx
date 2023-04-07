import React, { FC, useEffect, useState } from "react";
import { AutoComplete, Loader, MyThanks } from "@components";
import { Button, Input, InputNumber } from "antd";
import "./Thanks.scss";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { sendThanks, selectSendThanks } from "../../store/slices/sendThanksSlice";

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

  useEffect(() => {
    thanksValue.trim().length && sumValue > 0
      ? setDisabledButtons(false)
      : setDisabledButtons(true);
  }, [thanksValue, sumValue]);

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
      toUserId: '680e57c8-7c0c-4053-b069-819a2bbbe34c',
      amount: sumValue,  
      comment: thanksValue
    })
        
    dispatch(sendThanks(data));
    clearFields();
  }

  const clearFields = () => {
    setSumValue(0); 
    setThanksValue(''); 
    setResponse(false);
  }
  
  const onChangeTextfield = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setThanksValue(e.target.value);
  };

  const onChangeSumField = (sum: number) => {
    setSumValue(sum);
  };

  return (
    <section className="thanks">
      <form className="thanks__form form">
        <div className="form__item">
          <label htmlFor="employee" className="form__label">
            Сотрудник:
          </label>
          <div className="form__input-wrapper">
            <AutoComplete />
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

      <div className="thanks__my-thanks">
        <MyThanks />
      </div>
    </section>
  );
};
