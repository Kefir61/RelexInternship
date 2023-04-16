import { StarOutlined } from "@ant-design/icons";
import { favoritesAdd, favoritesDelete } from "@utils";
import React, { FC, useState } from "react";
import "./starOutlined.scss";

interface IStarIcon {
  featured: boolean;
  id: number;
}

export const StarIcon: FC<IStarIcon> = ({ featured, id }) => {
  const [favotites, setFavorites] = useState(featured);
  const onClickFavorites = () => {
    setFavorites(!favotites);
    if (!featured) {
      favoritesAdd(id);
    } else {
      favoritesDelete(id);
    }
  };
  return (
    <StarOutlined
      className="favotites"
      style={favotites ? { color: "gold" } : {}}
      onClick={onClickFavorites}
    />
  );
};
