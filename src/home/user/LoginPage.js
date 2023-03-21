import { Input, message } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fecthUserLogin } from "store/user/userHandlers";
import styled from "styled-components";
import { AntdForm, AntdFormItem } from "styles/AntDesign";
import { Breakpoints } from "styles/Breakpoint";
import { StyledButton } from "styles/Styles";
import { CYBERSOFT_TOKEN, CYBERSOFT_URL, POTATO } from "utils/config";

const LoginPageStyles = {
  Box: styled.div`
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url("images/bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fade-in 1s ease-in-out;
  `,
  Form: styled(AntdForm)`
    width: 600px;
    margin: 1rem;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 1rem;
  `,
  Center: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  `,
  Logo: styled.h3`
    font-family: "Khand", sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-red);
    text-transform: uppercase;
    display: inline-block;
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

export default function LoginPage() {
  useEffect(() => {
    document.title = `Log in - ${POTATO}`;
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: async (values) => {
      try {
        await dispatch(fecthUserLogin(values)).unwrap();
        message.success("Login successful");
        navigate("/");
      } catch (error) {
        console.log("🚀 ~ error:", error.response);
        message.error("Login failed");
      }
    },
  });
  return (
    <LoginPageStyles.Box>
      <LoginPageStyles.Form
        onFinish={formik.handleSubmit}
        labelCol={{ span: 6 }}
      >
        <LoginPageStyles.Center>
          <Link to="/">
            <LoginPageStyles.Logo className="logo">
              {POTATO}
            </LoginPageStyles.Logo>
          </Link>
        </LoginPageStyles.Center>
        <AntdFormItem
          label="Username"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input onChange={formik.handleChange}></Input>
        </AntdFormItem>
        <AntdFormItem
          label="Password"
          name="matKhau"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onChange={formik.handleChange}></Input.Password>
        </AntdFormItem>
        <LoginPageStyles.Center>
          <LoginPageStyles.Text>
            Don't have an account yet?
            <Link to="/signup">Sign Up</Link>
          </LoginPageStyles.Text>
        </LoginPageStyles.Center>
        <StyledButton type="submit" textTransform="uppercase">
          Login
        </StyledButton>
      </LoginPageStyles.Form>
    </LoginPageStyles.Box>
  );
}
