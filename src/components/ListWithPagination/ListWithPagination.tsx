import { Pagination, Spin } from "antd";
import React, { FC, ReactNode, memo, useEffect, useMemo, useState } from "react";

interface ListProps {
  totalPages: number;
  renderElement: (elem: unknown) => ReactNode;
  onChangePage: (pageNum: number) => void;
  content: unknown[];
  currentPage?: number;
}

export const ListWithPagination: FC<ListProps> = memo(
  ({ totalPages, renderElement, onChangePage, content, currentPage }) => {
    return (
      <div>
        {content.map((item) => renderElement(item))}
        <Pagination
          size="small"
          pageSize={content.length}
          defaultCurrent={currentPage ?? 1}
          total={totalPages * content.length}
          onChange={onChangePage}
          showSizeChanger={false}
        />
      </div>
    );
  }
);
