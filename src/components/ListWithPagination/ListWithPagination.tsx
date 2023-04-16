import { Pagination } from "antd";
import React, { FC, ReactNode, memo } from "react";
import "./ListWithPaginationStyle.scss";

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
      <div className="MainBlock">
        {content.map((item) => renderElement(item))}
        <Pagination
          className="pagination"
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
