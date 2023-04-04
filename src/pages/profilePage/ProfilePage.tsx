import React, {FC, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Tabs } from "antd";
import { ProfileMainInfo, ProfileDelivery, ProfileNotifications } from '@pages';
import { fetchUser } from '../../store/slices/userSlice';
import { AppDispatch } from '../../store/store';
import "./profilePage.scss";

export const ProfilePage: FC = () => {
    const TabPane = Tabs.TabPane;
    const dispatch = useDispatch<AppDispatch>();

    //TODO: поставить реальные значения id пользователя после подключения авторизации
    useEffect(() => {
        dispatch(fetchUser(2));
    }, [dispatch]);

    return (
        <div className="profile">
            <div className="profile__wrapper">
                <div className="profile__inner">
                    <Tabs size="large">
                        <TabPane tab="Личная информация" key="1">
                            <ProfileMainInfo/>
                        </TabPane>
                        <TabPane tab="Уведомления" key="2">
                            <ProfileNotifications/>
                        </TabPane>
                        <TabPane tab="Доставка" key="3">
                            <ProfileDelivery/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};
