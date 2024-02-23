import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../src/Register.css";
import API from "./utils/API";
import { useMutation } from "react-query";

const Login = () => {
  const token = localStorage.getItem("jwt");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [nonActalentEmail, setNonActalentEmail] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const loginDisabled =
    email.length === 0 || password.length === 0 || loginLoading;

  const { register, handleSubmit } = useForm();

  const { mutate: createLogin, isError } = useMutation({
    mutationFn: (data) =>
      API.loginRegisterPostData(
        data,
        "http://localhost:1337/api/auth/local"
      ).then((response) => {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem(
          "employee_full_name",
          response.data.user.employee_full_name
        );
        localStorage.setItem("employee_id", response.data.user.employee_id);
      }),
  });

  const loginHandler = (data) => {
    setLoginLoading(true);
    if (email) {
      const [emailDomain] = email.split("@");

      if (
        email == emailDomain + "@" + "actalentservices.com" ||
        email == emailDomain + "@" + "allegisgroup.com"
      ) {
        createLogin(data);
      } else {
        setLoginLoading(false);
        setInvalidLogin(true);
        setNonActalentEmail(true);
        setPassword("");
      }
    }
  };

  useEffect(() => {
    if (token) {
      window.location.replace("http://localhost:3000");
    }
  }, [token]);

  return (
    <>
      <div>
        <div
          style={{
            background: 'url("/assets/images/signin/signin-2.jpg") no-repeat',
            backgroundSize: "cover",
          }}
          className="min-h-screen px-4 py-8 md:px-6 lg:px-8 "
        >
          <div className="flex flex-wrap">
            <div
              className="w-full lg:w-6 p-4 lg:p-7 bg-cover border-round-xl border-noround-right border-solid border-bluegray-500"
              style={{
                background: 'url("/assets/images/signin/signin.jpg") no-repeat',
              }}
            >
              <img
                src="assets/images/actalent_logo_A.png"
                alt="Actalent Logo"
                height="50"
                className="mb-6 "
              />
              <div className="text-xl text-80 font-500 mb-3 text-6xl">
                EAT...
              </div>
              <p className="text-80 line-height-3 mt-0 mb-6 text-6xl">
                Coming Soon...
              </p>
            </div>
            <div className="w-full lg:w-6 p-4 lg:p-7 surface-card bg-blue-100 border-solid border-bluegray-500  border-round-xl border-noround-left">
              <div className="text-800 text-2xl font-medium mb-4 text-4xl ">
                Login
              </div>
              <label
                htmlFor="email"
                className="block text-800 font-medium mb-2"
              >
                Email
              </label>
              <InputText
                id="email"
                name="identifier"
                type="text"
                {...register("identifier")}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (invalidLogin) setInvalidLogin(false);
                }}
                className={`w-full mb-4 ${
                  invalidLogin || isError ? "p-invalid" : ""
                }`}
              />

              <label
                htmlFor="password"
                className="block text-800 font-medium mt-2"
              >
                Password
              </label>
              <InputText
                id="password"
                name="password"
                {...register("password")}
                value={password}
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (invalidLogin) setInvalidLogin(false);
                }}
                className={`w-full ${
                  invalidLogin || isError ? "p-invalid" : ""
                }`}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !loginDisabled) loginHandler();
                }}
              />

              {isError && !nonActalentEmail && (
                <small id="password" className="p-error block">
                  Email or password incorrect.
                </small>
              )}
              {invalidLogin && nonActalentEmail && (
                <small id="password" className="p-error block">
                  You need to sign in using an '@actalentservices.com' or
                  '@allegisgroup.com' account
                </small>
              )}

              <Button
                label="Login"
                className="mt-4 w-full"
                onClick={handleSubmit(loginHandler)}
              />
              <Link to={"/register"}>
                <Button
                  className="mt-5 w-6 ml-2"
                  label="New user"
                  size="small"
                />
              </Link>
              <Link to={"/register"}>
                <Button
                  className="mt-5 w-5 ml-6"
                  label="Forgot Password"
                  size="small"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
