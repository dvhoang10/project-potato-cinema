import ErrorComponent from "components/common/ErrorComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieInfo, updateMovieInfo } from "store/movie/movieHandlers";
import { GROUP_ID_MOVIE } from "utils/config";
import { DatePicker, Input, InputNumber, message, Switch } from "antd";
import dayjs from "dayjs";
import { Container, Heading, StyledButton } from "styles/Styles";
import {
  FormMovieStyles,
  ImageUploadButton,
  ImageUploadStyles,
} from "styles/FormMovieStyles";
import { AntdFormItem } from "styles/AntDesign";
import { FiFilePlus } from "react-icons/fi";

const MovieUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    document.title = "Update movie";
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMovieInfo(param.id)).unwrap();
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { movieInfo } = useSelector((state) => state.movie);
  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: movieInfo.maPhim,
      tenPhim: movieInfo.tenPhim,
      trailer: movieInfo.trailer,
      moTa: movieInfo.moTa,
      ngayKhoiChieu: movieInfo.ngayKhoiChieu,
      dangChieu: movieInfo.dangChieu,
      sapChieu: movieInfo.sapChieu,
      hot: movieInfo.hot,
      danhGia: movieInfo.danhGia,
      maNhom: movieInfo.maNhom,
      hinhAnh: null,
    },
    validationSchema: Yup.object().shape({
      tenPhim: Yup.string().required("Please input movie title"),
      trailer: Yup.string().required("Please input url trailer from youtube"),
      moTa: Yup.string().required("Please input movie overview"),
    }),
    onSubmit: async (values) => {
      console.log("🚀 ~ values:", values);
      values.maNhom = GROUP_ID_MOVIE;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      try {
        await dispatch(updateMovieInfo(formData)).unwrap();
        message.success("Update successful");
        navigate("/admin");
      } catch (error) {
        console.log("🚀 ~ error:", error);
        message.error("Update failed");
      }
    },
  });
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = dayjs(value).format(dateFormat);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };
  return (
    <Container>
      <Heading admin>Update Movie</Heading>
      <FormMovieStyles.Form onFinish={formik.handleSubmit}>
        <AntdFormItem label="Name">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter movie's name"
            value={formik.values.tenPhim}
          />
          {formik.touched.tenPhim && formik.errors.tenPhim ? (
            <div className="error">{formik.errors.tenPhim}</div>
          ) : null}
        </AntdFormItem>
        <AntdFormItem label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter movie's trailer"
            value={formik.values.trailer}
          />
          {formik.touched.trailer && formik.errors.trailer ? (
            <div className="error">{formik.errors.trailer}</div>
          ) : null}
        </AntdFormItem>
        <AntdFormItem label="Overview">
          <Input.TextArea
            name="moTa"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={3}
            placeholder="Enter movie's overview"
            value={formik.values.moTa}
          />
          {formik.touched.moTa && formik.errors.moTa ? (
            <div className="error">{formik.errors.moTa}</div>
          ) : null}
        </AntdFormItem>
        <FormMovieStyles.Grid>
          <AntdFormItem label="Upload Poster">
            <ImageUploadStyles.Label>
              <ImageUploadStyles.Input
                type="file"
                name="hinhAnh"
                onChange={handleChangeFile}
              />
              <>
                <ImageUploadStyles.Img
                  src={imgSrc === "" ? movieInfo.hinhAnh : imgSrc}
                ></ImageUploadStyles.Img>
                <ImageUploadButton>
                  <FiFilePlus style={{ fontSize: "2rem" }} />
                </ImageUploadButton>
              </>
            </ImageUploadStyles.Label>
          </AntdFormItem>
          <div>
            <AntdFormItem label="Release Date">
              <DatePicker
                format={dateFormat}
                onChange={handleChangeDatePicker}
              />
            </AntdFormItem>
            <AntdFormItem label="Now Showing">
              <Switch
                name="dangChieu"
                onChange={handleChangeSwitch("dangChieu")}
                checked={formik.values.dangChieu}
              />
            </AntdFormItem>
            <AntdFormItem label="Comming Soon">
              <Switch
                name="sapChieu"
                onChange={handleChangeSwitch("sapChieu")}
                checked={formik.values.sapChieu}
              />
            </AntdFormItem>
            <AntdFormItem label="Hot">
              <Switch
                name="hot"
                onChange={handleChangeSwitch("hot")}
                checked={formik.values.hot}
              />
            </AntdFormItem>
            <AntdFormItem label="Rate">
              <InputNumber
                onChange={handleChangeSwitch("danhGia")}
                min={1}
                max={10}
                value={formik.values.danhGia}
              />
            </AntdFormItem>
          </div>
        </FormMovieStyles.Grid>
        <AntdFormItem>
          <StyledButton type="submit" textTransform="uppercase">
            Update Movie
          </StyledButton>
        </AntdFormItem>
      </FormMovieStyles.Form>
    </Container>
  );
};

export default withErrorBoundary(MovieUpdate, {
  FallbackComponent: ErrorComponent,
});
