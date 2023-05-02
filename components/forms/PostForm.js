import { Avatar } from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

const PostForm = ({
  content,
  setContent,
  postSubmit,
  handleImage,
  uploading,
  image,
}) => {
  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group" onSubmit={postSubmit}>
          <ReactQuill
            theme="snow"
            className="form-control"
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e)}
          />
        </form>
      </div>

      <div className="card-footer d-flex justify-content-between text-muted">
        <button
          className="btn btn-primary mt-1 btn-sml"
          onClick={postSubmit}
          disabled={!content}
        >
          Post
        </button>

        <label>
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1" />
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <CameraOutlined className="mt-2" style={{ cursor: "pointer" }} />
          )}{" "}
          <input type="file" accept="images/*" hidden onChange={handleImage} />
        </label>
      </div>
    </div>
  );
};

export default PostForm;
