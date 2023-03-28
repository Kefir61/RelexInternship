import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  applyValidators,
  maxLength,
  minLength,
  required,
} from "../../utils/validations";
import Input from "../../components/input/Input";
import Password from "../../components/passwordForm/Password";
import "./index.scss";

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const errorsLogin = applyValidators(login, [
    maxLength(56),
    required(),
    minLength(6),
  ]);
  const errorsPass = applyValidators(pass, [
    maxLength(56),
    required(),
    minLength(6),
  ]);
  const handleLogin = () => {
    if (errorsPass.length != 0 || errorsLogin.length != 0) {
      setError(true);
      return;
    }
    const loginValue = login;
    const passValue = pass;
    const json = JSON.stringify({ loginValue, passValue });
    localStorage.setItem("user", json);
    navigate("/");
  };
  const disabled = login === "" || pass === "" ? true : false;
  return (
    <div className="wrapper">
      <form className="login">
        <h1 className="login__title">Релекс Благодарности</h1>
        <div className="login__input">
          <Input
            placeholder="Введите логин..."
            name="login"
            type="text"
            isRequired={true}
            value={login}
            onChange={setLogin}
          />
          {error &&
            errorsLogin &&
            errorsLogin.map((title) => (
              <label className="input-error">{title}</label>
            ))}
        </div>
        <div className="login__input">
          <Password
            value={pass}
            onChange={setPass}
            placeholder="Введите пароль..."
          />
          {error &&
            errorsPass &&
            errorsPass.map((title) => (
              <label className="input-error">{title}</label>
            ))}
        </div>
        <input
          value="Отправить"
          type="button"
          disabled={disabled}
          className="login__button"
          onClick={handleLogin}
        />
      </form>
    </div>
  );
};
