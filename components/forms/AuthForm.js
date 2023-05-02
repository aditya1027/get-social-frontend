import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  username,
  setUsername,
  about,
  setAbout,
  profileUpdate,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {profileUpdate && (
        <>
          <div className="form-group p-2">
            <small>
              <label className="text-muted">Username</label>
            </small>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="form-group p-2">
            <small>
              <label className="text-muted">About</label>
            </small>
            <input
              type="text"
              className="form-control"
              placeholder="Write about yourself"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            />
          </div>
        </>
      )}

      {page !== "login" && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Your name</label>
          </small>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
      )}

      <div className="form-group p-2">
        <small>
          <label className="text-muted">Email address</label>
        </small>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          disabled={profileUpdate}
        />
      </div>

      <div className="form-group p-2">
        <small>
          <label className="text-muted">Password</label>
        </small>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      {page !== "login" && (
        <>
          <div className="form-group p-2">
            <small>
              <label className="text-muted">Pick a question</label>
            </small>
            <select className="form-control">
              <option>What is your favourite color?</option>
              <option>What is your best friend's name?</option>
              <option>What city your were born?</option>
            </select>
            <small className="form-text text-muted">
              You can use this to reset your password if forgotten.
            </small>
          </div>
          <div className="form-group p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Write your answer here."
              onChange={(e) => setSecret(e.target.value)}
              value={secret}
            />
          </div>
        </>
      )}

      <div className="form-group p-2">
        <button
          className="btn btn-primary col-12"
          disabled={
            profileUpdate
              ? loading
              : page == "login"
              ? !email || !password || loading
              : !name || !password || !email || !secret
          }
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
