import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../context";
import Link from "next/link";

const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else return "/images/default.jpg";
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  <Link
                    style={{ textDecoration: "none" }}
                    href={`/user/${user.username}`}
                  >
                    {user.name}
                  </Link>
                  {state &&
                  state.user &&
                  user.follower &&
                  user.follower.includes(state.user._id) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      className="text-primary"
                      onClick={() => handleUnfollow(user)}
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      style={{ cursor: "pointer" }}
                      className="text-primary"
                      onClick={() => handleFollow(user)}
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
