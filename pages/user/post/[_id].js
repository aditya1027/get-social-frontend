import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context";
import PostForm from "../../../components/forms/PostForm";
import UserRoute from "../../../components/routes/UserRoute";
import { toast } from "react-toastify";

const EditPost = () => {
  const router = useRouter();
  const [post, setPost] = useState({});
  const _id = router.query._id;
  const [state, setState] = useContext(UserContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      setContent(data.content);
      setImage(data.image);
    } catch (err) {
      console.log("Err getting post", err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });
      if (data.error) {
        toast.error(data.error, { autoClose: true });
      } else {
        toast.success("Post Upadted", { autoClose: true });
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.log("post err", err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const { data } = await axios.post("/upload-image", formData);
      //console.log("Uplaoded image: ", data);

      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      setUploading(false);
      console.log("image upload error", err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-dark bg-default-image">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8 offset-md-2">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default EditPost;
