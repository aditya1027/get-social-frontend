import { Avatar, Card, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";

const { Meta } = Card;
const Username = () => {
  const [state, setState] = useContext(UserContext);
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      fetchUser();
    }
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      setUser(data);
    } catch (err) {
      console.log("Error getting following", err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else return "/images/default.jpg";
  };

  return (
    <div className="row col-md-6 offset-md-3">
      <Card hoverable cover={<img src={imageSource(user)} alt={user.name} />}>
        <Meta title={user.name} description={user.about} />

        <p className="pt-2 text-muted">
          Joined {moment(user.createdAt).fromNow()}
        </p>

        <div className="d-flex justify-content-between">
          <span className="btn btn-sm">
            {user.follower && user.follower.length} Followers
          </span>

          <span className="btn btn-sm">
            {user.following && user.following.length} Following
          </span>
        </div>
      </Card>
      <Link href="/user/dashboard" className="d-flex justify-content-center">
        <RollbackOutlined />
      </Link>
    </div>
  );
};

export default Username;
