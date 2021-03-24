import Bio from "./components/Bio/Bio";
import "./styles.css";
import Pic from "./components/Pic/Pic";
import Posts from "./components/Posts/Posts";
import React, { useState, useEffect } from "react";
import { storage } from "./firebase";

const bioStyle = {
  fontFamily: "Open Sans"
};

const layoutStyle = {
  display: "flex"
};

export default function App() {
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [iurls, setUrls] = useState([1, 2, 3]);

  useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.ref("images").listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setUrls(urls);
      //setFiles(urls);
    };

    loadImages();
  }, []);

  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };
  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "" || imageAsFile.name === undefined) {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    if (imageAsFile.name !== undefined) {
      const uploadTask = storage
        .ref(`/images/${imageAsFile.name}`)
        .put(imageAsFile);

      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot);
        },
        (err) => {
          //catches the errors
          console.log(err);
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          if (imageAsFile.name !== undefined) {
            storage
              .ref("images")
              .child(imageAsFile.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                alert("upload complete");
                window.location.reload(false);
                setImageAsUrl((prevObject) => ({
                  ...prevObject,
                  imgUrl: fireBaseUrl
                }));
              });
          }
        }
      );
    } else {
      alert("Select a file");
    }
  };
  return (
    <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
      <h1 style={bioStyle}>Instagram</h1>
      <form onSubmit={handleFireBaseUpload}>
        <input
          // allows you to reach into your file directory and upload image to the browser
          type="file"
          onChange={handleImageAsFile}
        />
        <button>upload to firebase</button>
      </form>
      <div style={layoutStyle}>
        <Pic />
        <Bio num={iurls.length} />
      </div>
      <h4 style={bioStyle}>Posts</h4>
      <Posts />
    </div>
  );
}
