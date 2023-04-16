import React, { FC } from "react";
import { Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShopProductItem,
  TProductVarieties,
  selectShop,
  setPage,
} from "../../store/slices/shopSlice";
import { IOption, translateColor } from "@utils";
import {
  setProductFilterColor,
  setProductFilterSize,
} from "../../store/slices/productCardSlice";

interface IFilterProductCard {
  product: ShopProductItem;
  itemActive: TProductVarieties;
}

export const FilterProductCard: FC<IFilterProductCard> = ({
  product,
  itemActive,
}) => {
  const dispatch = useDispatch();
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
  return (
    <Space wrap>
      {product.sizes?.length != 0 && (
        <Select
          defaultValue={`${itemActive?.size ?? ""}`}
          style={{ width: 120 }}
          onChange={handleFilterSize}
          options={sizeOptions}
        />
      )}
      {product.colors?.length != 0 && (
        <Select
          defaultValue={`${itemActive.color ?? ""}`}
          style={{ width: 120 }}
          onChange={handleFilterColor}
          options={colorOptions}
        />
      )}
    </Space>
  );
};
