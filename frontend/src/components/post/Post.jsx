import "./post.css"
import {MoreVert, FavoriteBorderOutlined, ThumbUpOutlined} from "@material-ui/icons"
import { Users } from "../../dummyData"
import { useState } from "react"


export default function Post({post}) {
    const [like,setLike] = useState(post.like)
    const [isLiked,setIsLiked] = useState(false)
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler =()=>{
      setLike(isLiked ? like-1 : like+1)
      setIsLiked(!isLiked)
    }
    console.log(post.photo)
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={Users.filter((u) => u.id === post.userId)[0].profilePicture}alt="" className="postProfileImg" />
                    <span className="postUsername">{Users.filter((u) => u.id === post.userId)[0].username}</span>
                    <span className="postDate">{post.date}</span>

                </div>
                <div className="postTopRight"></div>
                    <MoreVert></MoreVert>
            </div>

            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg"src={publicFolder + post.photo} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <FavoriteBorderOutlined onClick={likeHandler}/>
                    <ThumbUpOutlined onClick={likeHandler}/>
                    <span className="postLikeCounter">{like} people liked</span>

                </div>
                <div className="postBottomRight"></div>
                    <span className="postCommentText">{post.comment} Comments</span>
            </div>
        </div>
    </div>
  )
}
