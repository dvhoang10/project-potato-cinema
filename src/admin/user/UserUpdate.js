import { Input, message, Select } from "antd";
import ErrorComponent from "components/common/ErrorComponent";
import { useFormik } from "formik";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import {
  getUsersList,
  updateUserInfo,
  updateUserInfoWithAdmin,
} from "store/user/userHandlers";
import { AntdForm, AntdFormItem } from "styles/AntDesign";
import { StyledButton } from "styles/Styles";
import Swal from "sweetalert2";
import { GROUP_ID_USER } from "utils/config";

const UserUpdate = ({ userInfo, hideModal }) => {
  const dispatch = useDispatch();
  const { Option } = Select;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userInfo.taiKhoan,
      email: userInfo.email,
      hoTen: userInfo.hoTen,
      soDT: userInfo.soDT,
      matKhau: userInfo.matKhau,
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
      maNhom: userInfo.maNhom,
    },
    onSubmit: async (values) => {
      try {
        await dispatch(updateUserInfoWithAdmin(values)).unwrap();
        hideModal();
        Swal.fire({
          icon: "success",
          title: "Update successful",
          showConfirmButton: false,
          timer: 1500,
        });
        await dispatch(getUsersList({ groupId: GROUP_ID_USER })).unwrap();
      } catch (error) {
        console.log("🚀 ~ error:", error);
        Swal.fire({
          icon: "error",
          title: "Failure",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });
  const initialValues = [
    { name: ["taiKhoan"], value: formik.values.taiKhoan },
    { name: ["email"], value: formik.values.email },
    { name: ["soDT"], value: formik.values.soDT },
    { name: ["hoTen"], value: formik.values.hoTen },
    { name: ["matKhau"], value: formik.values.matKhau },
    {
      name: ["maLoaiNguoiDung"],
      value: formik.values.maLoaiNguoiDung,
    },
  ];
  const handleUserType = (value) =>
    formik.setFieldValue("maLoaiNguoiDung", value);
  return (
    <AntdForm
      labelCol={{ span: 6 }}
      onFinish={formik.handleSubmit}
      fields={initialValues}
    >
      <AntdFormItem name="taiKhoan" label="Username">
        <Input disabled />
      </AntdFormItem>
      <AntdFormItem
        name="hoTen"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your name",
          },
        ]}
      >
        <Input onChange={formik.handleChange} />
      </AntdFormItem>
      <AntdFormItem
        name="matKhau"
        label="Password"
        rules={[
          { required: true, message: "Please input your password" },
          {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message:
              "Password must be at least 8 characters and contain least one number, one uppercase, one lowercase character",
          },
        ]}
      >
        <Input.Password onChange={formik.handleChange} />
      </AntdFormItem>
      <AntdFormItem name="email" label="Email">
        <Input disabled />
      </AntdFormItem>
      <AntdFormItem
        label="Phone"
        name="soDT"
        rules={[
          { required: true, message: "Please input your password!" },
          {
            pattern: /^[0-9]{10}$/,
            message: "Phone numbers can only be numbers with 10 digits",
          },
        ]}
      >
        <Input onChange={formik.handleChange} />
      </AntdFormItem>
      <AntdFormItem
        label="User Type"
        name="maLoaiNguoiDung"
        rules={[{ required: true, message: "Please choose user type" }]}
      >
        <Select onChange={handleUserType}>
          <Option value="KhachHang">Customer</Option>
          <Option value="QuanTri">Admin</Option>
        </Select>
      </AntdFormItem>
      <AntdFormItem>
        <StyledButton type="submit">Update</StyledButton>
      </AntdFormItem>
    </AntdForm>
  );
};

export default withErrorBoundary(UserUpdate, {
  FallbackComponent: ErrorComponent,
});
