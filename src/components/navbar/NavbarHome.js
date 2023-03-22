import ErrorComponent from "components/common/ErrorComponent";
import React, { useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavBarLink, POTATO, USER_LOGIN, USER_TOKEN } from "utils/config";
import { FaBars, FaPlus } from "react-icons/fa";
import { localStoreService } from "services/localStoreService";

const NavStyles = {
  Box: styled.header`
    background-color: rgba(0, 0, 0, 0.75);
    padding: 0.5rem 1rem;
    @media (max-width: 900px) {
      padding: 0.5rem 2rem;
    }
  `,
  Wrapper: styled.div`
    max-width: 1440px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 90%;
    @media (max-width: 900px) {
      width: 100%;
      flex-direction: column;
    }
  `,
  LogoBar: styled.div`
    @media (max-width: 900px) {
      width: 100%;
      padding: 0.25rem 0rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  Logo: styled.span`
    font-size: 2.5rem;
    font-family: "Changa", sans-serif;
    text-transform: uppercase;
    color: var(--color-red);
    font-weight: 700;
    text-decoration: none;
    @media (max-width: 1024px) {
      font-size: 2.2rem;
    }
    @media (max-width: 400px) {
      font-size: 1.8rem;
    }
    @media (max-width: 300px) {
      font-size: 1.6rem;
    }
  `,
  Icon: styled.div`
    font-size: 2.5rem;
    display: none;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    @media (max-width: 900px) {
      display: flex;
    }
  `,
  BarIcon: styled(FaBars)`
    animation: fade-in 0.5s ease-in-out;
  `,
  CloseIcon: styled(FaPlus)`
    transform: rotate(45deg);
    animation: close 0.5s ease-in-out;
  `,
  List: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 900px) {
      display: block;
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
      background-color: rgba(0, 0, 0, 0.75);
      position: absolute;
      top: -100%;
      z-index: 999;
      transition: all 0.8s ease-in-out 0s;
      overflow: hidden;
    }
  `,
  Link: styled(NavLink)`
    display: block;
    font-size: 1rem;
    line-height: 1.75rem;
    padding: 0.5rem 1.25rem;
    margin-right: 0.25rem;
    color: var(--text-light);
    transition: all 0.5s ease-in-out;
    font-family: "Poppins", sans-serif;
    :hover {
      color: var(--text-light);
      transform: scale(1.1);
    }
    @media (max-width: 1024px) {
      padding: 0.75rem;
    }
    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      width: 100%;
      margin: 0;
      border-bottom: var(--border);
      border-radius: 0;
      background-color: black;
      :hover {
        transform: unset;
      }
    }
  `,
};

const Dropdown = {
  Box: styled.div`
    position: relative;
    user-select: none;
    transition: all 0.5s ease-in-out;
    background-color: var(--color-red);
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.75rem;
    font-family: "Poppins", sans-serif;
    padding: 0 1rem;
    max-width: 140px;
    :hover .dropdown-content {
      display: block;
    }
    @media (max-width: 900px) {
      width: 100%;
      max-width: unset;
      border-radius: 0;
      padding: 0;
      background-color: unset;
    }
  `,
  Block: styled.span`
    width: 100%;
    padding: 0.5rem 0;
    display: inline-block;
    cursor: pointer;
    @media (max-width: 900px) {
      background-color: var(--color-primary);
      border: none;
      padding: 1rem 1.5rem;
    }
  `,
  Content: styled.div`
    display: none;
    position: absolute;
    box-shadow: var(--shadow-dark);
    z-index: 100;
    border-radius: 8px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 0.5rem;
    width: 150px;
    background-color: var(--color-bg);
    @media (max-width: 900px) {
      display: block;
      position: unset;
      box-shadow: none;
      border-radius: 0;
      transform: translateX(0);
      width: 100%;
      padding: 0;
    }
  `,
  Link: styled(Link)`
    display: block;
    font-size: 1rem;
    line-height: 1.75rem;
    padding: 0.5rem 0;
    margin: 0.5rem;
    color: var(--text-light);
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    width: 100%;
    margin: 0.5rem 0;
    text-align: center;
    transition: all 1s ease-in-out;
    :hover {
      color: var(--text-light);
      border: 1px solid var(--light);
    }
    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      width: 100%;
      margin: 0;
      text-align: left;
      border-radius: 0;
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
  }
`;

const NavbarHome = () => {
  const navigate = useNavigate();
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
          {renderLink({ path: "/history", name: "Booking History" })}
          {user.maLoaiNguoiDung === "QuanTri" ? (
            <>{renderLink({ path: "/admin", name: "Dashboard" })}</>
          ) : (
            <></>
          )}
          <DropdownLogOut
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(USER_TOKEN);
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
