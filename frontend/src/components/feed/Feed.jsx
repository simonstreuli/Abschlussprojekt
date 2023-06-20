import "./feed.css";
import { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/64915785e4b5933742f574c6");
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username]);
  console.log("2" + posts);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
