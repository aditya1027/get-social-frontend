import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import Post from "./Post";

const PostList = ({ posts, handleLike, handleUnlike, handleComment }) => {
  const router = useRouter();
  const [state] = useContext(UserContext);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-posts");
      setPosts(data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted");
      fetchUserPosts();
    } catch (err) {
      console.log("Err delete post");
    }
  };

  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleComment={handleComment}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />
        ))}
    </>
  );
};

export default PostList;
