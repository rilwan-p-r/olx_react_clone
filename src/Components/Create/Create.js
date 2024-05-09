import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/firebaseContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const date = new Date();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setError(null);

    if (!name || !category || !Price || !image) {
      setError("All fields are required");
      return;
    }

    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase
            .firestore()
            .collection("products")
            .add({
              name,
              category,
              Price,
              url,
              userId: user.uid,
              createdAt: date.toDateString(),
            })
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              setError("Failed to add product");
              console.error("Error adding product: ", error);
            });
        });
      })
      .catch((error) => {
        setError("Failed to upload image");
        console.error("Error uploading image: ", error);
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            id="name"
            name="name"
            placeholder="Enter the name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            onChange={(e) => setCategory(e.target.value)}
            className="input"
            type="text"
            id="category"
            name="category"
            placeholder="Enter the category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            type="number"
            id="price"
            name="price"
            placeholder="Enter the price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="300px"
            height="300px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            Upload and Submit
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
