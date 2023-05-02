import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
  handleSubmit,
  email,
  newPassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
        />
      </div>

      <div className="form-group p-2">
        <small>
          <label className="text-muted">New Password</label>
        </small>
        <input
          type="password"
          className="form-control"
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
      </div>

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

      <div className="form-group p-2">
        <button
          className="btn btn-primary col-12"
          disabled={!email || !newPassword || !secret || loading}
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
