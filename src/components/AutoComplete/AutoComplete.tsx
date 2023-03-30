import { AutoComplete as AutoCompleteAntd, Input } from "antd";
import { AutoCompleteRow } from "./AutoCopmleteRow/AutoCopmleteRow";
import React, { FC, useState } from "react";
import { TOptions } from "../../utils/types/TOptions";

interface IUser {
  id: number;
  name: string;
  surname: string;
}

export const AutoComplete: FC = () => {
  const initialOptions = [
    { id: 1, name: "oleg", surname: "sidorov" },
    { id: 2, name: "plato", surname: "apple" },
    { id: 3, name: "sergey", surname: "oliva" },
    { id: 4, name: "func", surname: "arrow" },
  ];
  const [result, setResult] = useState<IUser[]>(initialOptions);

  const options: TOptions[] = result.map((elem) => ({
    value: `${elem.name} ${elem.surname}`,
    label: <AutoCompleteRow user={elem} />,
  }));

  const handleSearch = (value: string) =>
    setResult(
      initialOptions.filter((elem) => elem.name.includes(value) || elem.surname.includes(value))
    );

  return (
    <AutoCompleteAntd
      options={options}
      style={{
        width: 180,
      }}
      onSearch={handleSearch}
    >
      <Input placeholder="input here" className="custom" />
    </AutoCompleteAntd>
  );
};
