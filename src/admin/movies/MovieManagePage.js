import ErrorComponent from "components/common/ErrorComponent";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getMoviesList } from "store/movie/movieHandlers";
import styled from "styled-components";
import { AntdSearch, AntdTable } from "styles/AntDesign";
import { Container, Heading } from "styles/Styles";
import { GROUP_ID_MOVIE } from "utils/config";
import {
  AiOutlineSearch,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import Swal from "sweetalert2";

const MoviesMangeStyles = {
  Flex: styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 1rem;
  `,
  Add: styled.div`
    display: flex;
    place-content: center;
    height: 40px;
    width: 48px;
    justify-content: center;
    align-items: center;
    border-color: var(--blue-magenta);
    background: var(--blue-magenta);
    border-radius: 0.25rem;
    cursor: pointer;
  `,
};

const ActionStyles = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MoviesManagePage = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { movieList } = useSelector((state) => state.movie);
  const fetchData = async () => {
    try {
      await dispatch(getMoviesList({ groupId: GROUP_ID_MOVIE })).unwrap();
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteMovie(id)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Delete successful",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Failure",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const moviesColumnTable = [
    {
      title: "ID",
      dataIndex: "maPhim",
      width: "8%",
      fixed: true,
      sorter: {
        compare: (a, b) => a.maPhim - b.maPhim,
      },
    },
    {
      title: "Poster",
      dataIndex: "hinhAnh",
      render: (text, movie) => {
        return (
          <Link to={`/movie/${movie.biDanh}-${movie.maPhim}`} target="_blank">
            <img
              src={movie.hinhAnh}
              alt={movie.tenPhim}
              width={100}
              height={150}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = "https://picsum.photos/id/1021/100/150";
              }}
            />
          </Link>
        );
      },
      width: "12%",
    },
    {
      title: "Title",
      dataIndex: "tenPhim",
      width: "20%",
    },
    {
      title: "Overview",
      dataIndex: "moTa",
      render: (text, movie) => {
        return (
          <>
            {movie.moTa.length > 200
              ? movie.moTa.substr(0, 200) + " ..."
              : movie.moTa}
          </>
        );
      },
      width: "30%",
    },
    {
      title: "Status",
      width: "10%",
      render: (movie) => (
        <>
          {movie.dangChieu ? (
            <Tag color="cyan">NOW PLAYING</Tag>
          ) : (
            <Tag color="magenta">COMING SOON</Tag>
          )}
        </>
      ),
      filters: [
        { text: "NOW PLAYING", value: true },
        { text: "COMING SOON", value: false },
      ],
      onFilter: (value, record) => record.dangChieu === value,
    },
    {
      title: "Action",
      dataIndex: "maPhim",
      render: (text, movie) => {
        return (
          <ActionStyles>
            <Link key={1} to={`/admin/movie/edit/${movie.maPhim}`}>
              <AiOutlineEdit
                style={{
                  color: "#3b586f",
                  fontSize: "1.5rem",
                  marginRight: "0.25rem",
                }}
              />
            </Link>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              onClick={() => {
                Swal.fire({
                  title: `Do you want to delete ${movie.tenPhim}`,
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#423F57",
                  cancelButtonColor: "#ff5757",
                  confirmButtonText: "Yes, delete it!",
                  timer: "3000",
                  timerProgressBar: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDelete(movie.maPhim);
                  }
                });
              }}
            >
              <AiOutlineDelete
                style={{
                  color: "#ff5757",
                  fontSize: "1.5rem",
                  marginRight: "0.25rem",
                }}
              />
            </span>

            <Link key={3} to={`/admin/movie/showtime/${movie.maPhim}`}>
              <AiOutlineCalendar
                style={{ color: "#6d4d6e", fontSize: "1.5rem" }}
              />
            </Link>
          </ActionStyles>
        );
      },
      width: "10%",
    },
  ];
  const onSearch = async (value) => {
    try {
      await dispatch(getMoviesList({ groupId: GROUP_ID_MOVIE, name: value }))
        .unwrap;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };
  useEffect(() => {
    document.title = "Manage Movies";
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Heading admin>Manage Movies</Heading>
      <MoviesMangeStyles.Flex>
        <AntdSearch
          placeholder="Search movie..."
          enterButton={<AiOutlineSearch />}
          size="large"
          onSearch={onSearch}
        ></AntdSearch>
        <MoviesMangeStyles.Add onClick={() => setVisible(true)}>
          <FaPlus />
        </MoviesMangeStyles.Add>
      </MoviesMangeStyles.Flex>
      <AntdTable
        columns={moviesColumnTable}
        dataSource={movieList}
        rowKey="maPhim"
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
        }}
      ></AntdTable>
    </Container>
  );
};

export default withErrorBoundary(MoviesManagePage, {
  FallbackComponent: ErrorComponent,
});
