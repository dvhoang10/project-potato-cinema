import ErrorComponent from "components/common/ErrorComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { localStoreService } from "services/localStoreService";
import { setLoading, unSetLoading } from "store/loading/loadingSlice";
import { getUserInfo, updateUserInfo } from "store/user/userHandlers";
import { GROUP_ID_USER, USER_LOGIN } from "utils/config";
import styled from "styled-components";
import { Breakpoints } from "styles/Breakpoint";
import { Input, message } from "antd";
import LoadingPageV3 from "components/loading/v3/LoadingPageV3";
import { Heading, StyledButton } from "styles/Styles";
import { AntdForm, AntdFormItem } from "styles/AntDesign";
import { UserModel } from "models/models";

const ProfilePageStyles = {
  Background: styled.div`
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url("images/bg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100%;
  `,
  Box: styled.div`
    max-width: 1024px;
    margin: 0 auto;
    min-height: inherit;
    display: flex;
    width: 100%;
    animation: fade-in 1s ease-in-out 0s both;
    ${Breakpoints.md} {
      flex-direction: column;
      padding: 2rem 0;
    }
  `,
  Center: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    ${Breakpoints.md} {
      width: 100%;
    }
  `,
  Col: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  Text: styled.p`
    margin-right: 0.25rem;
    text-align: ${(props) => (props.center ? "center" : "left")};
    ${Breakpoints.sm} {
      height: auto;
      font-size: 0.875rem;
    }
  `,
};

const User = {
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    user-select: none;
    ${Breakpoints.md} {
      width: 100%;
    }
  `,
  Avatar: styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
    ${Breakpoints.md} {
      width: 150px;
      height: 150px;
    }
  `,
  Name: styled.h2`
    font-size: 1.875rem;
    text-align: center;
    font-weight: 600;
    padding-top: 1.5rem;
    color: var(--text-light);
    ${Breakpoints.md} {
      font-size: 1.5rem;
    }
  `,
};

const FormStyles = {
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
    .ant-input[disabled] {
      border-color: var(--color-light);
      color: var(--color-light);
    }
    .error {
      color: var(--color-red);
      font-family: "Poppins", sans-serif;
    }
  `,
  Heading: styled.h2`
    font-family: "Poppins", sans-serif;
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-red);
    text-align: center;
    margin-bottom: 2rem;
    ${Breakpoints.md} {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  `,
  Button: styled(StyledButton)`
    margin-top: 1rem;
  `,
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountInfo } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);
  const userLogin = localStoreService.getItemLocal(USER_LOGIN);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // taiKhoan: "dvhoang",
      // hoTen: "hoangDHV",
      // matKhau: "DVJPas@123",
      // email: "dvhoang@gmail.com",
      // soDt: "0123456789",
      taiKhoan: accountInfo.taiKhoan,
      hoTen: accountInfo.hoTen,
      matKhau: accountInfo.matKhau,
      email: accountInfo.email,
      soDT: accountInfo.soDT,
      maNhom: accountInfo.maNhom,
    },
    validationSchema: Yup.object().shape({
      matKhau: Yup.string()
        .required("Please input your password")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Password must be at least 8 characters and contain least one number, one uppercase, one lowercase character."
        ),
      soDT: Yup.string()
        .matches(/^[0-9]+$/, "Phone numbers can only be numbers")
        .required("Please input your phone number")
        .min(10, "Phone number must be at least 10 numbers")
        .max(10, "Phone number must be at most 10 numbers"),
      hoTen: Yup.string().required("Please input your name"),
    }),
    onSubmit: async (values) => {
      console.log("🚀 ~ values:", values);
      const user = { ...UserModel };
      user.taiKhoan = values.taiKhoan;
      user.matKhau = values.matKhau;
      user.email = values.email;
      user.soDT = values.soDT;
      user.hoTen = values.hoTen;
      user.maNhom = GROUP_ID_USER;
      user.maLoaiNguoiDung = userLogin.maLoaiNguoiDung;
      try {
        await dispatch(updateUserInfo(user)).unwrap;
        message.success("Update successful");
        navigate("/");
      } catch (error) {
        console.log("🚀 ~ error:", error);
        message.error("Updata failed");
      }
    },
  });
  useEffect(() => {
    document.title = `Profile`;
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading());
        await dispatch(getUserInfo()).unwrap();
        dispatch(unSetLoading());
      } catch (error) {
        console.log("🚀 ~ error:", error);
        dispatch(unSetLoading());
      }
    };
    fetchData();
  }, [dispatch]);
  if (!localStoreService.getItemLocal(USER_LOGIN)) {
    return <Navigate to="/"></Navigate>;
  }
  const renderForm = () => (
    <FormStyles.Form onSubmitCapture={formik.handleSubmit}>
      <FormStyles.Heading>User Information</FormStyles.Heading>
      <AntdFormItem label="Username">
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          value={formik.values.taiKhoan}
          disabled
        />
      </AntdFormItem>
      <AntdFormItem label="Name">
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          value={formik.values.hoTen}
          onBlur={formik.handleBlur}
        />
        {formik.errors.hoTen && formik.touched.hoTen ? (
          <div className="error">{formik.errors.hoTen}</div>
        ) : null}
      </AntdFormItem>
      <AntdFormItem label="Password">
        <Input.Password
          name="matKhau"
          onChange={formik.handleChange}
          value={formik.values.matKhau}
          onBlur={formik.handleBlur}
        />
        {formik.errors.matKhau && formik.touched.matKhau ? (
          <div className="error">{formik.errors.matKhau}</div>
        ) : null}
      </AntdFormItem>
      <AntdFormItem label="Email">
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          disabled
        />
      </AntdFormItem>
      <AntdFormItem label="Phone">
        <Input
          name="soDT"
          onChange={formik.handleChange}
          value={formik.values.soDT}
          onBlur={formik.handleBlur}
        />
        {formik.errors.soDT && formik.touched.soDT ? (
          <div className="error">{formik.errors.soDT}</div>
        ) : null}
      </AntdFormItem>
      <FormStyles.Button type="submit" textTransform="uppercase">
        Update
      </FormStyles.Button>
    </FormStyles.Form>
  );
  if (!localStoreService.getItemLocal(USER_LOGIN)) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <ProfilePageStyles.Background>
      {loading ? (
        <LoadingPageV3>
          <Heading>Please wait a moment</Heading>
          <ProfilePageStyles.Text center>
            Due to the large number of users, the system is trying to find your
            information.
          </ProfilePageStyles.Text>
        </LoadingPageV3>
      ) : (
        <ProfilePageStyles.Box>
          <User.Box>
            <ProfilePageStyles.Col>
              <User.Avatar src="images/avatar.jpg" alt="avatar" />
              <User.Name>Potato CINEMA</User.Name>
            </ProfilePageStyles.Col>
          </User.Box>
          <ProfilePageStyles.Center>{renderForm()}</ProfilePageStyles.Center>
        </ProfilePageStyles.Box>
      )}
    </ProfilePageStyles.Background>
  );
};

export default withErrorBoundary(ProfilePage, {
  FallbackComponent: ErrorComponent,
});
