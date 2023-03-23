import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import PropTypes from "prop-types";

const PaginationStyles = {
  Box: styled.div`
    display: flex;
    justify-content: flex-end;
    column-gap: 1.5rem;
    align-items: center;
    margin: 1.5rem 0;
  `,
  Flex: styled.div`
    display: flex;
  `,
  Button: styled.div`
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    && svg {
      height: 2rem;
      width: 2rem;
      margin-left: 0.5rem;
    }
  `,
};

const Pagination = ({ page, totalPages }) => {
  const navigate = useNavigate();
  return (
    <PaginationStyles.Box>
      <p>
        Page{" "}
        <span style={{ color: "var(--color-red)", fontWeight: "600" }}>
          {page}
        </span>
        {` of ${totalPages}`}
      </p>
      <PaginationStyles.Flex>
        {page > 1 ? (
          <PaginationStyles.Button
            onClick={() => navigate(`/people/${page - 1}`)}
          >
            <FaChevronCircleLeft />
          </PaginationStyles.Button>
        ) : null}
        {page < totalPages ? (
          <PaginationStyles.Button
            onClick={() => navigate(`/people/${page + 1}`)}
          >
            <FaChevronCircleRight />
          </PaginationStyles.Button>
        ) : null}
      </PaginationStyles.Flex>
    </PaginationStyles.Box>
  );
};

Pagination.prototype = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
};

export default withErrorBoundary(Pagination, {
  FallbackComponent: ErrorComponent,
});
