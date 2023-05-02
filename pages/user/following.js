import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";

const Following = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (state && state.token) {
      fetchFollowing();
    }
  }, [state && state.token]);

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      setPeople(data);
    } catch (err) {
      console.log("Error getting following", err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else return "/images/default.jpg";
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });

      //update local storage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context
      setState({ ...state, user: data });

      //update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      //rerender the posts in newsfeed
      //newsFeed();
      toast.error(`Unfollowed ${user.name}`);
    } catch (err) {
      console.log(" Error unfollowing", err);
    }
  };

  return (
    <div className="row col-md-6 offset-md-3">
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  {user.name}{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    className="text-primary"
                    onClick={() => handleUnfollow(user)}
                  >
                    Unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Link href="/user/dashboard" className="d-flex justify-content-center">
        <RollbackOutlined />
      </Link>
    </div>
  );
};

export default Following;
