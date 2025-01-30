import React, { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Context, server } from "../main";
const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/api/v1/auth/logout`, {
        withCredentials: true,
      });

      toast.success("Logged out successfully");
      setIsAuthenticated(false);

      setLoading(false);
      navigate("/");
    } catch (error) {
      //   toast.error(error.response.data);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  return (
    <nav className="flex justify-around bg-slate-600">
      <div className="logo  p-3">VroomVault</div>
      <div className="button md:hidden">
        <button>Btn</button>
      </div>

      <div className="items hidden md:flex justify-center">
        <ul className="ordered_list flex cursor-pointer">
          <a className="item  p-3" href="/">
            Home
          </a>
          {isAuthenticated ? (
            <>
              <li className="item p-3" onClick={logoutHandler}>
                Logout{" "}
              </li>
            </>
          ) : (
            <a className="item  p-3" href="/login">
              Login
            </a>
          )}

          {isAuthenticated && (
            <a href="/manage">
              <li className="item  p-3">Add cars</li>
            </a>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
