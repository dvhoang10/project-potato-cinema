import ErrorComponent from "components/common/ErrorComponent";
import React, { useEffect, useRef, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdPerson, MdClear } from "react-icons/md";
import { setSeatIsBooking } from "store/cinema/cinemaSlice";

const Seat = ({ userLogin, movieShowtime, seat, seatIsBooking }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(300);
  let intervalRef = useRef(0);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (count > 0) {
        setCount((prev) => prev - 1);
      }
      if (count === 0) {
        Swal.fire({
          title: "Time's up",
          text: "Do you want to book again?",
          icon: "question",
          showConfirmButton: true,
          confirmButtonText: "Yes",
          showCancelButton: true,
          confirmButtonColor: "#423F57",
          cancelButtonColor: "#ff5757",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else {
            navigate("/");
          }
        });
        clearInterval(intervalRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  });
  const renderHeader = () => (
    <div className="flex">
      <h2 className="title">{movieShowtime.tenPhim}</h2>
      <div className="count-down">
        <span>HOLD TIME</span>
        <div className="flex-count">
          <span className="pending">0{Math.floor(count / 60)}</span>
          <span className="pending">{String(count % 60).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
  const renderSeat = () =>
    seat.map((seat, index) => {
      const isVip = seat.loaiGhe === "Vip" ? "vip" : "";
      const isBooked =
        seat.daDat && seat.taiKhoanNguoiDat !== userLogin.taiKhoan
          ? "booked other"
          : seat.daDat && seat.taiKhoanNguoiDat === userLogin.taiKhoan
          ? "booked user"
          : "";
      const indexSeat = seatIsBooking.findIndex(
        (seatIsBooking) => seatIsBooking.maGhe === seat.maGhe
      );
      const isBooking = indexSeat !== -1 ? "booking" : "";
      return (
        <button
          className={`seat ${isVip} ${isBooked} ${isBooking}`}
          disabled={seat.daDat}
          key={index}
          onClick={() => {
            dispatch(setSeatIsBooking({ seatIsSelected: seat }));
          }}
        >
          {seat.daDat ? (
            seat.taiKhoanNguoiDat === userLogin.taiKhoan ? (
              <MdPerson />
            ) : (
              <MdClear />
            )
          ) : (
            seat.tenGhe
          )}
        </button>
      );
    });

  const renderSeatType = () => (
    <section className="seat-type">
      <div className="item">
        <button className="seat"></button>
        <span>Regular</span>
      </div>
      <div className="item">
        <button className="seat vip"></button>
        <span>VIP</span>
      </div>
      <div className="item">
        <button className="seat booking"></button>
        <span>Your Select</span>
      </div>
      <div className="item">
        <button className="seat booked other">
          <MdClear />
        </button>
        <span>Booked by Other</span>
      </div>
      <div className="item">
        <button className="seat booked user">
          <MdPerson />
        </button>
        <span>Booked by You</span>
      </div>
    </section>
  );
  return (
    <div style={{ overflowX: "hidden" }}>
      {renderHeader()}
      <section className="screen">
        <div className="borderScreen"></div>
        <div className="backgroundScreen">
          <p>SCREEN</p>
        </div>
      </section>
      <section className="grid-seat">{renderSeat()}</section>
      {renderSeatType()}
    </div>
  );
};

Seat.prototype = {
  userLogin: PropTypes.object,
  movieShowtime: PropTypes.object,
  seat: PropTypes.object,
  seatIsBooking: PropTypes.object,
};

export default withErrorBoundary(Seat, {
  FallbackComponent: ErrorComponent,
});
