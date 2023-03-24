import ErrorComponent from "components/common/ErrorComponent";
import LoadingPageV3 from "components/loading/v3/LoadingPageV3";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { localStoreService } from "services/localStoreService";
import { getUserInfo } from "store/user/userHandlers";
import styled from "styled-components";
import { Container, Heading } from "styles/Styles";
import { USER_LOGIN } from "utils/config";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";
import { Breakpoints } from "styles/Breakpoint";
import { setLoading, unSetLoading } from "store/loading/loadingSlice";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const BookingPageStyles = {
  Box: styled.div`
    width: 100%;
    height: 100%;
    z-index: 2;
    animation: fade-in 1s ease-in-out 0s both;
  `,
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    gap: 1rem;
  `,
  Card: styled.div`
    margin-bottom: 1rem;
    border-radius: 8px;
    padding: 1rem;
    background: var(--color-bg);
  `,
  MovieName: styled.p`
    font-weight: 700;
    color: var(--color-red);
  `,
  Flex: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
  Text: styled.p`
    margin-right: 0.25rem;
    text-align: ${(props) => (props.center ? "center" : "left")};
    ${Breakpoints.sm} {
      height: auto;
      font-size: 0.875rem;
    }
  `,
};

const BookingHistoryPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const { ticket } = useSelector((state) => state.user);
  const userLogin = localStoreService.getItemLocal(USER_LOGIN);
  useEffect(() => {
    document.title = "Booking history";
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading());
        await dispatch(getUserInfo(userLogin.taiKhoan)).unwrap();
        dispatch(unSetLoading());
      } catch (error) {
        console.log("🚀 ~ error:", error);
        dispatch(unSetLoading());
      }
    };
    fetchData();
  }, [dispatch]);
  if (!localStoreService.getItemLocal(USER_LOGIN)) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <>
      {loading ? (
        <LoadingPageV3>
          <Container>
            <Heading>Please wait a moment</Heading>
            <BookingPageStyles.Text center>
              Due to the large number of users, the system is trying to find
              your information.
            </BookingPageStyles.Text>
          </Container>
        </LoadingPageV3>
      ) : (
        <BookingPageStyles.Box>
          <Container>
            <Heading>Booking History</Heading>
            <BookingPageStyles.Grid>
              {ticket.slice(0, 20).map((ticket) => (
                <BookingPageStyles.Card key={ticket.maVe}>
                  <div>
                    <BookingPageStyles.MovieName>
                      {ticket.tenPhim}
                    </BookingPageStyles.MovieName>
                    <BookingPageStyles.Text>
                      {ticket.danhSachGhe[0].tenHeThongRap} |{" "}
                      {dayjs(ticket.ngayDat).format("lll")}
                    </BookingPageStyles.Text>
                  </div>
                  <BookingPageStyles.Flex>
                    {ticket.danhSachGhe.map((seat, index) => (
                      <BookingPageStyles.Text key={index}>
                        [{seat.tenGhe}]
                      </BookingPageStyles.Text>
                    ))}
                  </BookingPageStyles.Flex>
                </BookingPageStyles.Card>
              ))}
            </BookingPageStyles.Grid>
          </Container>
        </BookingPageStyles.Box>
      )}
    </>
  );
};

export default withErrorBoundary(BookingHistoryPage, {
  FallbackComponent: ErrorComponent,
});
