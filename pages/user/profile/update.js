import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../../../context";
import AuthForm from "../../../components/forms/AuthForm";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";

const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  //profile image
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (state && state.user) {
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`/profile-update`, {
        username,
        about,
        name,
        email,
        password,
        secret,
        image,
      });

      if (data.error) {
        toast.error(data.err);
      } else {
        //update local storage, update user , keep token
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        //update context
        setState({ ...state, user: data });
        setOk(true);
        //toast.success("Profile updated", { autoClose: true });
        setLoading(false);
      }
    } catch (err) {
      toast.error(err);
      setLoading(false);
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
    <div className="container-fluid">
      <div className="row py-5 text-dark bg-default-image">
        <div className="col text-center">
          <h1>Profile</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <label className="d-flex justify-content-center h5">
            {image && image.url ? (
              <Avatar size={30} src={image.url} className="mt-1" />
            ) : uploading ? (
              <LoadingOutlined className="mt-2" />
            ) : (
              <CameraOutlined className="mt-2" style={{ cursor: "pointer" }} />
            )}{" "}
            <input
              type="file"
              accept="images/*"
              hidden
              onChange={handleImage}
            />
          </label>

          <AuthForm
            profileUpdate={true}
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            email={email}
            setEmail={setEmail}
            loading={loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="Congratulations"
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You have successfully updated your profile</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
