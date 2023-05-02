import { useContext, useState } from "react";
import { UserContext } from "../context";
import axios from "axios";
import People from "./cards/People";
import { toast } from "react-toastify";

const Search = () => {
  const [state, setState] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const searchUser = async (e) => {
    try {
      const { data } = await axios.get(`/search-user/${query}`);
      setResult(data);
    } catch (er) {
      console.log("Error getting search");
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put(`/user-follow`, { _id: user._id });
      //console.log("user followed: ", data);

      //update local storage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context
      setState({ ...state, user: data });

      //update people state
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      //rerender the posts in newsfeed
      newsFeed();
      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log("Error following this person", err);
    }
  };
  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });

      //update local storage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context
      setState({ ...state, user: data });

      //update people state
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      //rerender the posts in newsfeed
      //newsFeed();
      toast.error(`Unfollowed ${user.name}`);
    } catch (err) {
      console.log(" Error unfollowing", err);
    }
  };

  return (
    <>
      <form
        className="form-inline row"
        onSubmit={(e) => {
          e.preventDefault();
          searchUser(e);
        }}
      >
        <div className="col-8">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
              searchUser(e.target.value);
              setResult([]);
            }}
            value={query}
            className="form-control mr-sm-2 col"
            type="search"
            placeholder="Seatch"
          />
        </div>
        <div className="col-4">
          <button
            className="btn btn-outline-primary my-2 my-sm-0 mr-2"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>

      {result && (
        <People
          people={result}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
        />
      )}
    </>
  );
};

export default Search;
