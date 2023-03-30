import { Pagination, Spin } from "antd";
import React, { FC, ReactNode, useMemo, useState } from "react";

interface ListProps {
  totalElementCount: number;
  renderElement: (elem: object) => ReactNode;
  onChangePage: (pageNum: number) => void;
  content: object[];
}

export const ListWithPagination: FC<ListProps> = ({
  totalElementCount,
  renderElement,
  onChangePage,
  content,
}) => {
  return (
    <div>
      {content.map((item) => renderElement(item))}
      <Pagination
        size="small"
        defaultCurrent={1}
        total={totalElementCount}
        onChange={onChangePage}
      />
    </div>
  );
};
