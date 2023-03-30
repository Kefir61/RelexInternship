import { applyValidators, maxLength, minLength, loginFn, required } from "@utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Password from "../../components/passwordForm/Password";
import "./index.scss";

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [isDirtyLogin, setDirtyLogin] = useState(false);
  const [isDirtyPass, setDirtyPass] = useState(false);

  const errorsLogin = applyValidators(login, [maxLength(56), required(), minLength(6)]);
  const errorsPass = applyValidators(pass, [maxLength(56), required(), minLength(6)]);

  const handleLogin = async () => {
    if (errorsPass.length != 0 || errorsLogin.length != 0) {
      return;
    }
    try {
      const response = await loginFn(login, pass);
      localStorage.setItem("token", response.accessToken);
      navigate("/");
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };
  const disabled = login === "" || pass === "";
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
            onBlur={setDirtyLogin}
          />
          {isDirtyLogin &&
            errorsLogin &&
            errorsLogin.map((title) => <label className="input-error">{title}</label>)}
        </div>
        <div className="login__input">
          <Password
            value={pass}
            onChange={setPass}
            placeholder="Введите пароль..."
            onBlur={setDirtyPass}
          />
          {isDirtyPass &&
            errorsPass &&
            errorsPass.map((title) => <label className="input-error">{title}</label>)}
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
