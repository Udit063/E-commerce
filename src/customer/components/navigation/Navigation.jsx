// @ts-nocheck
import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Avatar, Button, Link, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { navigation } from "./NavigationData";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../store/Auth/Action";
import { useAuth } from "../../../context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { openAuthModal, handleOpenAuthModal, handleCloseAuthModal } =
    useAuth();

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    handleOpenAuthModal();
  };

  const handleClose = () => {
    handleCloseAuthModal();
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
      // If user is logged in and tries to access login/register, redirect to home
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/");
      }
    }
  }, [auth.user, handleClose, location.pathname, navigate]);

  return (
    <div className="bg-white pb-10">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <div className="px-4 pb-8 pt-6">
                  {navigation.categories.map((category) => (
                    <div key={category.id} className="mb-10 last:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {category.name}
                      </h3>

                      {/* Featured Images */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative">
                            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-90 transition-opacity">
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="mt-2 text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Clothing Items */}
                      {category.sections.map((section) => (
                        <div key={section.id} className="mb-6 last:mb-0">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">
                            {section.name}
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {section.items.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  handleCategoryClick(
                                    category,
                                    section,
                                    item,
                                    () => setOpen(false)
                                  );
                                }}
                                className="text-left text-sm text-gray-600 hover:text-gray-900 py-2 px-2 rounded-md hover:bg-gray-50 transition-colors"
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6"> */}
                {/* {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))} */}
                {/* </div> */}

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {auth.user?.firstName ? (
                    <>
                      {auth.user?.role === "ROLE_ADMIN" && (
                        <div className="flow-root">
                          <button
                            onClick={() => {
                              navigate("/admin");
                              setOpen(false);
                            }}
                            className="-m-2 block p-2 font-medium text-gray-900 w-full text-left"
                          >
                            Dashboard
                          </button>
                        </div>
                      )}
                      <div className="flow-root">
                        <button
                          onClick={() => {
                            navigate("/account/order");
                            setOpen(false);
                          }}
                          className="-m-2 block p-2 font-medium text-gray-900 w-full text-left"
                        >
                          My Orders
                        </button>
                      </div>
                      <div className="flow-root">
                        <button
                          onClick={() => {
                            handleLogout();
                            setOpen(false);
                          }}
                          className="-m-2 block p-2 font-medium text-gray-900 w-full text-left"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flow-root">
                      <button
                        onClick={() => {
                          handleOpen();
                          setOpen(false);
                        }}
                        className="-m-2 block p-2 font-medium text-gray-900 w-full text-left"
                      >
                        Sign in
                      </button>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="/" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0 "
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white z-50">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto relative">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div
                className="ml-4 flex lg:ml-0 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <span className="sr-only">Your Company</span>
                <img
                  src="https://res.cloudinary.com/ddkso1wxi/image/upload/v1675919455/Logo/Copy_of_Zosh_Academy_nblljp.png"
                  alt="Shopwithzosh"
                  className="h-8 w-8 mr-2"
                />
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "text-indigo-600"
                                  : "text-gray-700 hover:text-gray-800",
                                "relative z-10 flex items-center text-sm font-semibold transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute left-0 top-full z-10 mt-2 w-screen max-w-4xl transform px-4">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:grid-cols-2 lg:grid-cols-3">
                                  {/* Featured Images */}
                                  <div className="col-span-2 grid grid-cols-2 gap-4">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative"
                                      >
                                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-90 transition-opacity">
                                          <img
                                            src={item.imageSrc}
                                            alt={item.imageAlt}
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                        <p className="mt-3 text-sm font-semibold text-gray-900">
                                          {item.name}
                                        </p>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Clothing Items */}
                                  <div className="col-span-1">
                                    {category.sections.map((section) => (
                                      <div
                                        key={section.id}
                                        className="mb-6 last:mb-0"
                                      >
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                          {section.name}
                                        </h3>
                                        <ul className="space-y-2">
                                          {section.items.map((item) => (
                                            <li key={item.id}>
                                              <button
                                                onClick={() =>
                                                  handleCategoryClick(
                                                    category,
                                                    section,
                                                    item,
                                                    close
                                                  )
                                                }
                                                className="text-sm text-gray-600 hover:text-gray-900 py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors w-full text-left"
                                              >
                                                {item.name}
                                              </button>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user?.firstName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // onClick={handleUserClick}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth.user.firstName.charAt(0).toUpperCase()}
                      </Avatar>
                      {/* <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleUserClick}
                      >
                        Dashboard
                      </Button> */}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {/* <MenuItem>Profile</MenuItem> */}
                        {auth.user?.role === "ROLE_ADMIN" && (
                          <MenuItem onClick={() => navigate("/admin")}>
                            Dashboard
                          </MenuItem>
                        )}
                        <MenuItem onClick={() => navigate("/account/order")}>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Signin
                    </Button>
                  )}
                </div>

                {/* Search */}
                {/* <div className="flex items-center lg:ml-6">
                  <p className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>

                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </p>
                </div> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Button
                    onClick={() => navigate("/cart")}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {/* <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      2
                    </span> */}
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
