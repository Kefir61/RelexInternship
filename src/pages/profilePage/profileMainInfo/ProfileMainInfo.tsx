import React, { FC, useState, useEffect } from "react";
import { Checkbox, Input, Button } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import profileImage from "../../../assets/images/profile.png";
import './profileMainInfo.scss';

export const ProfileMainInfo: FC = () => {
  //TODO:  Удалить временного пользователя после подключения бэка и редакса
  const currentUser = {
    name: 'Андрей Викторович Петров',
    burth: '11.12.1993',
    isHiddenBurth: false,
    status: '',
    city: 'Тамбов'
  }
  const { TextArea } = Input;
  const [disabledButtons, setDisabledButtons] = useState(true);
  const [isHiddenBurth, setHiddenBurth] = useState(currentUser.isHiddenBurth);
  const [textAreaValue, setTextAreaValue] = useState(currentUser.status);

  //TODO: сделать более лаконичный дизейбл кнопок на редаксе
  useEffect(() => {
    (isHiddenBurth === currentUser.isHiddenBurth && textAreaValue === currentUser.status)
      ? setDisabledButtons(true)
      : setDisabledButtons (false)
  }, [isHiddenBurth, textAreaValue])

  const onChangeCheckbox = () => {
    setHiddenBurth(!isHiddenBurth);
  }
  const onChangeTextfield = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  }

  const onCancel = () => {
    setHiddenBurth(currentUser.isHiddenBurth);
    setTextAreaValue(currentUser.status);
  }
  const onSave = () => {
    //** Отправляем данные на сервер для сохранения */
  }
  return (
      <div className="maininfo">
        <div className="mainInfo__wrapper">
          <div className="mainInfo__inner">
            <div className="mainInfo__blocks">
              <div className="mainInfo__block">
                <img className="mainInfo__img" src={profileImage} alt="" />
              </div>
              <div className="mainInfo__block">
                <div className="mainInfo__lines">
                  <div className="mainInfo__name"> { currentUser.name }</div>
                  <div className="mainInfo__text">Старший инженер</div>
                  <div className="mainInfo__text">{ `г. ${currentUser.city}` }</div>
                  <div className="mainInfo__line">
                    <div className="mainInfo__birth">
                      <div className="mainInfo__text">Дата рождения:</div>
                      <div className="mainInfo__text">{ currentUser.burth }</div>
                    </div>
                    <Checkbox checked={isHiddenBurth} onChange={onChangeCheckbox}>
                      Не показывать год рождения
                    </Checkbox>
                  </div>
                  <div className="mainInfo__status">
                    <div className="mainInfo__text">Статус:</div>
                    <div className="mainInfo__textarea">
                      <TextArea
                        placeholder="Введите ваш статус"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                        value={textAreaValue}
                        onChange={onChangeTextfield}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mainInfo__buttons">
            <Button 
              type="primary"
              size="middle"
              disabled={disabledButtons}
            >
              Сохранить
            </Button>
            <Button
              size="middle"
              disabled={disabledButtons}
              onClick={onCancel}  
            >
              Отменить  
            </Button>
          </div>
        </div>
      </div>
  );
}
