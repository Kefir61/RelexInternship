import React, { FC } from 'react';
import { INotificationParam, IUserState } from '@utils';
import { ToggleGroup } from '@pages';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/store';
import './toggleBlock.scss';

interface IToggleBlockProps {
  title?: string | null,
  subtitles: string[],
}

export const ToggleBlock: FC<IToggleBlockProps> = ({title, subtitles}) => {
  const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const userInfo = AppSelector<IUserState>(state => state.UserInfo);
  const toggleLines = new Map<string, INotificationParam[]>();

  for (let subtitle in userInfo.user.userNotifications) {
    if (subtitles.includes(subtitle)) {
      toggleLines.set(subtitle, userInfo.user.userNotifications[subtitle as keyof typeof userInfo.user.userNotifications])
    };
  };

  return (
    <div className='toggle-block'>
      <div className='toggle-block__title'>{title}</div>
      {
        Array.from(toggleLines).map(([key, value]) => {
          return (
              <ToggleGroup key={key} label={key} toggleChecked={value as INotificationParam[]}/>
          );
        })
      }
    </div>
  );
}
