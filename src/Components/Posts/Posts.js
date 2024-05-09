import React, { useEffect, useState, useContext } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/firebaseContext";
import { useNavigate } from "react-router-dom";
import { postContext } from "../../store/postsContext";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { setPostDetails } = useContext(postContext);
  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const allpost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        console.log(allpost);
        setProducts(allpost);
      });
  }, []);
  return (
    <div className="postParentDiv">
  <div className="moreView">
    <div className="heading">
      <span>Quick Menu</span>
      <span>View more</span>
    </div>
    <div className="row-container">
      {products.map((product) => (
        <div className="card" onClick={() => { setPostDetails(product); navigate("/view"); }}>
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.url} alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.Price}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name">{product.name}</p>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
{
  /* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */
}

export default Posts;
