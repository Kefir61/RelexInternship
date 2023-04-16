import { StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShopProductItem } from "../../store/slices/shopSlice";
import { AppDispatch } from "../../store/store";
import { ProductBuy } from "../productBuy";
import "./shopItem.scss";
import { addFavorite, deleteOneFavorite } from "../../store/slices/favoritesSlice";
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
  const dispatch = useDispatch<AppDispatch>();
  const colors = [...new Set(productVarieties.map((item: any) => item.color))].filter(
    (elem) => elem
  );
  const sizes = [...new Set(productVarieties.map((item: any) => item.size))].filter((elem) => elem);

  const imgUrl = mainImageId
    ? //TODO: поменять на BASE_URL, когда это исправят на беке
      `${process.env.IMAGE_URL}?id=${mainImageId}`
    : `${process.env.IMAGE_URL}`;

  const [favotites, setFavorites] = useState(featured);

  const handleFavorite = () => {
    setFavorites((prev) => !prev);
    if (!favotites) {
      dispatch(addFavorite({ id }));
    } else {
      dispatch(deleteOneFavorite({ id }));
    }
  };

  return (
    <div className="shop--items__item shop--item">
      <div className="shop--item__img">
        <img src={imgUrl} alt="img" />
      </div>
      <StarOutlined
        style={favotites ? { color: "#ffa500" } : {}}
        className="shop--item__favotites"
        onClick={handleFavorite}
      />
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
      <ProductBuy id={productVarieties[0].id} quantity={1} />
      <Link to={`/shop/product/${id}`} className="shop--item__more">
        <Button className="item--more__button">Подробнее</Button>
      </Link>
    </div>
  );
};
