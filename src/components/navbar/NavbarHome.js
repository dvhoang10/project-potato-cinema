import ErrorComponent from "components/common/ErrorComponent";
import React, { useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavBarLink, POTATO, USER_LOGIN, USER_TOKEN } from "utils/config";
import { localStoreService } from "services/localStoreService";
import { useDispatch } from "react-redux";
import { userLogout } from "store/user/userSlice";
import {
  DropdownBlock,
  DropdownBox,
  DropdownContent,
  DropdownLink,
  NavbarBarIcon,
  NavbarBox,
  NavbarCloseIcon,
  NavbarIcon,
  NavbarLink,
  NavbarList,
  NavbarLogo,
  NavbarLogobar,
  NavbarWrapper,
} from "./NavbarStyled";

const NavStyles = {
  Box: styled(NavbarBox)`
    background-color: rgba(0, 0, 0, 0.75);
  `,
  Wrapper: styled(NavbarWrapper)`
    max-width: 1440px;
    @media (max-width: 900px) {
      width: 100%;
      flex-direction: column;
    }
  `,
  LogoBar: styled(NavbarLogobar)``,
  Logo: styled(NavbarLogo)`
    color: var(--color-red);
  `,
  Icon: styled(NavbarIcon)``,
  BarIcon: styled(NavbarBarIcon)``,
  CloseIcon: styled(NavbarCloseIcon)``,
  List: styled(NavbarList)`
    @media (max-width: 900px) {
      display: block;
      background-color: rgba(0, 0, 0, 0.75);
      transition: all 0.8s ease-in-out 0s;
      overflow: hidden;
    }
  `,
  Link: styled(NavbarLink)`
    @media (max-width: 1024px) {
      padding: 0.75rem;
    }
    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      background-color: black;
      :hover {
        transform: unset;
      }
    }
  `,
};

const Dropdown = {
  Box: styled(DropdownBox)`
    background-color: var(--color-red);
    padding: 0 1rem;
    max-width: 140px;
    @media (max-width: 900px) {
      max-width: unset;
      border-radius: 0;
      padding: 0;
      background-color: unset;
    }
  `,
  Block: styled(DropdownBlock)`
    width: 100%;
    padding: 0.5rem 0;
    display: inline-block;
    cursor: pointer;
    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
    }
  `,
  Content: styled(DropdownContent)`
    box-shadow: var(--shadow-dark);
    width: 150px;
    background-color: var(--color-bg);
    @media (max-width: 900px) {
      width: 100%;
      padding: 0;
    }
  `,
  Link: styled(DropdownLink)`
    color: var(--text-light);
    border-radius: 8px;
    :hover {
      color: var(--text-light);
      border: 1px solid var(--light);
    }
    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      width: 100%;
      margin: 0;
      background-color: black;
      :hover {
        border: 0;
      }
    }
  `,
};

const DropdownUser = styled(Dropdown.Block)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const DropdownLogOut = styled(Dropdown.Link)`
  display: inline-block;
  cursor: pointer;
  :hover {
    border: 0;
    background-color: var(--color-red);
  }
  @media (max-width: 900px) {
    background-color: var(--color-red);
    border-radius: 0;
  }
`;

const NavbarHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBar, setShowBar] = useState(false);
  const user = localStoreService.getItemLocal(USER_LOGIN);
  function renderLink({ navLink = false, path, name }) {
    if (navLink) {
      return (
        <NavStyles.Link to={path} key={name} onClick={() => setShowBar(false)}>
          {name}
        </NavStyles.Link>
      );
    }
    return (
      <Dropdown.Link to={path} onClick={() => setShowBar(false)}>
        {name}
      </Dropdown.Link>
    );
  }
  function isLogin() {
    if (Object.keys(user).length === 0) {
      return (
        <Dropdown.Box>
          <Dropdown.Block>Login / Register</Dropdown.Block>
          <Dropdown.Content className="dropdown-content">
            {renderLink({ path: "/login", name: "Login" })}
            {renderLink({ path: "/signup", name: "Sign Up" })}
          </Dropdown.Content>
        </Dropdown.Box>
      );
    }
    return (
      <Dropdown.Box>
        <DropdownUser>{user.taiKhoan}</DropdownUser>
        <Dropdown.Content className="dropdown-content">
          {renderLink({ path: "/profile", name: "Profile" })}
          {renderLink({ path: "/booking-history", name: "Booking History" })}
          {user.maLoaiNguoiDung === "QuanTri" ? (
            <>{renderLink({ path: "/admin", name: "Dashboard" })}</>
          ) : (
            <></>
          )}
          <DropdownLogOut
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(USER_TOKEN);
              dispatch(userLogout());
              navigate("/");
              setShowBar(false);
            }}
          >
            Log Out
          </DropdownLogOut>
        </Dropdown.Content>
      </Dropdown.Box>
    );
  }
  return (
    <NavStyles.Box>
      <NavStyles.Wrapper>
        <NavStyles.LogoBar>
          <Link to="/" onClick={() => setShowBar(false)}>
            <NavStyles.Logo className="logo">{POTATO}</NavStyles.Logo>
          </Link>
          <NavStyles.Icon onClick={() => setShowBar(!showBar)}>
            {showBar ? <NavStyles.CloseIcon /> : <NavStyles.BarIcon />}
          </NavStyles.Icon>
        </NavStyles.LogoBar>
        <NavStyles.List style={showBar ? { top: "75px" } : {}}>
          {NavBarLink.map((link) => renderLink(link))}
          {isLogin()}
        </NavStyles.List>
      </NavStyles.Wrapper>
    </NavStyles.Box>
  );
};

export default withErrorBoundary(NavbarHome, {
  FallbackComponent: ErrorComponent,
});
