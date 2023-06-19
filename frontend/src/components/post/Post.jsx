import "./post.css"
import {MoreVert, FavoriteBorderOutlined, ThumbUpOutlined} from "@material-ui/icons"
import { Users } from "../../dummyData"


export default function Post({post}) {

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src="/assets/person/1.jpeg" alt="" className="postProfileImg" />
                    <span className="postUsername">{Users.filter((u)=>u.id === post.userId[0].username)}
</span>
                    <span className="postDate">{post.date}</span>

                </div>
                <div className="postTopRight"></div>
                    <MoreVert></MoreVert>
            </div>

            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg"src={post.photo} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <FavoriteBorderOutlined/>
                    <ThumbUpOutlined></ThumbUpOutlined>
                    <span className="postLikeCounter">{post.like} people liked</span>

                </div>
                <div className="postBottomRight"></div>
                    <span className="postCommentText">{post.comment} Comments</span>
            </div>
        </div>
    </div>
  )
}
