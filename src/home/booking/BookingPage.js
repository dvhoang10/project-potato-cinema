import { Form, Input, message } from "antd";
import ErrorComponent from "components/common/ErrorComponent";
import LoadingPageV3 from "components/loading/v3/LoadingPageV3";
import _ from "lodash";
import { BookingModel } from "models/models";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { localStoreService } from "services/localStoreService";
import { getMovieShowtime, postBookingInfo } from "store/cinema/cinemaHandlers";
import { setLoading, unSetLoading } from "store/loading/loadingSlice";
import { AntdForm, AntdFormItem } from "styles/AntDesign";
import { BookingStyles } from "styles/BookingStyles";
import { Container } from "styles/Styles";
import Swal from "sweetalert2";
import { USER_LOGIN } from "utils/config";
import Seat from "./Seat";

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { userLogin } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);
  const { movieShowtime, seat, seatIsBooking } = useSelector(
    (state) => state.cinema
  );
  useEffect(() => {
    document.title = "Booking ticket";
  }, []);
  useEffect(() => {
    const fecthData = async () => {
      try {
        dispatch(setLoading());
        await dispatch(getMovieShowtime(params.id)).unwrap();
        dispatch(unSetLoading());
      } catch (error) {
        console.log("🚀 ~ error:", error);
        dispatch(unSetLoading());
      }
    };
    fecthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleBooking = async () => {
    const bookingInfo = { ...BookingModel };
    bookingInfo.maLichChieu = params.id;
    bookingInfo.danhSachVe = seatIsBooking;
    bookingInfo.taiKhoanNguoiDung = userLogin.taiKhoan;
    if (bookingInfo.danhSachVe.length === 0) {
      return Swal.fire({
        title: "Please choose at least one seat",
        icon: "warning",
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: "#423F57",
        timer: 2000,
        timerProgressBar: true,
      });
    }
    try {
      await dispatch(postBookingInfo(bookingInfo)).unwrap();
      message.success("Booking successfull");
      navigate("/booking-history");
    } catch (error) {
      console.log("🚀 ~ error:", error);
      message.error("Booking failed");
    }
  };
  const renderSideBar = () => (
    <section className="side-bar">
      <div className="center">
        <img src={movieShowtime.hinhAnh} alt={movieShowtime.tenPhim} />
      </div>
      <h4 className="cinema">{movieShowtime.tenCumRap}</h4>
      <p className="showtime">
        {movieShowtime.ngayChieu} - {movieShowtime.gioChieu} -{" "}
        {movieShowtime.tenRap}
      </p>
      <div className="user-info">
        <h4>User Information</h4>
        <AntdForm className="form">
          <AntdFormItem label="Name">
            <Input value={userLogin.hoTen} disabled />
          </AntdFormItem>
          <AntdFormItem label="Email">
            <Input value={userLogin.email} disabled />
          </AntdFormItem>
          <AntdFormItem label="Phone">
            <Input value={userLogin.soDT} disabled />
          </AntdFormItem>
        </AntdForm>
      </div>
      <div className="side-bar-money">
        <p className="text-4xl">
          $
          {seatIsBooking
            .reduce((cost, seat) => {
              return (cost += seat.giaVe);
            }, 0)
            .toLocaleString()}{" "}
        </p>
      </div>
      <div className="seats">
        {_.sortBy(seatIsBooking, ["maGhe"]).map((seat, index) => (
          <span className="pending" key={index}>
            {seat.stt}
          </span>
        ))}
      </div>
      <button onClick={handleBooking} className="get-ticket">
        GET TICKET
      </button>
    </section>
  );
  const renderGetTicketFixed = () => (
    <section className="fixed">
      <div className="get-ticket-flex">
        <div className="money center">
          <p>
            $
            {seatIsBooking
              .reduce((cost, seat) => {
                return (cost += seat.giaVe);
              }, 0)
              .toLocaleString()}{" "}
          </p>
        </div>
        <div className="get-ticket center">
          <button onClick={handleBooking}>GET TICKET</button>
        </div>
      </div>
    </section>
  );
  if (!localStoreService.getItemLocal(USER_LOGIN)) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <>
      {loading ? (
        <LoadingPageV3></LoadingPageV3>
      ) : (
        <Container>
          <BookingStyles>
            <section className="grid">
              <Seat
                userLogin={userLogin}
                movieShowtime={movieShowtime}
                seat={seat}
                seatIsBooking={seatIsBooking}
              ></Seat>
              {renderSideBar()}
            </section>
            {renderGetTicketFixed()}
          </BookingStyles>
        </Container>
      )}
    </>
  );
};

export default withErrorBoundary(BookingPage, {
  FallbackComponent: ErrorComponent,
});
