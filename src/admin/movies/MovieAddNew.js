import { DatePicker, Input, InputNumber, message, Switch } from "antd";
import ErrorComponent from "components/common/ErrorComponent";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AntdFormItem } from "styles/AntDesign";
import { Container, Heading, StyledButton } from "styles/Styles";
import { FiFilePlus } from "react-icons/fi";
import {
  FormMovieStyles,
  ImageUploadButton,
  ImageUploadStyles,
} from "styles/FormMovieStyles";
import { addMovie } from "store/movie/movieHandlers";
import { GROUP_ID_MOVIE } from "utils/config";

const MovieAddNew = () => {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: null,
    },
    validationSchema: Yup.object().shape({
      tenPhim: Yup.string().required("Please input movie title"),
      trailer: Yup.string().required("Please input url trailer from youtube"),
      moTa: Yup.string().required("Please input movie overview"),
      ngayKhoiChieu: Yup.string().required("Please chose a day"),
      hinhAnh: Yup.mixed().required("Please upload movie poster"),
    }),
    onSubmit: async (values) => {
      console.log("🚀 ~ values:", values);
      values.maNhom = GROUP_ID_MOVIE;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else formData.append("File", values.hinhAnh, values.hinhAnh.name);
      }
      try {
        await dispatch(addMovie(formData)).unwrap();
        message.success("Successful");
        navigate("/admin");
      } catch (error) {
        console.log("🚀 ~ error:", error);
        message.error("Failed");
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
  useEffect(() => {
    document.title = "Add new movie";
  }, []);
  return (
    <Container>
      <Heading admin>Add New Movie</Heading>
      <FormMovieStyles.Form onFinish={formik.handleSubmit}>
        <AntdFormItem label="Name">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter movie's name"
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
              {!imgSrc && (
                <ImageUploadStyles.NoImg>
                  <img src="/images/img-upload.png" alt="" />
                  <p>Choose photo</p>
                </ImageUploadStyles.NoImg>
              )}
              {imgSrc && (
                <>
                  <ImageUploadStyles.Img src={imgSrc}></ImageUploadStyles.Img>
                  <ImageUploadButton>
                    <FiFilePlus style={{ fontSize: "2rem" }} />
                  </ImageUploadButton>
                </>
              )}
            </ImageUploadStyles.Label>
            {formik.touched.hinhAnh && formik.errors.hinhAnh ? (
              <div className="error">{formik.errors.hinhAnh}</div>
            ) : null}
          </AntdFormItem>
          <div>
            <AntdFormItem label="Release Date">
              <DatePicker
                onChange={handleChangeDatePicker}
                format={dateFormat}
              />
              {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
                <div className="error">{formik.errors.ngayKhoiChieu}</div>
              ) : null}
            </AntdFormItem>
            <AntdFormItem label="Now Showing">
              <Switch
                name="dangChieu"
                onChange={handleChangeSwitch("dangChieu")}
              />
            </AntdFormItem>
            <AntdFormItem label="Comming Soon">
              <Switch
                name="sapChieu"
                onChange={handleChangeSwitch("sapChieu")}
              />
            </AntdFormItem>
            <AntdFormItem label="Hot">
              <Switch name="hot" onChange={handleChangeSwitch("hot")} />
            </AntdFormItem>
            <AntdFormItem label="Rate">
              <InputNumber
                onChange={handleChangeSwitch("danhGia")}
                min={1}
                max={10}
              />
            </AntdFormItem>
          </div>
        </FormMovieStyles.Grid>
        <AntdFormItem>
          <StyledButton type="submit" textTransform="uppercase">
            Add Movie
          </StyledButton>
        </AntdFormItem>
      </FormMovieStyles.Form>
    </Container>
  );
};

export default withErrorBoundary(MovieAddNew, {
  FallbackComponent: ErrorComponent,
});
