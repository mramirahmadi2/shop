import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <h1 className="my-6 font-bold text-lg">صفحه ثبت‌نام</h1>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('لطفا نام کاربری خود را وارد کنید'),
          email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('لطفا ایمیل خود را وارد کنید'),
          password: Yup.string().required('لطفا رمز عبور خود را وارد کنید').min(6, 'رمز عبور باید حداقل 6 کاراکتر داشته باشد'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('مشکلی در ثبت‌نام رخ داده است. لطفا مجددا تلاش کنید.');
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              alert('ثبت‌نام با موفقیت انجام شد.');
              navigate('/');
              resetForm();
            })
            .catch((error) => {
              console.error('Error:', error);
              alert(error.message);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        <Form className="flex flex-col justify-center items-start space-y-4 w-full">
          <div className="flex flex-row space-x-2 w-[25rem] justify-between ">
            <label htmlFor="username" className="">
              نام کاربری
            </label>
            <div className="flex flex-col">
              <Field
                type="text"
                id="username"
                name="username"
                className="border-2 px-2 py-1 text-black"
              />
              <ErrorMessage name="username" />
            </div>
          </div>
          <div className="flex flex-row space-x-2 w-[25rem] justify-between">
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
              رمز عبور
            </label>
            <div className="flex flex-col">
              <Field
                type="password"
                id="password"
                name="password"
                className="border-2 px-2 py-1 text-black"
              />
              <ErrorMessage name="password" />
            </div>
          </div>
          <div className="flex flex-row justify-start w-full">
            <Button
              type="submit"
              body="ثبت‌نام"
              ClassName="bg-blue-500 text-white rounded-xl"
            />
          </div>
        </Form>
      </Formik>
      <p className='mt-4'>اگر قبلا ثبتنام کرده اید <span className='text-blue-500 cursor-pointer' onClick={()=>{navigate('/Login')}}>اینجا</span> کلیک کنید </p>
    </div>
  );
};

export default Signup;
