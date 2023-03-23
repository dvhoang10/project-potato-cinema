import ErrorComponent from "components/common/ErrorComponent";
import LoadingPageV1 from "components/loading/v1/LoadingPageV1";
import Pagination from "components/pagination/Pagination";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { setLoading, unSetLoading } from "store/loading/loadingSlice";
import { getActorsList } from "store/people/peopleHandlers";
import styled from "styled-components";
import { CardHeight, Container, GridCardV1, Heading } from "styles/Styles";
import { TMDB_IMG_PERSON_URL } from "utils/config";

const PeoplePageStyles = {
  Card: styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    background-color: var(--color-bg);
  `,
  Box: styled(CardHeight)``,
  Image: styled.img`
    display: block;
    object-fit: cover;
    width: 100%;
    transition: all 0.5s ease-in-out;
    animation: fade-in 1.5s ease-in-out 0s both;
  `,
  Content: styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 3rem;
    background: var(--color-bg);
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: ${(props) => props.display};
  `,
  Name: styled.span`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-transform: uppercase;
    font-weight: 600;
    color: #fff;
  `,
};

const PeoplePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const page = parseInt(params.page) || 1;
  const { actor, totalPages } = useSelector((state) => state.people);
  const { loading } = useSelector((state) => state.loading);
  useEffect(() => {
    document.title = "Popular people";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading());
        await dispatch(getActorsList(page)).unwrap();
        window.scroll(0, 0);
        dispatch(unSetLoading());
      } catch (error) {
        console.log("🚀 ~ error:", error);
        navigate("/people");
        dispatch(unSetLoading());
      }
    };
    fetchData();
  }, [dispatch, page, navigate]);
  return (
    <Container>
      <Heading>Popular people</Heading>
      {loading ? (
        <LoadingPageV1 grid></LoadingPageV1>
      ) : (
        <>
          <GridCardV1 grid>
            {actor.map((person, index) => (
              <Link
                to={`/person/${person.id}`}
                target="_parent"
                key={index}
                id="person"
              >
                <PeoplePageStyles.Card>
                  <LazyLoadComponent>
                    <PeoplePageStyles.Box>
                      <PeoplePageStyles.Image
                        src={
                          person.profile_path === null && person.gender === 1
                            ? "images/female"
                            : person.profile_path === null
                            ? "images/male"
                            : `${TMDB_IMG_PERSON_URL}${person.profile_path}`
                        }
                        alt={person.name}
                      />
                      <PeoplePageStyles.Content
                        id="person-name"
                        display={
                          person.profile_path === null ? "hidden" : "visible"
                        }
                      >
                        <PeoplePageStyles.Name>
                          {person.name}
                        </PeoplePageStyles.Name>
                      </PeoplePageStyles.Content>
                    </PeoplePageStyles.Box>
                  </LazyLoadComponent>
                </PeoplePageStyles.Card>
              </Link>
            ))}
          </GridCardV1>
          <Pagination page={page} totalPages={totalPages}></Pagination>
        </>
      )}
    </Container>
  );
};

export default withErrorBoundary(PeoplePage, {
  FallbackComponent: ErrorComponent,
});
