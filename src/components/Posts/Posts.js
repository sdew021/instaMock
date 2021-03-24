import React, { useEffect, useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { storage } from "../../firebase";

const classes = {
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20,
    textAlign: "center"
    // color: theme.palette.text.secondary,
    // fontFamily: "Roboto"
  }
};

export default function Posts() {
  const x = useRef(["loading", 2, 3, 4]);
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
      x.current = urls;
      setUrls(urls);
      //setFiles(urls);
    };

    loadImages();
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {iurls.map((y) => (
          <Grid item xs={12} sm={4}>
            {/* <Paper className={classes.paper}></Paper> */}
            <div
              style={{
                width: "100%"
              }}
            >
              <img
                style={{
                  display: "block",
                  height: "auto",
                  width: "100%",
                  backgroundSize: "contain",
                  padding: "10"
                }}
                src={y}
                alt="loading"
              />
            </div>
          </Grid>
        ))}
        {/* <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}
