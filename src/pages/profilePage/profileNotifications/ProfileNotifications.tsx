import React, { FC, useState, useEffect } from 'react';
import { ToggleBlock } from '@pages';
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { Button } from 'antd';
import { updateNotifications, resetUser } from '../../../store/slices/userSlice';
import { IUserState } from '@utils';
import './profileNotifications.scss';

export const ProfileNotifications: FC = () => {
  const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = AppSelector<IUserState>(state => state.UserInfo);
  const [isHiddenButtons, setHiddenButtons] = useState(true);

  useEffect(() => {
    const disableButtons = JSON.stringify(userInfo.user) === JSON.stringify(userInfo.userLastState);
    setHiddenButtons(disableButtons);
  }, [userInfo.user, userInfo.userLastState]);

  const  onSave = async () => {
    await dispatch(updateNotifications());
    setHiddenButtons(true);
  }

  const onCancel = () => {
    dispatch(resetUser());
  }

  return (
    <div className='notifications'>
      <div className="notifications__wrapper">
        <div className="notifications__inner">
          <div className="notifications__line">
            <div className="notifications__subtitle">Основные уведомления</div>
            <div className="notifications__headers">
              <div className="notifications__header">Push</div>
              <div className="notifications__header">Mattermost</div>
              <div className="notifications__header">Email</div>
            </div>
          </div>
          <ToggleBlock 
            subtitles={['financials', 'thanks']}
          />
          <ToggleBlock 
            title='Уведомления о событиях в магазине' 
            subtitles={['shop_order', 'shop_delivered', 'shop_remains', 'shop_out_of_stock', 'shop_in_stock']} 
          />
          <ToggleBlock 
            title='Уведомления о событиях компании' 
            subtitles={['new_event', 'new_message', 'new_user', 'event_results', 'event_winner']} 
          />
        </div>
        <div className="notifications__hidden">
          {!isHiddenButtons &&
            <div className="notifications__buttons">
              <Button
                type="primary"
                size="middle"
                onClick={onSave}
              >
                Сохранить
              </Button>
              <Button
                size="middle"
                onClick={onCancel}
              >
                Отменить
              </Button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
