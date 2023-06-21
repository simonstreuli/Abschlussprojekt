import {
  AddPhotoAlternateOutlined,
  LabelOutlined,
  RoomOutlined,
  EmojiEmotionsOutlined,
} from "@material-ui/icons";
import "./share.css";
import { useContext } from "react";
import { useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Share() {
  const description = useRef();
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? publicFolder + user.profilePicture
                : publicFolder + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            type="text"
            placeholder="What's going on right now"
            name=""
            id=""
            className="shareInput"
            ref={description}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom">
          <label htmlFor="file" className="shareOptions">
            <div className="shareOption">
              <AddPhotoAlternateOutlined className="shareIcon" />
              <span className="sharedOptionText">Photo/Video</span>
              <input
                type="file"
                accept=".jpg, .png, jpeg"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="shareOption">
              <LabelOutlined className="shareIcon" />
              <span className="sharedOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomOutlined className="shareIcon" />
              <span className="sharedOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsOutlined className="shareIcon" />
              <span className="sharedOptionText">Feelings</span>
            </div>
          </label>
          <button className="shareButton">Post</button>
        </form>
      </div>
    </div>
  );
}
