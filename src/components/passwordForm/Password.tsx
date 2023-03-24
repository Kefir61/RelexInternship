import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

type PasswordFormProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

/*
 * Basic component password
 */
const Password: React.FC<PasswordFormProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Space direction="vertical">
      <Input.Password
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Space>
  );
};

export default Password;
