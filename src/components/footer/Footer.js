import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import { AUTHOR, AUTHOR_URL } from "utils/config";

const FooterStyles = {
  Box: styled.footer`
    margin-top: auto;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg);
  `,
  Text: styled.span`
    text-align: center;
    font-size: 1rem;
    line-height: 1.75rem;
  `,
  Link: styled.a`
    color: var(--color-red);
    :hover {
      color: var(--color-red);
    }
  `,
};

const Footer = () => {
  return (
    <FooterStyles.Box>
      <FooterStyles.Text>
        Designed by{" "}
        <FooterStyles.Link href={AUTHOR_URL} target="_blank">
          {AUTHOR}
        </FooterStyles.Link>
      </FooterStyles.Text>
    </FooterStyles.Box>
  );
};

export default withErrorBoundary(Footer, {
  FallbackComponent: ErrorComponent,
});
