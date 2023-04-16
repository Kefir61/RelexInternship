import React, { FC, useEffect, useState } from "react";
import "./Product.scss";
import { FilterProductCard, ProductBuyVarieties, StarIcon } from "@components";
import { Image, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductCard,
  selectProductCard,
  setAmountToCart,
} from "../../store/slices/productCardSlice";
import { AppDispatch } from "src/store/store";
import { useParams } from "react-router";

export const Product: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { product, filterColor, filterSize, amountToCart } =
    useSelector(selectProductCard);
  const { id } = useParams();

  const itemActive = product.productVarieties?.find((item) => {
    return item?.color === filterColor && item?.size === filterSize;
  }) ?? {
    nameProduct: "",
    id: null,
    quantity: 0,
    mainImageId: null,
    price: null,
    cartAmount: 0,
  };
  const [cartAmount, setCartAmount] = useState(itemActive.cartAmount);

  const getProduct = async () => {
    await dispatch(
      fetchProductCard({
        id: Number(id),
      })
    );
  };
  useEffect(() => {
    getProduct();
  }, []);

  const imgUrl = product.mainImageId
    ? //TODO: поменять на BASE_URL, когда это исправят на беке
      `${process.env.IMAGE_URL}?id=${product.mainImageId}`
    : `${process.env.IMAGE_URL}`;

  const onChangeAmount = (value: number) => {
    dispatch(setAmountToCart(value));
  };

  return (
    <div className="product">
      <div className="product--info">
        <div className="product--info__images">
          <div className="info--images__main">
            <Image src={imgUrl} />
          </div>
          <StarIcon featured={product.featured} id={product.id} />
        </div>
        <div className="product--info__counts">
          В наличии: {product.amount}шт
        </div>
        <div className="product--info__colors">
          {product.colors?.length != 0 && (
            <>
              Цвета:
              {product.colors?.map((item, index) => (
                <div key={index} style={{ backgroundColor: `${item}` }}></div>
              ))}
            </>
          )}
        </div>
        <div className="product--info__sizes">
          {product.sizes?.length != 0 && (
            <>
              Размеры:
              {product.sizes?.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </>
          )}
        </div>
        <div className="product--info__description">
          Описание товара: {product.description}
        </div>
      </div>
      <div className="product--panel">
        <div className="product--panel__name">{product.name}</div>
        <div className="product--panel__price">
          <span>Цена:</span>
          <span>{product.price}</span>
        </div>
        <div className="product--panel__selects">
          <FilterProductCard product={product} itemActive={itemActive} />
        </div>
        <div
          className={`${
            itemActive?.quantity < 5 ? "left--little" : "much--left"
          }`}
        >
          Осталось - {itemActive?.quantity - cartAmount} шт
        </div>
        <div className="product--panel__counts">
          <span>Количество</span>
          <InputNumber
            min={1}
            max={itemActive?.quantity - cartAmount}
            defaultValue={0}
            onChange={onChangeAmount}
          />
        </div>
        <ProductBuyVarieties
          quantity={amountToCart}
          product={itemActive}
          amount={product.amount}
          setCartAmount={setCartAmount}
          cartAmount={cartAmount}
        />
      </div>
    </div>
  );
};
