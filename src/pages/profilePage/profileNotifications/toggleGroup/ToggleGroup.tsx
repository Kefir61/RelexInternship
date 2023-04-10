import React, {FC} from 'react';
import { INotifucationVariant, INotificationParam, notificationSubtitles } from '@utils';
import { RootState, AppDispatch } from "../../../../store/store";
import { updateStateNotifications } from '../../../../store/slices/userSlice';
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { Switch } from 'antd';
import './toggleGroup.scss';

interface IToggleGroup {
    label: string,
    toggleChecked: INotificationParam[],
}

export const ToggleGroup: FC<IToggleGroup> = ({label, toggleChecked}) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSwitchChange = (target: INotifucationVariant, index: number) => {
        dispatch(updateStateNotifications({label, target, index, status: toggleChecked[index].status}));
    };

    return <div className="toggleGroup">
        {!!label && (<div className="toggleGroup__label"> {notificationSubtitles.get(label)}</div>)}
        <div className="toggleGroup__toggles">
            <div className="toggleGroup__item">
                <Switch checked={toggleChecked[0].status} onChange={() => handleSwitchChange(toggleChecked[0].target, 0)}/>
            </div>
            <div className="toggleGroup__item">
                <Switch checked={toggleChecked[1].status} onChange={() => handleSwitchChange(toggleChecked[1].target, 1)}/>
            </div>
            <div className="toggleGroup__item">
                <Switch checked={toggleChecked[2].status} onChange={() => handleSwitchChange(toggleChecked[2].target, 2)}/>
            </div>
        </div>
    </div>
};
