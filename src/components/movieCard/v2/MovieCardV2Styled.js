import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  margin-top: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: var(--color-bg);
  :first-child {
    margin-top: 0;
  }
  @media (min-width: 1024px) {
    display: ${(props) => (props.display ? props.display : "none")};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  height: auto;
  max-height: 141px;
  animation: fade-in 1s ease-in-out 0s both;
  @media (min-width: 1024px) {
    max-height: 204px;
  }
`;

export const Poster = styled.img`
  width: 94px;
  height: 141px;
  background-color: var(--color-bg);
  @media (min-width: 1024px) {
    width: 136px;
    height: 204px;
  }
`;

export const Content = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  row-gap: 1rem;
  flex-direction: column;
`;

export const Name = styled.h2`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1rem;
  white-space: normal;
  color: var(--color-red);
  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;

export const ReleaseDate = styled.span`
  margin-left: 0;
  white-space: nowrap;
  font-style: italic;
  font-size: 0.75rem;
  @media (min-width: 1024px) {
    font-size: 0.875rem;
  }
`;

export const Overview = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.875rem;
  @media (min-width: 1024px) {
    -webkit-line-clamp: 3;
  }
`;
