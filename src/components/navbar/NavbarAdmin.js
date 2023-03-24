import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavAdminLink, POTATO, USER_LOGIN, USER_TOKEN } from "utils/config";
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
import { useDispatch } from "react-redux";
import { userLogout } from "store/user/userSlice";

const NavAdminStyles = {
  Box: styled(NavbarBox)`
    background-color: transparent;
    transition: all 0.5s ease-in-out 0.25s;
    @media (max-width: 900px) {
      background-color: var(--color-nav);
    }
  `,
  Wrapper: styled(NavbarWrapper)``,
  LogoBar: styled(NavbarLogobar)``,
  Logo: styled(NavbarLogo)`
    color: var(--text-light);
  `,
  Icon: styled(NavbarIcon)``,
  BarIcon: styled(NavbarBarIcon)`
    animation: fade-in 0.5s ease-in-out;
  `,
  CloseIcon: styled(NavbarCloseIcon)``,
  Link: styled(NavbarLink)`
    border-radius: 4px;
  `,
  List: styled(NavbarList)`
    @media (max-width: 900px) {
      transition: all 1s ease-in-out;
      overflow: hidden;
    }
  `,
};

const Dropdown = {
  Box: styled(DropdownBox)`
    background-color: var(--deep-peach);
    margin: 0 0.5rem;
    padding: 0.5rem 1.25rem;
    max-width: 140px;
    @media (max-width: 900px) {
      max-width: unset;
      margin: 0;
      padding: 0;
      background-color: var(--color-bg);
    }
  `,
  Block: styled(DropdownBlock)`
    text-transform: capitalize;
    transition: all 0.5s ease-in-out;
    color: var(--dark);
    @media (max-width: 900px) {
      display: none;
    }
  `,
  Content: styled(DropdownContent)`
    background-color: var(--deep-peach);
    box-shadow: var(--shadow-light);
    width: max-content;
    top: 50px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: -8px;
      width: 100%;
      height: 8px;
    }
    @media (max-width: 900px) {
      background-color: var(--color-nav);
      box-shadow: unset;
      width: 100%;
      padding: 0;
      overflow: hidden;
      &::before {
        display: none;
      }
    }
  `,
  Link: styled(DropdownLink)`
    display: inline-block;
    color: var(--dark);
    text-transform: capitalize;
    border-bottom: 1px solid var(--light);
    :last-child {
      border-bottom: none;
    }
    @media (max-width: 900px) {
      padding: 1rem 3rem;
      border: var(--border);
      border-radius: 0;
      color: var(--text-light);
      :hover {
        color: var(--text-light);
        background-color: var(--rgba-blue-magenta);
      }
    }
  `,
  LogOut: styled.div`
    font-size: 1rem;
    line-height: 1.75rem;
    padding: 0.5rem 1.25rem;
    margin: 0.5rem;
    color: var(--text-light);
    display: block;
    border-radius: 8px;
    background-color: var(--color-red);
    cursor: pointer;
    @media (max-width: 900px) {
      padding: 1rem 0rem;
      padding-left: 6rem;
      width: 100%;
      margin: 0;
      border-radius: 0;
    }
  `,
};

const NavbarAdmin = () => {
  const [showBar, setShowBar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const renderLink = () =>
    NavAdminLink.map((item) => (
      <Dropdown.Box key={item.type}>
        <Dropdown.Block>{item.type}</Dropdown.Block>
        <Dropdown.Content className="dropdown-content">
          {item.link.map((item) => (
            <Dropdown.Link
              key={item.name}
              to={item.path}
              onClick={() => setShowBar(false)}
            >
              {item.name}
            </Dropdown.Link>
          ))}
        </Dropdown.Content>
      </Dropdown.Box>
    ));
  const navbar = () => (
    <NavAdminStyles.List
      style={
        showBar
          ? { top: "75px", left: "0", right: "0" }
          : { left: "0", right: "0" }
      }
    >
      {renderLink()}
      <Dropdown.LogOut
        onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(USER_TOKEN);
          dispatch(userLogout());
          navigate("/");
          setShowBar(false);
        }}
      >
        Log Out
      </Dropdown.LogOut>
    </NavAdminStyles.List>
  );
  return (
    <NavAdminStyles.Box>
      <NavAdminStyles.Wrapper>
        <NavAdminStyles.LogoBar>
          <Link to="/" onClick={() => setShowBar(false)}>
            <NavAdminStyles.Logo className="logo">{POTATO}</NavAdminStyles.Logo>
          </Link>
          <NavAdminStyles.Icon onClick={() => setShowBar(!showBar)}>
            {showBar ? (
              <NavAdminStyles.CloseIcon />
            ) : (
              <NavAdminStyles.BarIcon />
            )}
          </NavAdminStyles.Icon>
        </NavAdminStyles.LogoBar>
        {navbar()}
      </NavAdminStyles.Wrapper>
    </NavAdminStyles.Box>
  );
};

export default NavbarAdmin;
