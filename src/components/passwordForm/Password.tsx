import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

type PasswordFormProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur: (value: boolean) => void;
};

/*
 * Basic component password
 */
const Password: React.FC<PasswordFormProps> = ({
  value,
  onChange,
  placeholder,
  onBlur,
}) => {
  return (
    <Space direction="vertical">
      <Input.Password
        style={{ width: "200px" }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onBlur(true)}
      />
    </Space>
  );
};

export default Password;
