import React from "react";
import "./shopItem.scss";
import { ShopProductItem } from "src/store/slices/shopSlice";
import { ProductBuy } from "../productBuy";
import { Button, Image } from "antd";
import { Link } from "react-router-dom";
import { StarIcon } from "../starOutlined";
/*
 * Component shop item
 */
export const ShopItem: React.FC<ShopProductItem> = ({
  id,
  mainImageId,
  price,
  name,
  amount,
  productVarieties,
  featured,
}) => {
  const colors = [
    ...new Set(productVarieties.map((item: any) => item.color)),
  ].filter((elem) => elem);
  const sizes = [
    ...new Set(productVarieties.map((item: any) => item.size)),
  ].filter((elem) => elem);
  const imgUrl = mainImageId
    ? //TODO: поменять на BASE_URL, когда это исправят на беке
      `${process.env.IMAGE_URL}?id=${mainImageId}`
    : `${process.env.IMAGE_URL}`;

  return (
    <div className="shop--items__item shop--item">
      <div className="shop--item__img">
        <Image height={"200px"} src={imgUrl} />
      </div>
      <StarIcon featured={featured} id={id} />
      <div className="shop--item__informations">
        <div className="item--informations__price">{price}</div>
        <div className="item--informations__stock">В наличии: {amount} шт</div>
      </div>
      <div className="shop--item__title">{name}</div>
      <div className="shop--item__colors">
        {colors.length != 0 && (
          <>
            Цвета:
            {colors.map((item, index) => (
              <div
                key={index}
                className="item--colors__item"
                style={{ backgroundColor: `${item}` }}
              ></div>
            ))}
          </>
        )}
      </div>
      <div className="shop--item__sizes">
        {sizes.length != 0 && (
          <>
            Размеры:
            {sizes.map((item, index) => (
              <div key={index} className="item--sizes__item">
                {item}
              </div>
            ))}
          </>
        )}
      </div>
      <div className='shop--item__panel'>
        <ProductBuy
          id={productVarieties?.[0]?.id ?? null}
          quantity={1}
          productVarieties={productVarieties}
          amount={amount}
        />
        <Link to={`/shop/product/${id}`} className="shop--item__more">
          <Button className="item--more__button">Подробнее</Button>
        </Link>
      </div>
    </div>
  );
};
