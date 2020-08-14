import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { storage, db } from "./firebase";
import "./ImageUpload.css";

function Imageupload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handelChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handelUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress bar
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // if error during upload
        console.log(error);
        alert(error.message);
      },
      () => {
        // upload complete
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload__container">
      <div className="imageupload">
        <progress
          className="imageupload__progress"
          value={progress}
          max="100"
        />
        <input
          className="imageupload__text"
          type="text"
          placeholder="Enter a caption"
          onChange={(event) => setCaption(event.target.value)}
          value={caption}
        />
        <input type="file" onChange={handelChange} />
        <Button
          className="imageupload__button"
          disabled={!image}
          onClick={handelUpload}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Imageupload;
