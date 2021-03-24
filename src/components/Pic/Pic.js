import { Image } from "react-bootstrap";

const pic = "https://liveombre.com/images/icon.jpeg";
const style = {
  margin: 20
};
const imageStyle = {
  //justifyContent: "center",
  //height: "40vh",
  display: "flex",
  width: "150px",
  borderRadius: "50%"
};
function Pic() {
  return (
    <div style={style}>
      <Image style={imageStyle} alt="Saurabh" src={pic} roundedCircle />
    </div>
  );
}
export default Pic;
