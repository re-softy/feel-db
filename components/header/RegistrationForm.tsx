"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { SignUp } from "@/lib/action";

function RegistrationForm() {
  const RegistrationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
        .matches(/^\+995\d{9}$/, "Phone number must start with +995 and have 9 digits")
        .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .required("Password is required"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Repeat Password is required"),
    agreeToPrivacyPolicy: Yup.boolean().oneOf([true], "You must accept the Privacy Policy"),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

  return (
      <Formik
          initialValues={{
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
            repeatPassword: "",
            agreeToPrivacyPolicy: false,
          }}
          validationSchema={RegistrationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const SignUpStatus = await SignUp(values);

              if (SignUpStatus.ok) {
                alert("Registration successful!");
              } else {
                setErrors({ email: SignUpStatus.message || "An error occurred" });
              }
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
      >
        {({ isSubmitting, errors, touched, values }) => (
            <Form className="my-1 flex flex-col">
              <div className="flex flex-col gap-1 2xl:gap-3">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <Field
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"
                  />
                  <ErrorMessage name="name" component="span" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      placeholder="+995"
                      className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"
                  />
                  <ErrorMessage name="phoneNumber" component="span" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="youremail@mail.com"
                      className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"
                  />
                  <ErrorMessage name="email" component="span" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <div className="relative">
                    <Field
                        id="password"
                        name="password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="********"
                        className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {isPasswordVisible ? (
                          <VisibilityOffIcon fontSize="small" className="text-gray-400" />
                      ) : (
                          <VisibilityIcon fontSize="small" className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="span" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="repeatPassword">Repeat Password</label>
                  <div className="relative">
                    <Field
                        id="repeatPassword"
                        name="repeatPassword"
                        type={isRepeatPasswordVisible ? "text" : "password"}
                        placeholder="********"
                        className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setIsRepeatPasswordVisible(!isRepeatPasswordVisible)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {isRepeatPasswordVisible ? (
                          <VisibilityOffIcon fontSize="small" className="text-gray-400" />
                      ) : (
                          <VisibilityIcon fontSize="small" className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="repeatPassword" component="span" className="text-red-500 text-sm" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Field type="checkbox" id="agreeToPrivacyPolicy" name="agreeToPrivacyPolicy" />
                <span className="text-sm">
              I’ve read and accept the
              <Link href="#" className="text-orange cursor-pointer underline ml-2">
                Privacy Policy
              </Link>
            </span>
              </div>
              <ErrorMessage name="agreeToPrivacyPolicy" component="span" className="text-red-500 text-sm" />
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange py-2 px-10 rounded-full tracking-wide mt-4 self-center"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </Form>
        )}
      </Formik>
  );
}

export default RegistrationForm;
