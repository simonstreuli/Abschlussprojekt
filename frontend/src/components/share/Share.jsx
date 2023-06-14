import {AddPhotoAlternateOutlined, LabelOutlined, RoomOutlined, EmojiEmotionsOutlined} from "@material-ui/icons"
import "./share.css"

export default function Share() {
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg"src="/assets/person/2.jpeg" alt="" />
                <input type="text" placeholder="Placeholder" name="" id="" className="shareInput" />
            </div>
            <hr className="shareHr" />
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <AddPhotoAlternateOutlined className="shareIcon"/>
                        <span className="sharedOptionText">Photo/Video</span>
                    </div>
                    <div className="shareOption">
                        <LabelOutlined className="shareIcon"/>
                        <span className="sharedOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <RoomOutlined className="shareIcon"/>
                        <span className="sharedOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotionsOutlined className="shareIcon"/>
                        <span className="sharedOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton">Post</button>
            </div>
        </div>
    </div>
  )
}
