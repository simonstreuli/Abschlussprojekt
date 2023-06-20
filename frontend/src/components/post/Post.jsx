import "./post.css";
import {
  MoreVert,
  FavoriteBorderOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture || publicFolder + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight"></div>
          <MoreVert></MoreVert>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={publicFolder + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <FavoriteBorderOutlined onClick={likeHandler} />
            <ThumbUpOutlined onClick={likeHandler} />
            <span className="postLikeCounter">{like} people liked</span>
          </div>
          <div className="postBottomRight"></div>
          <span className="postCommentText">{post.comment} Comments</span>
        </div>
      </div>
    </div>
  );
}
