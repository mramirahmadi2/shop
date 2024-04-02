import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (values, { setSubmitting, resetForm }) => {
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ورود ناموفق. لطفا مجددا تلاش کنید.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("ورود موفقیت آمیز بود.");
        resetForm();
        // ذخیره تاریخ و زمان فعلی در localStorage به عنوان زمان لاگین
        localStorage.setItem("loginTime", Date.now());
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="w-full">
      <h1 className="my-6 font-bold text-lg">صفحه ورود</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("لطفا ایمیل خود را به درستی وارد کنید")
            .required("لطفا ایمیل خود را وارد کنید"),
          password: Yup.string().required("لطفا رمز خود را وارد کنید"),
        })}
        onSubmit={handleLogin}
      >
        <Form className="flex flex-col justify-center items-start space-y-4 w-full">
          <div className="flex flex-row space-x-2 w-[25rem] justify-between ">
            <label htmlFor="email" className="">
              ایمیل
            </label>
            <div className="flex flex-col">
              <Field
                type="email"
                id="email"
                name="email"
                className="border-2 px-2 py-1 text-black"
              />
              <ErrorMessage name="email" />
            </div>
          </div>
          <div className="flex flex-row space-x-2 w-[25rem] justify-between">
            <label htmlFor="password" className="">
              رمز
            </label>
            <div className="flex flex-col">
              <Field
                type="password"
                id="password"
                name="password"
                className="border-2 px-2 py-1 text-black"
              />
              <ErrorMessage name="password" className="relative" />
            </div>
          </div>
          <div className="flex flex-row justify-start w-full ">
            <Button
              type="submit"
              body={"ورود"}
              ClassName="bg-blue-500 text-white "
            />
            <Button
              type="button"
              body="ثبت‌نام"
              Click={() => {
                navigate("/Sinup");
              }}
              ClassName="bg-red-500 text-white  mr-4"
            />
          </div>
        </Form>
      </Formik>
      <p className="text-center my-4">
        برای ورودی ازمایشی و سریع از ایمیل : admin@example.com و رمز : 51045104
        استفاده کنید
      </p>
      <div className="border-2 p-2 border-green-700 rounded-xl flex flex-col items-start space-y-3">
        <p className="mt-2">
          لطفا قبل از استفاده از پروژه این کد را در ترمینال خود وارد کنید :
          json-server --watch db.json -p 8000 -m ./node_modules/json-server-auth
        </p>
        <Button
          body="برای کپی کد بالا کلیک کنید"
          ClassName="bg-green-700 text-white"
          Click={() => {
            navigator.clipboard.writeText(
              "json-server --watch db.json -p 8000 -m ./node_modules/json-server-auth"
            );
          }}
        />
      </div>

     
    </div>
  );
};

export default Login;
