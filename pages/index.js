import { useContext } from "react";
import { UserContext } from "../context";

const Home = () => {
  const [state, setState] = useContext(UserContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-1 text-center py-5">Home page</h1>

          <img src="/images/default.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
