import { StarOutlined } from "@ant-design/icons";
import React, { FC, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addFavorite, deleteOneFavorite } from "../../store/slices/favoritesSlice";
import { ShopProductItem } from "../../store/slices/shopSlice";
import { AppDispatch } from "../../store/store";
import { ImageScroll } from "../ImageScroll";
import "./FavoriteProductStyle.scss";
import { Link } from "react-router-dom";
import { itemToCart } from "@utils";

interface FavoriteProductProps {
  item: ShopProductItem;
}

export const FavoriteProduct: FC<FavoriteProductProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [favotites, setFavorites] = useState(item.featured);
  const available = useMemo(
    () => (item.amount ? `В наличии: ${item.amount} шт.` : "Нет в наличии"),
    []
  );

  const handleFavorite = () => {
    setFavorites((prev) => !prev);
    if (!favotites) {
      dispatch(addFavorite({ id: item.id }));
    } else {
      dispatch(deleteOneFavorite({ id: item.id }));
    }
  };

  const onClickToCart = () => {
    itemToCart(item.productVarieties?.[0].id, 1);
  };

  return (
    <div className="FavProductBlock">
      <div className="fotoAndInfo">
        <ImageScroll images={[item.mainImageId, ...item.productImageIds]} />
        <div className="infoAboutItem">
          <Link to={`/shop/product/${item.id}`}>
            <h2>{item.name}</h2>
          </Link>
          <h4>
            {item.description.slice(0, 106)}
            {item.description.length > 106 && <Link to={`/shop/product/${item.id}`}>...</Link>}
          </h4>
          <div className="colorsAndSizes">
            {!!item.colors.length && (
              <div className="colorBlock">
                Цвета:
                {item.colors.map((color) => (
                  <div key={color} style={{ backgroundColor: `${color}` }} className="colorElem" />
                ))}
              </div>
            )}
            {!!item.sizes.length && (
              <div className="sizesBlock">
                Размеры:
                {item.sizes.map((size) => (
                  <div key={size}>{size}</div>
                ))}
              </div>
            )}
          </div>
          <div>{available}</div>
        </div>
      </div>
      <div className="priceAndButtonsBlock">
        <StarOutlined className={`favIcon ${favotites ? "gold" : ""}`} onClick={handleFavorite} />
        <div className="priceAndButtonsSection">
          <h3 className="priceBlock">Стоимость: {item.price}</h3>
          <div className="buttonsBlock">
            <div className="buyAndInCart">
              <Link to={`/shop/product/${item.id}`}>
                <button className="buttonStyled">Купить</button>
              </Link>
              <button className="buttonStyled greenButton" onClick={onClickToCart}>
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
