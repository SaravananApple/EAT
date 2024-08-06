import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import API from "./utils/API";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import "../src/Register.css";

const Register = () => {
  const [searchParams, setSearchParams] = useState(false);
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nonActalentEmail, setNonActalentEmail] = useState(false);

  const loginDisabled =
    username.length === 0 || email.length === 0 || password.length === 0;

  const toastRef = useRef(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const { mutate: postDataRegister } = useMutation({
    mutationFn: (data) =>
      API.loginRegisterPostData(
        data,
        "http://localhost:1337/api/auth/local/register"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toastRef.current.show({
        severity: "success",
        summary: "Success",
        detail: "The entry was added successfully",
        life: 3000,
      });
      setSearchParams(true);
    },
    onError: (error) => {
      let message = "Something went wrong when attempting to add the entry";
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        message = "Error: " + error.response.data.error.message;
      }
      toastRef.current.show({
        severity: "warn",
        summary: "Failed",
        detail: message,
        life: 6000,
      });
    },
  });

  const loginHandler = () => {
    window.location.replace("http://localhost:3000/Login");
  };

  const onValidSubmit = (data) => {
    if (email) {
      const [emailDomain] = email.split("@");

      if (
        email == emailDomain + "@" + "actalentservices.com" ||
        email == emailDomain + "@" + "allegisgroup.com"
      ) {
        postDataRegister(data);
      } else {
        setNonActalentEmail(true);
        setPassword("");
      }
    }
  };

  useEffect(() => {
    if (searchParams) {
      loginHandler();
    }
  });

  return (
    <>
      <Toast ref={toastRef} />
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
                Register
              </div>

              <label
                htmlFor="username"
                className="block text-800 font-medium mt-1"
              >
                Employee Id
              </label>
              <InputText
                name="username"
                {...register("employee_id")}
                placeholder="Enter The Employee Id"
                type="number"
                className="mt-1 w-full"
                onChange={(event) => {
                  setuserName(event.target.value);
                }}
              />

              <label
                htmlFor="username"
                className="block text-800 font-medium mt-1"
              >
                Employee FullName
              </label>
              <InputText
                name="username"
                {...register("employee_full_name")}
                placeholder="Enter The Employee FullName"
                type="text"
                className="mt-1 w-full"
                onChange={(event) => {
                  setuserName(event.target.value);
                }}
              />

              <label
                htmlFor="username"
                className="block text-800 font-medium mt-1"
              >
                Username
              </label>
              <InputText
                name="username"
                {...register("username")}
                placeholder="Enter The username"
                type="text"
                className="mt-1 w-full"
                onChange={(event) => {
                  setuserName(event.target.value);
                }}
              />

              <label
                htmlFor="email"
                className="block text-800 font-medium mt-1"
              >
                Email
              </label>
              <InputText
                name="email"
                {...register("email")}
                placeholder="Enter the Email"
                type="email"
                className={`w-full mt-1 ${nonActalentEmail ? "p-invalid" : ""}`}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />

              <label
                htmlFor="password"
                className="block text-800 font-medium mt-2"
              >
                Password
              </label>
              <InputText
                name="password"
                placeholder="Enter the password"
                {...register("password")}
                type="password"
                className="mt-1 w-full"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />

              {nonActalentEmail && (
                <small id="password" className="p-error block">
                  You need to sign in using an '@actalentservices.com' or
                  '@allegisgroup.com' account
                </small>
              )}

              <Button
                label="Register"
                className="mt-4 w-full"
                disabled={loginDisabled}
                onClick={handleSubmit(onValidSubmit)}
              />
              <Link to={"/login"}>
                <Button label="Login" className="mt-4 w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
