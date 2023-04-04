import React, { FC, useState, useEffect } from "react";
import { Checkbox, Input, Button, Spin } from 'antd';
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { IUserInfo, IUpdateInfoParams, reformateDate } from "@utils";
import { updateStatus, updateShowBirthday, updateUser } from '../../../store/slices/userSlice';
import defaultImage from "../../../assets/images/profile.png";
import './profileMainInfo.scss';

export const ProfileMainInfo: FC = () => {
  const { TextArea } = Input;
  const [disabledButtons, setDisabledButtons] = useState(true);
  const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const user = AppSelector<IUserInfo>(state => state.UserInfo.user);
  const userImage = AppSelector<string>(state => state.UserInfo.userImage);
  const isLoading = AppSelector<boolean>(state => state.UserInfo.loading);
  const userLastState = AppSelector<IUserInfo>(state => state.UserInfo.userLastState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const disableButtons = JSON.stringify(user) === JSON.stringify(userLastState);
    setDisabledButtons(disableButtons);
  }, [user]);

  const onChangeCheckbox = () => {
    dispatch(updateShowBirthday(!user.showBirthday));
  }

  const onChangeTextfield = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateStatus(e.target.value));
  }

  const onCancel = () => {
    dispatch(updateStatus(userLastState.statusMessage));
    dispatch(updateShowBirthday(userLastState.showBirthday));
  }

  const onSave = () => {
    const updatedUser: IUpdateInfoParams = {
      statusMessage: user.statusMessage,
      showBirthday: user.showBirthday,
    }
    dispatch(updateUser(updatedUser));
  }
  
  return (
      <div className="maininfo">
        {isLoading
          ? 
            <>
              <div className="mainInfo__loading">
                <Spin size="large"/>
              </div>
            </>
          :
            <>
              <div className="mainInfo__wrapper">
                <div className="mainInfo__inner">
                  <div className="mainInfo__blocks">
                    <div className="mainInfo__block">
                      <div className="mainInfo__overflow">
                        <img className="mainInfo__img" src={!!userImage ? userImage : defaultImage } alt="" />
                      </div>
                    </div>
                    <div className="mainInfo__block">
                      <div className="mainInfo__lines">
                        <div className="mainInfo__name"> {  `${user.firstName} ${user.lastName} ${user.patronymic}`}</div>
                        <div className="mainInfo__text">{user.job}</div>
                        <div className="mainInfo__text">{ `город: ${user.city}` }</div>
                        <div className="mainInfo__line">
                          <div className="mainInfo__birth">
                            <div className="mainInfo__text">Дата рождения:</div>
                            <div className="mainInfo__text">{reformateDate(user.birthday)}</div>
                          </div>
                          <Checkbox checked={!user.showBirthday} onChange={onChangeCheckbox}>
                            Не показывать год рождения
                          </Checkbox>
                        </div>
                        <div className="mainInfo__status">
                          <div className="mainInfo__text">Статус:</div>
                          <div className="mainInfo__textarea">
                            <TextArea
                              placeholder="Введите ваш статус"
                              autoSize={{ minRows: 3, maxRows: 6 }}
                              value={user.statusMessage}
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
                    onClick={onSave}
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
            </>
          }
      </div>
  );
}
