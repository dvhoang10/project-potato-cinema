import { Button, Tag } from "antd";
import ErrorComponent from "components/common/ErrorComponent";
import { UserModel } from "models/models";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsersList } from "store/user/userHandlers";
import styled from "styled-components";
import { AntDesignModal, AntdSearch, AntdTable } from "styles/AntDesign";
import { Container, Heading } from "styles/Styles";
import Swal from "sweetalert2";
import { GROUP_ID_USER } from "utils/config";
import UserUpdate from "./UserUpdate";

const UsersManageStyles = {
  Flex: styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 1rem;
  `,
  Add: styled.div`
    display: flex;
    place-content: center;
    height: 40px;
    width: 48px;
    justify-content: center;
    align-items: center;
    border-color: var(--blue-magenta);
    background: var(--blue-magenta);
    border-radius: 0.25rem;
    cursor: pointer;
  `,
};

const ActionStyles = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const UserManagePage = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    visible: false,
    user: { ...UserModel },
  });
  const { usersList } = useSelector((state) => state.user);
  const fetchData = async () => {
    try {
      await dispatch(getUsersList({ groupId: GROUP_ID_USER })).unwrap();
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Delete successful",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Failure",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const setUserInfo = (user) => {
    const userInfo = { ...UserModel };
    userInfo.taiKhoan = user.taiKhoan;
    userInfo.email = user.email;
    userInfo.hoTen = user.hoTen;
    userInfo.soDT = user.soDT;
    userInfo.matKhau = user.matKhau;
    userInfo.maLoaiNguoiDung = user.maLoaiNguoiDung;
    return setModal({
      visible: true,
      user: userInfo,
    });
  };
  const columns = [
    {
      title: "ID",
      fixed: "left",
      render: (record) => usersList.indexOf(record) + 1,
      width: "5%",
    },
    {
      title: "Account",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let AccountA = a.taiKhoan.toLowerCase().trim();
        let AccountB = b.taiKhoan.toLowerCase().trim();
        return AccountA.localeCompare(AccountB);
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Full name",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let FullNameA = a.hoTen.toLowerCase().trim();
        let FullNameB = b.hoTen.toLowerCase().trim();
        return FullNameA.localeCompare(FullNameB);
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        let EmailA = a.email.toLowerCase().trim();
        let EmailB = b.email.toLowerCase().trim();
        return EmailA.localeCompare(EmailB);
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Type",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (type) => (
        <>
          {type === "KhachHang" ? (
            <Tag color="geekblue">Customer</Tag>
          ) : (
            <Tag color="magenta">Admin</Tag>
          )}
        </>
      ),
      filters: [
        { text: "Admin", value: "QuanTri" },
        { text: "Customer", value: "KhachHang" },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.includes(value),
      width: "15%",
    },
    {
      title: "Action",
      width: "10%",
      render: (user) => {
        return (
          <ActionStyles>
            <span style={{ cursor: "pointer" }} key={1}>
              <AiOutlineEdit
                style={{
                  color: "#3b586f",
                  marginRight: "0.25rem",
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  setUserInfo(user);
                }}
              />
            </span>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              onClick={() => {
                Swal.fire({
                  title: `Do you want to delete ${user.taiKhoan}`,
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#423F57",
                  cancelButtonColor: "#ff5757",
                  confirmButtonText: "Yes, delete it!",
                  timer: "3000",
                  timerProgressBar: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDelete(user.taiKhoan);
                  }
                });
              }}
            >
              <AiOutlineDelete
                style={{ color: "#ff5757", fontSize: "1.5rem" }}
              />
            </span>
          </ActionStyles>
        );
      },
    },
  ];
  const onSearch = async (value) => {
    try {
      await dispatch(
        getUsersList({ groupId: GROUP_ID_USER, keyword: value })
      ).unwrap();
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };
  useEffect(() => {
    document.title = "Manage Users";
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Heading admin>Manage Users</Heading>
      <UsersManageStyles.Flex>
        <AntdSearch
          placeholder="Search user..."
          enterButton={<AiOutlineSearch />}
          size="large"
          onSearch={onSearch}
        ></AntdSearch>
      </UsersManageStyles.Flex>
      <AntdTable
        columns={columns}
        dataSource={usersList}
        rowKey="taiKhoan"
        scroll={{ x: 1300 }}
        pagination={{ pageSize: 25, showSizeChanger: false }}
      />
      <AntDesignModal
        title={`Edit User`}
        centered
        visible={modal.visible}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModal({
                ...modal,
                visible: false,
              });
            }}
          >
            Return
          </Button>,
        ]}
      >
        <UserUpdate
          userInfo={modal.user}
          hideModal={() => {
            setModal({
              ...modal,
              visible: false,
            });
          }}
        ></UserUpdate>
      </AntDesignModal>
    </Container>
  );
};

export default withErrorBoundary(UserManagePage, {
  FallbackComponent: ErrorComponent,
});
