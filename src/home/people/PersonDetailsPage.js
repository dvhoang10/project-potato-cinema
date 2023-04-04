import ErrorComponent from "components/common/ErrorComponent";
import LoadingPageV3 from "components/loading/v3/LoadingPageV3";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading, unSetLoading } from "store/loading/loadingSlice";
import { getDetailsPerson } from "store/people/peopleHandlers";
import styled from "styled-components";
import { Breakpoints } from "styles/Breakpoint";
import { Container, SectionTitle } from "styles/Styles";
import { TMDB_IMG_PERSON_URL } from "utils/config";
import dayjs from "dayjs";
import MovieCardV3 from "components/movieCard/v3/MovieCardV3";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const PersonStyles = {
  Grid: styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    padding: 1rem 0;
    ${Breakpoints.lg} {
      grid-template-columns: 200px 1fr;
      gap: 1rem;
    }
    ${Breakpoints.sm} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  `,
  Flex: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  `,
  Image: styled.img`
    width: 300px;
    height: 450px;
    border-radius: 0.5rem;
    background-color: var(--rgba-blue-magenta);
    ${Breakpoints.lg} {
      width: 200px;
      height: 300px;
    }
    ${Breakpoints.sm} {
      width: 50vw;
      min-height: 75vw;
    }
  `,
};

const Info = {
  Name: styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    display: none;
    color: var(--text-light);
    text-align: center;
    ${Breakpoints.sm} {
      display: block;
      margin-bottom: 1rem;
    }
  `,
  Box: styled.div`
    margin-bottom: 1rem;
  `,
  Text: styled.p`
    ${Breakpoints.sm} {
      font-size: 0.875rem;
    }
  `,
  Strong: styled.strong``,
  AKA: styled.div`
    display: block;
    ${Breakpoints.sm} {
      display: none;
    }
  `,
};

const Bio = {
  Box: styled.div`
    margin-bottom: 2rem;
  `,
  Name: styled.h2`
    font-size: 2.5rem;
    font-weight: 600;
    display: block;
    color: var(--text-light);
    margin-bottom: 1rem;
    ${Breakpoints.sm} {
      display: none;
    }
  `,
  Content: styled.div`
    overscroll-behavior-y: auto;
    overflow-y: auto;
    ${Breakpoints.lg} {
      height: 152px;
      overscroll-behavior-y: auto;
      overflow-y: auto;
    }
    ${Breakpoints.sm} {
      height: auto;
    }
  `,
  Text: styled.p`
    line-height: 1.75rem;
    ${Breakpoints.sm} {
      height: auto;
      font-size: 0.875rem;
    }
  `,
};

const PersonDetailsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { person, acting } = useSelector((state) => state.people);
  const { loading } = useSelector((state) => state.loading);
  useEffect(() => {
    document.title = "People details";
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading());
        await dispatch(getDetailsPerson(params.id)).unwrap();
        dispatch(unSetLoading());
      } catch (error) {
        console.log("🚀 ~ error:", error);
        dispatch(unSetLoading());
      }
    };
    fetchData();
  }, [dispatch, params.id]);
  const renderInfo = () => (
    <>
      <Info.Name>{person.name}</Info.Name>
      <SectionTitle marginBottom>Personal Info</SectionTitle>
      {person.gender === 0 &&
      person.birthday == null &&
      person.also_known_as?.length === 0 &&
      person.place_of_birth == null ? (
        <p>We don't have a personal information for {person.name}</p>
      ) : (
        <>
          {person.gender === 0 ? (
            <></>
          ) : (
            <Info.Box>
              <Info.Text>
                <Info.Strong>Gender</Info.Strong>
              </Info.Text>
              <Info.Text> {person.gender === 1 ? "Female" : "Male"}</Info.Text>
            </Info.Box>
          )}
          {person.birthday == null ? (
            <></>
          ) : (
            <Info.Box>
              <Info.Text>
                <Info.Strong>Birthday</Info.Strong>
              </Info.Text>
              <Info.Text>
                {dayjs(person.birthday).format("ll")} (
                {dayjs(Date.now()).format("YYYY") -
                  dayjs(person.birthday).format("YYYY")}{" "}
                years old)
              </Info.Text>
            </Info.Box>
          )}
          {person.place_of_birth ? (
            <></>
          ) : (
            <Info.Box>
              <Info.Text>
                <Info.Strong>Place of Birthday</Info.Strong>
              </Info.Text>
              <Info.Text>{person.place_of_birth}</Info.Text>
            </Info.Box>
          )}
          {person.also_known_as?.length === 0 ? (
            <></>
          ) : (
            <Info.AKA>
              <Info.Text>
                <Info.Strong>Also Known As</Info.Strong>
              </Info.Text>
              {person.also_known_as.slice(0, 3).map((item, index) => (
                <Info.Text key={index}>{item}</Info.Text>
              ))}
            </Info.AKA>
          )}
        </>
      )}
    </>
  );
  const renderBio = () => (
    <Bio.Box>
      <Bio.Name>{person.name}</Bio.Name>
      <SectionTitle marginBottom>Biography</SectionTitle>
      <Bio.Content>
        {person.biography === "" ? (
          <Bio.Text>We don't have a biography for {person.name}</Bio.Text>
        ) : (
          person.biography
            .split("\n\n")
            .map((text, index) => <Bio.Text key={index}>{text}</Bio.Text>)
        )}
      </Bio.Content>
    </Bio.Box>
  );
  const renderLatestMovie = () => (
    <>
      <SectionTitle w="171px">Latest Movies</SectionTitle>
      {acting
        .filter(
          (movie) =>
            movie.release_date !== "" &&
            dayjs(movie.release_date).format("YYYY") <= dayjs().get("year")
        )
        .sort((a, b) =>
          Date.parse(a.release_date) < Date.parse(b.release_date) ? 1 : -1
        )
        .slice(0, 5)
        .map((movie, i) => (
          <MovieCardV3 movie={movie} key={i} display={"block"} />
        ))}
    </>
  );
  return (
    <>
      {loading ? (
        <LoadingPageV3></LoadingPageV3>
      ) : (
        <Container>
          <PersonStyles.Grid>
            <div>
              <PersonStyles.Flex>
                <PersonStyles.Image
                  src={
                    person.profile_path === null && person.gender === 1
                      ? "/images/female.jpg"
                      : person.profile_path === null
                      ? "/images/male.svg"
                      : `${TMDB_IMG_PERSON_URL}${person.profile_path}`
                  }
                  alt={person.name}
                ></PersonStyles.Image>
              </PersonStyles.Flex>
              {renderInfo()}
            </div>
            <div>
              {renderBio()}
              {renderLatestMovie()}
            </div>
          </PersonStyles.Grid>
        </Container>
      )}
    </>
  );
};

export default withErrorBoundary(PersonDetailsPage, {
  FallbackComponent: ErrorComponent,
});
