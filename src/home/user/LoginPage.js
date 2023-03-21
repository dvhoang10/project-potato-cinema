import { Input, message } from "antd";
import ErrorComponent from "components/common/ErrorComponent";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { localStoreService } from "services/localStoreService";
import { fecthUserLogin } from "store/user/userHandlers";
import styled from "styled-components";
import { AntdForm, AntdFormItem } from "styles/AntDesign";
import { Breakpoints } from "styles/Breakpoint";
import { StyledBox, StyledButton, StyledLogo } from "styles/Styles";
import { POTATO, USER_LOGIN } from "utils/config";

const LoginPageStyles = {
  Form: styled(AntdForm)`
    width: 600px;
    margin: 1rem;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 1rem;
    label {
      width: 200px;
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

function LoginPage() {
  useEffect(() => {
    document.title = `Login - ${POTATO}`;
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
  if (localStoreService.getItemLocal(USER_LOGIN)) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <StyledBox>
      <LoginPageStyles.Form
        onFinish={formik.handleSubmit}
        labelCol={{ span: 6 }}
      >
        <LoginPageStyles.Center>
          <Link to="/">
            <StyledLogo className="logo">{POTATO}</StyledLogo>
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
            Don't have an account?
            <Link to="/signup">Sign Up</Link>
          </LoginPageStyles.Text>
        </LoginPageStyles.Center>
        <StyledButton type="submit" textTransform="uppercase">
          Login
        </StyledButton>
      </LoginPageStyles.Form>
    </StyledBox>
  );
}

export default withErrorBoundary(LoginPage, {
  FallbackComponent: ErrorComponent,
});
