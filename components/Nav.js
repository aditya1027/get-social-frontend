import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter, userRouter } from "next/router";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [current, setCurrent] = useState("");
  const router = useRouter();

  useEffect(() => {
    //Checking if client is running
    //to set active link color
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav
      className="nav d-flex justify-content-between"
      style={{
        backgroundColor: "blue",
      }}
    >
      <Link
        href="/"
        className={`nav-link text-light logo 
      ${current === "/" && "active"}`}
      >
        Home
      </Link>

      {state == null ? (
        <>
          <Link
            href="/login"
            className={`nav-link text-light ${
              current === "/login" && "active"
            }`}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`nav-link text-light ${
              current === "/register" && "active"
            }`}
          >
            Register
          </Link>{" "}
        </>
      ) : (
        <>
          <div className="dropdown">
            <button
              className="btn dropdown-toggle text-light"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name
                ? state.user.name
                : "Dashboard"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link
                  href="/user/dashboard"
                  className={`nav-link dropdown-item ${
                    current === "/user/dashboard" && "active"
                  } `}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/user/profile/update"
                  className={`nav-link dropdown-item ${
                    current === "/user/profile/update" && "active"
                  } `}
                >
                  Update profile
                </Link>
              </li>
              <li>
                <a
                  onClick={logout}
                  className={"nav-link dropdown-item"}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
