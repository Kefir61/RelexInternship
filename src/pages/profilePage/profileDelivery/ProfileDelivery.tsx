import React, { FC, useState, useMemo, useEffect } from "react";
import { Select, Input, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { IDelivery, IUserState, IUserInfo } from "@utils";
import { AppDispatch } from "../../../store/store";
import {
  updateFromOffice,
  updateOrderDelivery,
  updateDeliveryAddress,
  resetUser,
  updateDelivery,
} from "../../../store/slices/userSlice";
import "./profileDelivery.scss";
import { appSelector } from "../../../store/hooks";
import { DefaultOptionType } from "antd/es/select";

export const ProfileDelivery: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = appSelector<IUserState>((state) => state.UserInfo);
  const user = appSelector<IUserInfo>((state) => state.UserInfo.user);
  const [isHiddenButtons, setHiddenButtons] = useState(true);
  const deliveryMethods = useMemo<DefaultOptionType[]>(
    () =>
      user.userDeliveries.map((deliveryMethod: IDelivery) => ({
        label: deliveryMethod.displayName,
        value: deliveryMethod.name,
      })),
    [user.userDeliveries]
  );

  useEffect(() => {
    const disableButtons = JSON.stringify(userInfo.user) === JSON.stringify(userInfo.userLastState);
    setHiddenButtons(disableButtons);
  }, [userInfo.user, userInfo.userLastState]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDeliveryAddress(e.target.value));
  };

  const handleSelectChange = (value: string) => {
    dispatch(updateOrderDelivery(value));
  };

  const onChangeCheckbox = () => {
    dispatch(updateFromOffice());
  };

  const onSave = () => {
    dispatch(updateDelivery());
  };

  const onCancel = () => {
    dispatch(resetUser());
  };

  return (
    <div className="delivery">
      <div className="delivery__wrapper">
        <div className="delivery__inner">
          <div className="delivery__info">
            *Доставка доступна только для сотрудников, проживающих за пределами г. Воронеж
          </div>
          <div className="delivery__text">Укажите предпочитаемый Вами способ доставки:</div>
          <div className="delivery__line">
            <div className="delivery__label">Способ доставки</div>
            <Select
              defaultValue={user.userDeliveries[0].name}
              value={user.userDeliveries[0].name}
              style={{ width: 240 }}
              onChange={handleSelectChange}
              options={deliveryMethods}
              disabled={user.fromOffice}
            />
          </div>
          <div className="delivery__line">
            <div className="delivery__label">Адрес доставки</div>
            <Input
              placeholder="Адрес доставки"
              style={{ width: 240 }}
              value={user.userDeliveries[0].address}
              onChange={onInputChange}
              disabled={user.fromOffice}
            />
          </div>
          <Checkbox checked={user.fromOffice} onChange={onChangeCheckbox}>
            Буду забирать в офисе
          </Checkbox>
        </div>
        <div className="delivery__hidden">
          {!isHiddenButtons && (
            <div className="delivery__buttons">
              <Button type="primary" size="middle" onClick={onSave}>
                Сохранить
              </Button>
              <Button size="middle" onClick={onCancel}>
                Отменить
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
