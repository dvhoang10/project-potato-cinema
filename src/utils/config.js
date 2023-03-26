export const AUTHOR = "dvhoang10";
export const AUTHOR_URL = "https://github.com/dvhoang10";
export const POTATO = "Potato Cinema";
export const CYBERSOFT_URL = process.env.REACT_APP_CYBERSOFT_URL;
export const CYBERSOFT_TOKEN = process.env.REACT_APP_CYBERSOFT_TOKEN;
export const USER_LOGIN = "USER_LOGIN";
export const USER_TOKEN = "USER_ACCESS_TOKEN";
export const GROUP_ID_USER = process.env.REACT_APP_GROUP_ID_USER;
export const GROUP_ID_MOVIE = process.env.REACT_APP_GROUP_ID_MOVIE;
export const TMDB_URL = "https://api.themoviedb.org/3/";
export const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
export const TMDB_IMG_PERSON_URL =
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
export const TMDB_IMG_POSTER_URL =
  "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
export const NavBarLink = [
  {
    navLink: true,
    path: "/coming-soon",
    name: "Coming Soon",
  },
  {
    navLink: true,
    path: "/now-showing",
    name: "Now Showing",
  },
  // {
  //   navLink: true,
  //   path: "/news",
  //   name: "News",
  // },
  {
    navLink: true,
    path: "/people",
    name: "People",
  },
];
export const NavAdminLink = [
  {
    type: "movie",
    link: [
      {
        path: "/admin",
        name: "Manage movies",
      },
      {
        path: "/admin/movie/add-new",
        name: "Add movie",
      },
    ],
  },
  // {
  //   type: "news",
  //   link: [
  //     {
  //       path: "/admin/news",
  //       name: "Manage news",
  //     },
  //     {
  //       path: "/admin/news/add",
  //       name: "Add news",
  //     },
  //   ],
  // },
  {
    type: "user",
    link: [
      {
        path: "/admin/user",
        name: "Manage users",
      },
    ],
  },
];
