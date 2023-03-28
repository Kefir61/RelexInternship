import React, {FC} from "react";
import { Tabs } from "antd";
import { ProfileMainInfo, ProfileDelivery, ProfileNotifications } from '@pages';
import "./profilePage.scss";

export const ProfilePage: FC = () => {
    const TabPane = Tabs.TabPane;
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
