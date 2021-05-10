import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../app/userSlice";
import { createPopper } from "@popperjs/core";

const Dropdown = ({ color, hidden }) => {
  const { user } = useSelector((state) => state.user);
  const dispach = useDispatch();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-100");
  //hidden
  let hiddenAvatar;
  hidden === "lg:hidden" ? (hiddenAvatar = hidden) : (hiddenAvatar = "");

  const logOut = () => {
    dispach(clearUser(null));
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="relative inline-flex align-middle w-full">
          <button
            type="button"
            className="profile_dropDown"
            ref={btnDropdownRef}
            onClick={() => {
              dropdownPopoverShow
                ? closeDropdownPopover()
                : openDropdownPopover();
            }}
          >
            <img
              src={
                user.image
                  ? user.image
                  : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
              }
              alt="logo"
              className={
                "mx-auto object-cover rounded-full h-10 w-10 ml-8 " +
                hiddenAvatar
              }
            />
          </button>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              (color === "white" ? "bg-white " : bgColor + " ") +
              "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
            }
            style={{ minWidth: "16rem" }}
          >
            <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
              <NavLink
                to={"/profile"}
                className="navbar__link block w-full whitespace-nowrap "
                onClick={() => closeDropdownPopover()}
              >
                {"Mi Perfil"}
              </NavLink>
            </div>
            <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-90" />
            {user.isAdmin && (
              <>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/edit-organization"
                    className="navbar__link block w-full whitespace-nowrap   "
                  >
                    Editar Organizacion
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/editHome"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Editar Home Page
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/activities"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Actividades
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/activity-form/"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Crear Actividad
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/news"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Novedades
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/news-form/"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Crear Novedad
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/testimonials"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Testimonios
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/testimony-form/"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Crear Testimonios
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/category"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Categoria
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/category-form/"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Crear Categoria
                  </Link>
                </div>
                <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
                  <Link
                    to="/backoffice/contacts"
                    className="navbar__link block w-full whitespace-nowrap "
                  >
                    Contactos
                  </Link>
                </div>
              </>
            )}
            {user.isAdmin ? (
              <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-90" />
            ) : null}
            <div className=" hover:bg-gray-200 transition duration-300 ease-in-out">
              <NavLink
                to={"/"}
                className="navbar__link block w-full whitespace-nowrap "
                onClick={(e) => logOut(e)}
              >
                {"Salir"}
              </NavLink>
            </div>
          </div>
          {dropdownPopoverShow ? (
            <button
              className="fixed z-0 top-0 right-0 left-0 bottom-0 w-full h-full bg-red-200 opacity-0"
              onClick={() => closeDropdownPopover()}
            ></button>
          ) : null}
        </div>
      </div>
    </>
  );
};

function Header() {
  //using hardcoded pass until api returns logo
  const [displayMenu, setDisplayMenu] = useState(false);
  const [logo, setLogo] = useState("./images/assets/logo-somos-mas.png");
  const { user } = useSelector((state) => state.user);
  const dispach = useDispatch();

  const getLogo = async () => {
    try {
      const LogoRes = await axios.get(
        `${process.env.REACT_APP_API}/organizations/1/public`
      );
      const logo = LogoRes.data.data.image;
      setLogo(logo);
    } catch (error) {}
  };

  useEffect(() => {
    getLogo();
  }, []);

  const links = [
    {
      to: "/",
      name: "Inicio",
    },
    {
      to: "/about",
      name: "Nosotros",
    },
    {
      to: "/activities",
      name: "Actividades",
    },
    {
      to: "/news",
      name: "Novedades",
    },
    {
      to: "/testimonial",
      name: "Testimonios",
    },
    {
      to: "/contact",
      name: "Contacto",
    },
  ];

  const logIn = {
    to: "/signin",
    name: "Ingresar",
  };

  return (
    <div>
      <nav className="navbar p-6">
        <button
          onClick={() => setDisplayMenu(!displayMenu)}
          className="lg:hidden border-0 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {!displayMenu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class=" h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          ) : (
            ""
          )}
          {displayMenu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            ""
          )}
        </button>
        <Link to="/">
          <div className="navbar__logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        {!user ? (
          <NavLink exact to={logIn.to} className="navbar__link">
            <button
              type="button"
              class="lg:hidden py-2 px-4  bg-blue-500 hover:bg-blue-700 focus:ring-blue-600 focus:ring-offset-blue-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg w-22 mr-8"
            >
              Ingresar
            </button>
          </NavLink>
        ) : null}
        {user ? <Dropdown color="gray" hidden="lg:hidden" /> : null}

        <ul className="hidden lg:flex items-center">
          {links.map((link, i) => (
            <li
              key={`link ${i}`}
              className="navbar__item transform hover:scale-110 transition duration-500 ease-in-out"
            >
              {link.to === "/" ? (
                <NavLink
                  exact
                  to={link.to}
                  className="navbar__link "
                  activeClassName="navbar__active "
                >
                  {link.name}
                </NavLink>
              ) : (
                <NavLink
                  to={link.to}
                  className="navbar__link"
                  activeClassName="navbar__active"
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
          {!user ? (
            <li>
              <NavLink exact to={logIn.to} className="navbar__link">
                <button
                  type="button"
                  class="py-2 px-4  bg-blue-500 hover:bg-blue-700 focus:ring-blue-600 focus:ring-offset-blue-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg w-22 mr-8"
                >
                  Ingresar
                </button>
              </NavLink>
            </li>
          ) : null}
          {user ? (
            <li>
              <Dropdown color="gray" />
            </li>
          ) : null}
        </ul>
      </nav>
      {displayMenu ? (
        <div onClick={() => setDisplayMenu(!displayMenu)}>
          <div className="bg-gray-100 py-2">
            <ul className="flex flex-col ">
              {links.map((link, i) => (
                <li key={`link ${i}`} className="py-2  ">
                  {link.to === "/" ? (
                    <NavLink
                      exact
                      to={link.to}
                      className="navbar__link"
                      activeClassName="navbar__active"
                    >
                      {link.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={link.to}
                      className="navbar__link"
                      activeClassName="navbar__active"
                    >
                      {link.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
