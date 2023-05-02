import { useRouter, userRouter } from "next/router";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    console.log("getCurrentUser: ");
    try {
      const { data } = await axios.get(`/current-user`);
      if (data.ok) setOk(true);
    } catch (error) {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!state) {
      getCurrentUser();
    }
  }, []);

  // process.browser &&
  //   state == null &&
  //   setTimeout(() => {
  //     getCurrentUser();
  //   }, 1000);

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-primary p-5"
    />
  ) : (
    <>{children}</>
  );
};

export default UserRoute;
