import { DatePicker, InputNumber, message, Select } from "antd";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cinemaService } from "services/cybersoftServices/cinemaServices";
import { addShowTime, getCinemasList } from "store/cinema/cinemaHandlers";
import { getMovieInfo } from "store/movie/movieHandlers";
import { AntdFormItem } from "styles/AntDesign";
import { FormMovieStyles } from "styles/FormMovieStyles";
import { Container, Heading, StyledButton } from "styles/Styles";

const MovieAddShowtime = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const { movieInfo } = useSelector((state) => state.movie);
  const { cinemaList } = useSelector((state) => state.cinema);
  const [cinema, setCinema] = useState({
    branches: [],
    number: [],
  });
  console.log("🚀 ~ cinema:", cinema);
  const getBranches = async (id) => {
    try {
      const result = await cinemaService.branchList(id);
      setCinema({
        ...cinema,
        branches: result.data.content,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      maPhim: param.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 80000,
    },
    onSubmit: async (values) => {
      const cloneValues = {
        ...values,
        maRap: values.maRap.toString(),
      };
      console.log("🚀 ~ cloneValues:", cloneValues);
      try {
        await dispatch(addShowTime(values)).unwrap();
        message.success("Add successful");
        navigate("/admin");
      } catch (error) {
        console.log("🚀 ~ error:", error);
        message.error("Add failed");
      }
    },
  });
  const handleCinemaBranches = (value) => {
    setCinema({ ...cinema, number: cinema.branches[value].danhSachRap });
  };
  const handleCinemaNumber = (value) => formik.setFieldValue("maRap", value);
  const handleDate = (value) =>
    formik.setFieldValue(
      "ngayChieuGioChieu",
      dayjs(value).format("DD/MM/YYYY HH:mm:ss")
    );
  const handlePrice = (value) => formik.setFieldValue("giaVe", value);
  useEffect(() => {
    document.title = "Add showtime";
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMovieInfo(param.id)).unwrap();
        await dispatch(getCinemasList()).unwrap();
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Heading admin>Add Showtime</Heading>
      <h3
        style={{ fontSize: "2rem", fontWeight: "normal", textAlign: "center" }}
      >
        {movieInfo.tenPhim}
      </h3>
      <FormMovieStyles.Form onFinish={formik.handleSubmit}>
        <AntdFormItem
          admin="true"
          label="Cinema"
          name="cinema"
          rules={[{ required: true, message: "Please choose at least one" }]}
        >
          <Select
            options={cinemaList.map((cinema) => ({
              label: cinema.tenHeThongRap,
              value: cinema.maHeThongRap,
            }))}
            onChange={getBranches}
            placeholder="Cinema Name"
          />
        </AntdFormItem>
        <AntdFormItem
          admin="true"
          label="Branches"
          name="branch"
          rules={[{ required: true, message: "Please choose at least one" }]}
        >
          <Select
            options={cinema.branches.map((branch, index) => ({
              label: branch.tenCumRap,
              value: index,
            }))}
            onChange={handleCinemaBranches}
            placeholder="Branches"
          />
        </AntdFormItem>
        <AntdFormItem
          admin="true"
          label="Number"
          name="number"
          rules={[{ required: true, message: "Please choose at least one" }]}
        >
          <Select
            options={cinema.number?.map((cinema) => ({
              label: cinema.tenRap,
              value: cinema.maRap,
            }))}
            onChange={handleCinemaNumber}
            placeholder="Number"
          />
        </AntdFormItem>
        <AntdFormItem
          admin="true"
          label="Time"
          name="time"
          rules={[{ required: true, message: "Please input a valid date" }]}
        >
          <DatePicker
            format="DD/MM/YYYY hh:mm A"
            showTime
            onChange={handleDate}
          />
        </AntdFormItem>
        <AntdFormItem
          admin="true"
          label="Price"
          name="price"
          initialValue={formik.values.giaVe}
          rules={[
            {
              required: true,
              message: "Please input available price",
            },
            {
              type: "number",
              min: 75000,
              max: 200000,
              message: "Price must be from 75.000 to 200.000",
            },
          ]}
        >
          <InputNumber onChange={handlePrice} />
        </AntdFormItem>
        <AntdFormItem>
          <StyledButton textTransform="uppercase" type="submit">
            Add Showtime
          </StyledButton>
        </AntdFormItem>
      </FormMovieStyles.Form>
    </Container>
  );
};

export default MovieAddShowtime;
