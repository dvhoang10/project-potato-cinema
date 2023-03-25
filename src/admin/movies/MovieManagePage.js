import ErrorComponent from "components/common/ErrorComponent";
import React, { useEffect } from "react";
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
import { HiStar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const MoviesManageStyles = {
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

const NameMovieStyles = {
  Link: styled(Link)`
    display: block;
    &:hover {
      color: var(--dark);
    }
  `,
  Flex: styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
  `,
  Image: styled.img`
    width: 100px;
    height: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  `,
  Info: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    h3 {
      font-weight: 700;
      color: var(--dark);
      font-size: 1rem;
    }
    p {
      font-size: 0.875rem;
      font-style: italic;
    }
    .rate {
      display: flex;
      align-items: center;
      column-gap: 0.25rem;
      svg {
      }
    }
  `,
};

const ActionStyles = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MoviesManagePage = () => {
  const dispatch = useDispatch();
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
      title: "Name",
      dataIndex: ["tenPhim", "hinhAnh", "ngayKhoiChieu", "danhGia"],
      render: (text, movie) => {
        return (
          <NameMovieStyles.Link to={`/movie/${movie.maPhim}`} target="_blank">
            <NameMovieStyles.Flex>
              <NameMovieStyles.Image
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = "https://picsum.photos/id/1021/100/150";
                }}
              />
              <NameMovieStyles.Info>
                <h3>{movie.tenPhim}</h3>
                <p>
                  Release: {dayjs(movie.ngayKhoiChieu).format("DD/MM/YYYY")}{" "}
                </p>
                <span className="rate">
                  <span>{movie.danhGia}</span>
                  <HiStar></HiStar>
                </span>
              </NameMovieStyles.Info>
            </NameMovieStyles.Flex>
          </NameMovieStyles.Link>
        );
      },
      width: "25%",
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
      width: "8%",
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
            <Link key={1} to={`/admin/movie/update/${movie.maPhim}`}>
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
      await dispatch(
        getMoviesList({ groupId: GROUP_ID_MOVIE, name: value })
      ).unwrap();
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
  function onChange() {
    window.scroll(0, 0);
  }
  return (
    <Container>
      <Heading admin>Manage Movies</Heading>
      <MoviesManageStyles.Flex>
        <AntdSearch
          placeholder="Search movie..."
          enterButton={<AiOutlineSearch />}
          size="large"
          onSearch={onSearch}
        ></AntdSearch>
        <MoviesManageStyles.Add>
          <Link to="/admin/movie/add-new">
            <FaPlus />
          </Link>
        </MoviesManageStyles.Add>
      </MoviesManageStyles.Flex>
      <AntdTable
        columns={moviesColumnTable}
        dataSource={movieList}
        rowKey="maPhim"
        scroll={{ x: 1300 }}
        onChange={onChange}
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
