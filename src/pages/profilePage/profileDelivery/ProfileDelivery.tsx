import React, { FC, useState, useMemo, useEffect } from "react";
import { Select, Input, Button, Checkbox } from "antd";
import { deliveryMethods } from "@utils";
import "./profileDelivery.scss";
import { DefaultOptionType } from "antd/es/select";

export const ProfileDelivery: FC = () => {
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0]);
  const [pickupFromOffice, setPicupFromOffice] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isHiddenButtons, setHiddenButtons] = useState(true);

  const memoizedDeliveryMethods = useMemo<DefaultOptionType[]>(
    () =>
      deliveryMethods.map((deliveryMethod) => ({ label: deliveryMethod, value: deliveryMethod })),
    [deliveryMethod]
  );

  //TODO: Добавить нормальное скрытие кнопок с юзеффектом
  useEffect(() => {
    !!deliveryAddress || deliveryMethod !== deliveryMethods[0] || pickupFromOffice
      ? setHiddenButtons(false)
      : setHiddenButtons(true);
  }, [deliveryMethod, pickupFromOffice, deliveryAddress]);

  const handleSelectChange = (value: string) => {
    setDeliveryMethod(value);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryAddress(e.target.value);
  };

  const onSave = () => {
    //TODO:  Добавить запрос на сервер + редакс
  };

  const onChangeCheckbox = () => {
    setPicupFromOffice(!pickupFromOffice);
  };

  const onCancel = () => {
    setDeliveryMethod(deliveryMethods[0]);
    setDeliveryAddress("");
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
              defaultValue={deliveryMethod}
              value={deliveryMethod}
              style={{ width: 240 }}
              onChange={handleSelectChange}
              options={memoizedDeliveryMethods}
              disabled={pickupFromOffice}
            />
          </div>
          <div className="delivery__line">
            <div className="delivery__label">Адрес доставки</div>
            <Input
              placeholder="Адрес доставки"
              style={{ width: 240 }}
              value={deliveryAddress}
              onChange={onInputChange}
              disabled={pickupFromOffice}
            />
          </div>
          <Checkbox checked={pickupFromOffice} onChange={onChangeCheckbox}>
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
