import {
  applyValidators,
  login,
  maxLength,
  minLength,
  login as postLogin,
  required,
} from "@utils";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Password from "../../components/passwordForm/Password";
import "./index.scss";

export const Login = () => {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isDirtyLogin, setDirtyLogin] = useState(false);
  const [isDirtyPass, setDirtyPass] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorsLogin = applyValidators(loginValue, [
    maxLength(56),
    required(),
    minLength(6),
  ]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const errorsPass = applyValidators(passValue, [
    maxLength(56),
    required(),
    minLength(6),
  ]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    if (errorsPass.length != 0 || errorsLogin.length != 0) {
      return;
    }
    try {
      e.preventDefault();
      const response = await login(loginValue, passValue);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      navigate("/");
    } catch (e) {
      alert("Ошибка при вводе логина или пароля");
    }
  };

  const disabled = loginValue === "" || passValue === "";
  return (
    <div className="wrapper">
      <form className="login" onSubmit={handleLogin}>
        <h1 className="login__title">Релэкс. Благодарности</h1>
        <div className="login__input">
          <Input
            inputRef={inputRef}
            placeholder="Введите логин..."
            name="login"
            type="text"
            isRequired={true}
            value={loginValue}
            onChange={setLoginValue}
            onBlur={setDirtyLogin}
          />
          {isDirtyLogin &&
            errorsLogin &&
            errorsLogin.map((title: string, index: number) => (
              <label className="input-error" key={index}>
                {title}
              </label>
            ))}
        </div>
        <div className="login__input">
          <Password
            value={passValue}
            onChange={setPassValue}
            placeholder="Введите пароль..."
            onBlur={setDirtyPass}
          />
          {isDirtyPass &&
            errorsPass &&
            errorsPass.map((title: string, index: number) => (
              <label className="input-error" key={index}>
                {title}
              </label>
            ))}
        </div>
        <input
          value="Отправить"
          type="submit"
          disabled={disabled}
          className="login__button"
        />
      </form>
    </div>
  );
};
