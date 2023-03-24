import NavbarAdmin from "components/navbar/NavbarAdmin";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const { userLogin } = useSelector((state) => state.user);
  console.log("🚀 ~ userLogin:", userLogin);
  document.body.style.background =
    "linear-gradient(to right top,#7e79a8,#736f9e,#686694,#5d5c8b,#525381,#544f7f,#574c7d,#5a487a,#6c487c,#7e487b,#8e4778,#9e4773)";
  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <>
      <NavbarAdmin></NavbarAdmin>
    </>
  );
}
