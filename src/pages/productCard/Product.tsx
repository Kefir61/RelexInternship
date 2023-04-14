import React, { FC, useEffect } from "react";
import "./Product.scss";
import { Filter, ProductBuy } from "@components";
import { Button, InputNumber, Select, Space } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductCard,
  selectProductCard,
} from "../../store/slices/productCardSlice";
import { AppDispatch } from "src/store/store";
import { useParams } from "react-router";
import { IOption, translateColor } from "@utils";
import {
  selectFilterProduct,
  setAmountToCart,
  setProductFilterColor,
  setProductFilterSize,
} from "../../store/slices/productFilterSlice";

export const Product: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector(selectProductCard);
  const { filterColor, filterSize, amountToCart } =
    useSelector(selectFilterProduct);

  let itemToCart = product.id;
  product.productVarieties?.forEach((item) => {
    if (item?.color === filterColor && item?.size === filterSize) {
      itemToCart = item.id 
    }
  });

  const { id } = useParams();
  const getProduct = async () => {
    dispatch(
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

  const ruColors = translateColor(product.colors);

  const colorOptions: IOption[] = [];
  product?.colors.map((item, index) => {
    colorOptions.push({ value: item, label: ruColors[index] });
  });
  const sizeOptions: IOption[] = [];
  product?.sizes.map((item) => {
    sizeOptions.push({ value: item, label: item });
  });

  const handleFilterSize = (value: string) => {
    dispatch(setProductFilterSize(value));
  };
  const handleFilterColor = (value: string) => {
    dispatch(setProductFilterColor(value));
  };
  const onChangeAmount = (value: number) => {
    dispatch(setAmountToCart(value));
  };
  return (
    <div className="product">
      <div className="product--info">
        <div className="product--info__images">
          <div className="info--images__main">
            <img src={imgUrl} />
            <Button className="images--main__button" type="link">
              Посмотреть
            </Button>
          </div>
          <StarOutlined />
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
          <Space wrap>
            {product.sizes?.length != 0 && (
              <Select
                defaultValue={`${sizeOptions[0].value ?? ''}`}
                style={{ width: 120 }}
                onChange={handleFilterSize}
                options={sizeOptions}
              />
            )}
            {product.colors?.length != 0 && (
              <Select
                defaultValue={`${colorOptions[0].value ?? ''}`}
                style={{ width: 120 }}
                onChange={handleFilterColor}
                options={colorOptions}
              />
            )}
          </Space>
        </div>
        <div className="product--panel__counts">
          <span>Количество</span>
          <InputNumber
            min={1}
            max={product.amount}
            defaultValue={0}
            onChange={onChangeAmount}
          />
        </div>
        <ProductBuy id={itemToCart} quantity={amountToCart} />
      </div>
    </div>
  );
};
