import { useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { Avatar } from "antd";
import moment from "moment";
import renderHTML from "react-render-html";
import PostImage from "../images/PostImage";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const Post = ({
  post,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  commentCount = 10,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {post && post.postedBy && (
        <div key={post._id} className="card mb-5">
          <div className="card-header">
            <Avatar size={40}>{post.postedBy.name[0]}</Avatar>{" "}
            <span
              className="pt-2 ml-5"
              style={{
                marginLeft: "1rem",
              }}
            >
              {post.postedBy.name}
            </span>
            <span
              className="pt-2 ml-3"
              style={{
                marginLeft: "1rem",
              }}
            >
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body">{renderHTML(post.content)}</div>
          <div className="card-footer">
            {post.image && <PostImage url={post.image.url} />}
            <div className="d-flex pt-2">
              {state &&
              state.user &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
                <HeartFilled
                  className="text-danger pt-2 h5 px-2"
                  onClick={() => handleUnlike(post._id)}
                />
              ) : (
                <HeartOutlined
                  className="text-danger pt-2 h5 px-2"
                  onClick={() => handleLike(post._id)}
                />
              )}
              <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                {post.likes.length} likes
              </div>
              <CommentOutlined
                className="text-danger pt-2 h5 px-2"
                onClick={() => handleComment(post)}
              />
              <div className="pt-2 pl-3">
                <Link
                  href={`/post/${post._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {post.comments.length} comments
                </Link>
              </div>
              {state && state.user && state.user._id === post.postedBy._id && (
                <>
                  <EditOutlined
                    className="text-danger pt-2 h5 px-2 mx-auto"
                    onClick={() => router.push(`/user/post/${post._id}`)}
                  />
                  <DeleteOutlined
                    className="text-danger pt-2 h5 px-2"
                    onClick={() => handleDelete(post)}
                  />
                </>
              )}
            </div>
          </div>
          {post.comments && post.comments.length > 0 && (
            <ul
              className="list-group"
              style={{
                maxHeight: "125px",
                overflow: "scroll",
              }}
            >
              {post.comments.slice(0, commentCount).map((e) => (
                <li
                  key={e._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div>
                      <Avatar
                        size={20}
                        className="mb-1 mr-3"
                        src={
                          e.postedBy.image && e.postedBy.image.url
                            ? e.postedBy.image.url
                            : "/images/default.jpg"
                        }
                      />
                      &nbsp;{e.postedBy.name}
                    </div>
                    <div>{e.text}</div>
                  </div>
                  <span className="badge rounded-pill text-muted">
                    {moment(e.created).fromNow()}
                    {state &&
                      state.user &&
                      state.user._id === e.postedBy._id && (
                        <div className="ml-auto mt-3">
                          <DeleteOutlined
                            className="pl-2 text-danger"
                            onClick={() => removeComment(post._id, e)}
                          />
                        </div>
                      )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
