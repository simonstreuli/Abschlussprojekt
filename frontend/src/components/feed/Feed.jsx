import "./feed.css"
import { useEffect, useState } from "react";
import Share from "../share/Share"
import Post from "../post/Post"
// import {Posts} from "../../dummyData"
import axios from "axios"

export default function Feed() {
  const [posts, setPosts] = useState([]);


  useEffect(()=>{
    const fetchPosts = async () => {
      axios.get('/posts/timeline/64904bb300001200acf15f73')
      .then(res => {
        setPosts(res.data)
      }).catch(err => console.error(err))
    }
    fetchPosts();
  },[])

  return (
    <div className="feed">
        <div className="feedWrapper">
            <Share/>
            {posts.map((p)=> (
                <Post key={p._id} post={p}/>
            ))} 
        </div>
    </div>

  )
}
