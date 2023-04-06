import { Pagination, Spin } from "antd";
import React, { FC, ReactNode, useMemo, useState } from "react";

interface ListProps {
  totalPages: number;
  renderElement: (elem: unknown) => ReactNode;
  onChangePage: (pageNum: number) => void;
  content: unknown[];
}

export const ListWithPagination: FC<ListProps> = ({
  totalPages,
  renderElement,
  onChangePage,
  content,
}) => {
  return (
    <div>
      {content.map((item) => renderElement(item))}
      <Pagination
        size="small"
        pageSize={content.length}
        defaultCurrent={1}
        total={totalPages * content.length}
        onChange={onChangePage}
        showSizeChanger={false}
      />
    </div>
  );
};
