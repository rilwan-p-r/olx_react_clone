import React, { useContext, useEffect, useState } from "react";

import "./View.css";
import { postContext } from "../../store/postsContext";
import { FirebaseContext } from "../../store/firebaseContext";

function View() {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || null
  );
  const [postDetails, setPostDetails] = useState(
    JSON.parse(localStorage.getItem("postDetails")) || null
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (postDetails) {
      const { userId } = postDetails;
      console.log('id', userId);
      firebase
        .firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          console.log("Firestore response:", res.docs); 
          res.forEach((document) => {
            console.log("User document:", document.data());
            const userDetails = document.data();
            setUserDetails(userDetails);
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
          });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [firebase, postDetails]);

  useEffect(() => {
    if (!postDetails) {
      const storedPostDetails = JSON.parse(localStorage.getItem("postDetails"));
      if (storedPostDetails) {
        setPostDetails(storedPostDetails);
      }
    }
  }, []);

  const { postDetails: contextPostDetails } = useContext(postContext);
  useEffect(() => {
    if (contextPostDetails) {
      setPostDetails(contextPostDetails);
      localStorage.setItem("postDetails", JSON.stringify(contextPostDetails));
    }
  }, [contextPostDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.Price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>

        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
