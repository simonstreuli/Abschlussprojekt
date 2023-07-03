import "./explore.css";
import Leftside from "../../components/leftside/Leftside";
import Navbar from "../../components/navbar/Navbar";
import Rightside from "../../components/rightside/Rightside";
import Explorefeed from "../../components/explorefeed/Explorefeed";

export default function Explore() {
  return (
    <>
      <Navbar />

      <div className="homeContainer">
        <Leftside />

        <Explorefeed />
        <Rightside />
      </div>
    </>
  );
}
