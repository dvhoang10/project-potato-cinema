import React from "react";
import styled from "styled-components";
import { Container } from "styles/Styles";

const NotFoundStyles = {
  Container: styled(Container)`
    min-height: 80vh;
    display: flex;
    justify-content: center;
  `,
  Flex: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--light);
  `,
  Box: styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    img {
      display: inline-block;
      max-width: 150px;
      margin-bottom: 1rem;
      @media (min-width: 900px) {
        max-width: 250px;
      }
    }
    h1 {
      margin-bottom: 1rem;
      font-weight: 700;
      font-size: 1.25rem;
      @media (min-width: 900px) {
        font-size: 2rem;
      }
    }
    p {
      max-width: 800px;
    }
  `,
};
const NotFoundPage = () => {
  return (
    <NotFoundStyles.Container>
      <NotFoundStyles.Flex>
        <NotFoundStyles.Box>
          <img src="/images/404.png" alt="" />
          <h1 className="text-4xl mb-10 lg:text-[60px] font-semibold">
            404 - Looks like you're lost.
          </h1>
          <p className="mx-auto mb-10 text-sm leading-loose lg:text-base">
            Maybe this page used to exist or you just spelled something wrong.
            Chances are your spelled something wrong, so can you double check
            the URL?
          </p>
        </NotFoundStyles.Box>
      </NotFoundStyles.Flex>
    </NotFoundStyles.Container>
  );
};

export default NotFoundPage;
