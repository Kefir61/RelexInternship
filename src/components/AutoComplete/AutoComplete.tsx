import { IContentToAutoComplete, IUser } from "@utils";
import { AutoComplete as AutoCompleteAntd, Input } from "antd";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { TOptions } from "../../utils/types/TOptions";

interface AutoCompleteProps {
  onSelect: (choosenItem: unknown) => void;
  renderElement: (elem: unknown) => ReactNode;
  content: IContentToAutoComplete[];
  width?: string;
}

export const AutoComplete: FC<AutoCompleteProps> = ({
  onSelect,
  renderElement,
  content,
  width,
}) => {
  const [searchOptions, setSearchOptions] = useState<IContentToAutoComplete[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    handleSearch("");
  }, [content]);

  const options: TOptions[] = useMemo(
    () =>
      searchOptions.map((elem) => ({
        value: JSON.stringify(elem.item),
        label: renderElement(elem.item),
      })),
    [searchOptions]
  );

  const handleSelect = (value: string, option: TOptions) => {
    const choosen = content.find((elem) => JSON.stringify(elem.item) === value);
    onSelect(JSON.parse(value));
    setValue(choosen.fieldFillText);
  };

  const handleSearch = (value: string) => {
    setSearchOptions(content.filter((elem) => elem.strToFindIn.includes(value)));
  };

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <AutoCompleteAntd
      value={value}
      options={options}
      style={{
        width,
      }}
      onChange={handleChange}
      onSearch={handleSearch}
      onSelect={handleSelect}
    >
      <Input className="custom" />
    </AutoCompleteAntd>
  );
};
