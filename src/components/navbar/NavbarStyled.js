import styled from "styled-components";
import { FaBars, FaPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export const NavbarBox = styled.header`
  padding: 0.5rem 1rem;
  @media (max-width: 900px) {
    padding: 0.5rem 2rem;
  }
`;
export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 90%;
`;
export const NavbarLogobar = styled.div`
  @media (max-width: 900px) {
    width: 100%;
    padding: 0.25rem 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export const NavbarLogo = styled.span`
  font-size: 2.5rem;
  font-family: "Changa", sans-serif;
  text-transform: uppercase;
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
`;
export const NavbarIcon = styled.div`
  transition: all 0.5s ease-in-out;
  font-size: 2.5rem;
  display: none;
  cursor: pointer;
  @media (max-width: 900px) {
    display: flex;
  }
`;
export const NavbarBarIcon = styled(FaBars)`
  animation: fade-in 0.5s ease-in-out;
`;
export const NavbarCloseIcon = styled(FaPlus)`
  transform: rotate(45deg);
  animation: close 0.5s ease-in-out;
`;
export const NavbarLink = styled(NavLink)`
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
  @media (max-width: 900px) {
    width: 100%;
    margin: 0;
    border-bottom: var(--border);
    border-radius: 0;
  }
`;
export const NavbarList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    top: -100%;
    z-index: 999;
  }
`;
export const DropdownBox = styled.div`
  position: relative;
  user-select: none;
  transition: all 0.5s ease-in-out;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.75rem;
  :hover .dropdown-content {
    display: block;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;
export const DropdownBlock = styled.span`
  @media (max-width: 900px) {
    background-color: var(--color-primary);
    border: none;
    padding: 1rem 1.5rem;
  }
`;
export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  z-index: 100;
  border-radius: 8px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 0.5rem;
  @media (max-width: 900px) {
    position: unset;
    box-shadow: none;
    border-radius: 0;
    display: block;
    transform: translateX(0);
  }
`;
export const DropdownLink = styled(Link)`
  display: block;
  font-size: 1rem;
  line-height: 1.75rem;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  width: 100%;
  text-align: center;
  transition: all 1s ease-in-out;
  @media (max-width: 900px) {
    margin: 0;
    text-align: left;
    border-radius: 0;
  }
`;
