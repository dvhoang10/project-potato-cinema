import { Input, message } from "antd";
import ErrorComponent from "components/common/ErrorComponent";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { localStoreService } from "services/localStoreService";
import { registerUser } from "store/user/userHandlers";
import styled from "styled-components";
import { AntdForm, AntdFormItem } from "styles/AntDesign";
import { Breakpoints } from "styles/Breakpoint";
import { StyledBox, StyledButton, StyledLogo } from "styles/Styles";
import { POTATO, USER_LOGIN } from "utils/config";

const SignUpPageStyles = {
  Form: styled(AntdForm)`
    width: 600px;
    margin: 1rem;
    padding: 2rem;
    background-color: var(--color-bg);
    border-radius: 1rem;
    label {
      width: 210px;
      svg {
        color: var(--color-red);
      }
    }
  `,
  Center: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  `,
  Text: styled.span`
    color: var(--light);
    font-size: 1rem;
    a {
      font-weight: 600;
      text-decoration: underline;
      margin-left: 0.5rem;
    }
    ${Breakpoints.sm} {
      font-size: 0.875rem;
    }
  `,
};

const SignUpPage = () => {
  useEffect(() => {
    document.title = `SignUp - ${POTATO}`;
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "",
    },
    onSubmit: async (values) => {
      try {
        await dispatch(registerUser(values)).unwrap();
        message.success("Sign up successful");
        navigate("/login");
      } catch (error) {
        console.log("🚀 ~ error:", error);
        message.error("Username or Email already exists!");
      }
    },
  });
  if (localStoreService.getItemLocal(USER_LOGIN)) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <StyledBox>
      <SignUpPageStyles.Form onFinish={formik.handleSubmit}>
        <SignUpPageStyles.Center>
          <Link to="/">
            <StyledLogo name="logo">{POTATO}</StyledLogo>
          </Link>
        </SignUpPageStyles.Center>
        <AntdFormItem
          name="taiKhoan"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input onChange={formik.handleChange} />
        </AntdFormItem>
        <AntdFormItem
          name="hoTen"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input onChange={formik.handleChange} />
        </AntdFormItem>
        <AntdFormItem
          name="matKhau"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                "Password must be at least 8 characters and contain least one number, one uppercase, one lowercase character.",
            },
          ]}
        >
          <Input.Password onChange={formik.handleChange} />
        </AntdFormItem>
        <AntdFormItem
          name="confirm"
          label="Confirm Password"
          dependencies={["matKhau"]}
          rules={[
            { required: true, message: "Please input your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do NOT match!"));
              },
            }),
          ]}
        >
          <Input.Password onChange={formik.handleChange} />
        </AntdFormItem>
        <AntdFormItem
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Please input a valid email",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input onChange={formik.handleChange} />
        </AntdFormItem>
        <AntdFormItem
          name="soDT"
          label="Phone"
          rules={[
            { required: true, message: "Please input your phone!" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Phone numbers can only be numbers with 10 digits",
            },
          ]}
        >
          <Input onChange={formik.handleChange} />
        </AntdFormItem>
        <SignUpPageStyles.Center>
          <SignUpPageStyles.Text>
            Already have an account?
            <Link to="/login">Login</Link>
          </SignUpPageStyles.Text>
        </SignUpPageStyles.Center>
        <StyledButton type="submit" textTransform="uppercase">
          Sign Up
        </StyledButton>
      </SignUpPageStyles.Form>
    </StyledBox>
  );
};

export default withErrorBoundary(SignUpPage, {
  FallbackComponent: ErrorComponent,
});
