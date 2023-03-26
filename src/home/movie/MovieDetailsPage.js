import ErrorComponent from "components/common/ErrorComponent";
import LoadingPageV3 from "components/loading/v3/LoadingPageV3";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading, unSetLoading } from "store/loading/loadingSlice";
import { getMovieDetails } from "store/movie/movieHandlers";
import * as Styles from "styles/MovieDetailStyles";
import dayjs from "dayjs";
import { AiFillStar } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { setStatus } from "store/modelVideo/modalVideoSlice";
import getVideoId from "get-video-id";
import { USER_LOGIN } from "utils/config";
import Swal from "sweetalert2";
import { Container, SectionTitle } from "styles/Styles";
import { AntdTab } from "styles/AntDesign";
import { Tabs } from "antd";
const { TabPane } = Tabs;
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const MovieDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { loading } = useSelector((state) => state.loading);
  const { movieDetails } = useSelector((state) => state.movie);
  console.log("🚀 ~ movieDetails:", movieDetails);
  useEffect(() => {
    document.title = "Movie details";
  }, []);
  useEffect(() => {
    const fecthData = async () => {
      try {
        dispatch(setLoading());
        await dispatch(getMovieDetails(params.id)).unwrap();
        dispatch(unSetLoading());
      } catch (error) {
        console.log("🚀 ~ error:", error);
        dispatch(unSetLoading());
      }
    };
    fecthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderBackdrop = () => (
    <Styles.BackDrop>
      <Styles.Background>
        <Styles.Wrapper>
          <Styles.Content>
            <Styles.PosterWrapper>
              <Styles.PosterWrapperContent>
                <Styles.PosterContent>
                  <Styles.BackgroundGradient />
                  <Styles.Play>
                    <Styles.Button
                      onClick={() => {
                        dispatch(
                          setStatus({
                            isOpen: true,
                            videoId: getVideoId(movieDetails.trailer).id,
                          })
                        );
                      }}
                    >
                      <FaPlay />
                    </Styles.Button>
                  </Styles.Play>
                  <Styles.Poster
                    src={
                      movieDetails.hinhAnh
                        ? movieDetails.hinhAnh
                        : "images/no-image.svg"
                    }
                    alt={movieDetails.tenPhim}
                  ></Styles.Poster>
                </Styles.PosterContent>
              </Styles.PosterWrapperContent>
            </Styles.PosterWrapper>
            <Styles.InfoWrapper>
              <Styles.InfoContent>
                <Styles.Name>
                  {movieDetails.tenPhim} (
                  {dayjs(movieDetails.ngayKhoiChieu).year()})
                </Styles.Name>
                <Styles.Fact>
                  <Styles.Flex>
                    <Styles.Release>
                      {dayjs(movieDetails.ngayKhoiChieu).format("ll")}
                    </Styles.Release>
                    <Styles.Rate>
                      <span>{movieDetails.danhGia}</span>
                      <Styles.RateIcon>
                        <AiFillStar style={{ color: "#FFFF2E" }} />
                      </Styles.RateIcon>
                    </Styles.Rate>
                  </Styles.Flex>
                </Styles.Fact>
                <Styles.Trailer>
                  <Styles.ButtonTrailer
                    onClick={() => {
                      dispatch(
                        setStatus({
                          isOpen: true,
                          videoId: getVideoId(movieDetails.trailer).id,
                        })
                      );
                    }}
                  >
                    <Styles.PlayTrailer>WATCH TRAILER</Styles.PlayTrailer>
                  </Styles.ButtonTrailer>
                </Styles.Trailer>
                <Styles.OverviewContent>
                  <Styles.Overview>{movieDetails.moTa}</Styles.Overview>
                </Styles.OverviewContent>
              </Styles.InfoContent>
            </Styles.InfoWrapper>
          </Styles.Content>
        </Styles.Wrapper>
      </Styles.Background>
    </Styles.BackDrop>
  );
  const isLogin = (link) => {
    if (!localStorage.getItem(USER_LOGIN)) {
      return Swal.fire({
        title: "You must login to continue",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Login",
        timer: "5000",
        timerProgressBar: "true",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          window.scroll(0, 0);
        }
      });
    }
    window.scroll(0, 0);
    return navigate(link);
  };
  const renderShowtime = () => (
    <Styles.Showtime>
      {!movieDetails.dangChieu ? (
        <>
          <Styles.NoShowtime>
            We don't have any showtime for{" "}
            <Styles.MovieName>{movieDetails.tenPhim}</Styles.MovieName>
          </Styles.NoShowtime>
          <Styles.NoShowtime>
            {" "}
            <Styles.MovieName>{movieDetails.title}</Styles.MovieName> will be
            out soon.
          </Styles.NoShowtime>
        </>
      ) : movieDetails.heThongRapChieu === 0 ? (
        <Styles.NoShowtime>
          We don't have any showtime for{" "}
          <Styles.MovieName>{movieDetails.tenPhim}</Styles.MovieName>
        </Styles.NoShowtime>
      ) : (
        <AntdTab tabPosition={"left"}>
          {movieDetails.heThongRapChieu.map((cinema, index) => (
            <TabPane
              tab={
                <Styles.CinemaLogo
                  src={cinema.logo}
                  alt={cinema.tenHeThongRap}
                />
              }
              key={index}
            >
              {cinema.cumRapChieu.map((branch, index) => (
                <Styles.Cinema key={index}>
                  <Styles.CinemaName>{branch.tenCumRap}</Styles.CinemaName>
                  <Styles.CinemaShowtime>
                    {branch.lichChieuPhim
                      .slice(0, 10)
                      .map((showtime, index) => (
                        <Styles.Checkout key={index}>
                          <Styles.ShowtimeLink
                            onClick={() =>
                              isLogin(`/booking/${showtime.maLichChieu}`)
                            }
                          >
                            {dayjs(showtime.ngayChieuGioChieu).format(
                              "hh:mm A"
                            )}
                          </Styles.ShowtimeLink>
                        </Styles.Checkout>
                      ))}
                  </Styles.CinemaShowtime>
                </Styles.Cinema>
              ))}
            </TabPane>
          ))}
        </AntdTab>
      )}
    </Styles.Showtime>
  );
  return (
    <>
      {loading ? (
        <>
          <LoadingPageV3></LoadingPageV3>
        </>
      ) : (
        <div>
          {renderBackdrop()}
          <Container style={{ minHeight: "auto" }}>
            <SectionTitle w="120px">Showtime</SectionTitle>
            {renderShowtime()}
          </Container>
        </div>
      )}
    </>
  );
};

export default withErrorBoundary(MovieDetailsPage, {
  FallbackComponent: ErrorComponent,
});
