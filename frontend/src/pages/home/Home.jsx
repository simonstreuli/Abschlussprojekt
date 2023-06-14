import "./home.css";
import Feed from "../../components/feed/Feed";
import Leftside from "../../components/leftside/Leftside";
import Navbar from "../../components/navbar/Navbar";
import Rightside from "../../components/rightside/Rightside";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="homeContainer">
      <Leftside />
      <Feed />
      <Rightside />
      </div>
    </>
  );
}
