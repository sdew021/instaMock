const bioStyle = {
  fontFamily: "Open Sans"
};
const layoutStyle = {
  display: "flex",
  justifyContent: "flex-start",
  fontFamily: "Open Sans"
};
const rowStyle = {
  display: "flex",
  justifyContent: "flex-start"
};

function Bio(props) {
  return (
    <div>
      <h2 style={layoutStyle}> Live With Ombre</h2>
      <div style={rowStyle}>
        <h3 style={bioStyle}>{props.num} Posts </h3>
      </div>
      <h5 style={bioStyle}>
        {" "}
        Ombre Hub for live Music <br /> Sharing Live Streaming Music Around the
        World <br />
      </h5>
    </div>
  );
}

export default Bio;
