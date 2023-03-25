import styled from "styled-components";
import { AntdForm } from "./AntDesign";
import { Breakpoints } from "./Breakpoint";

export const FormMovieStyles = {
  Form: styled(AntdForm)`
    margin: 1rem auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(16.5px);
    -webkit-backdrop-filter: blur(16.5px);
    border-radius: 1rem;
    label {
      width: 200px;
    }
    .error {
      color: var(--color-red);
    }
    .ant-form-item:last-child {
      margin-bottom: 0;
    }
  `,
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 2rem;
    margin-bottom: 1rem;
    ${Breakpoints.sm} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  `,
};

export const ImageUploadStyles = {
  Label: styled.label`
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #dddd;
    border-width: 1px;
    border-style: dashed;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
  `,
  Input: styled.input`
    display: none !important; ;
  `,
  NoImg: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    pointer-events: none;
    img {
      max-width: 80px;
      margin-bottom: 20px;
    }
    p {
      font-weight: 700;
      color: var(--dark);
    }
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
};

export const ImageUploadButton = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  width: 4rem;
  height: 4rem;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 100rem;
  opacity: 0;
  background-color: var(--dark);
  cursor: pointer;
  ${ImageUploadStyles.Label}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
