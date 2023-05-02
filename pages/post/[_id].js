import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../../components/cards/Post";
import Link from "next/link";
import { RollbackOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const PostComments = () => {
  const [post, setPost] = useState({});
  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
    } catch (err) {
      console.log("Error getting post comments", err);
    }
  };

  const removeComment = async (postId, comment) => {
    //console.log("postId: ", postId);
    let answer = window.confirm("Are you sure?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      if (data) {
        toast.success("Comment deleted ", { autoClose: true });
      }
      fetchPost();
    } catch (e) {
      console.log("Error deleting comment");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Comments</h1>
        </div>
      </div>
      <div className="container col-md-8 offset-md-2 pt-5">
        <Post post={post} commentCount={100} removeComment={removeComment} />
      </div>

      <Link href="/user/dashboard">
        <RollbackOutlined />
      </Link>
    </div>
  );
};

export default PostComments;
