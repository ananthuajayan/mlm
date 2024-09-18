import React from 'react';
import './Myproduct.scss';

const Myproduct = () => {

    const displayedPosts = [
        {
            image:"https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg",
            product_id:1,
            product_name:"hello product",
            product_price:20,

        },
        {
            image:"https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg",
            product_id:1,
            product_name:"hello product",
            product_price:20,

        },
        {
            image:"https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg",
            product_id:1,
            product_name:"hello product",
            product_price:20,

        },
        {
            image:"https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg",
            product_id:1,
            product_name:"hello product",
            product_price:20,

        },
        {
            image:"https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg",
            product_id:1,
            product_name:"hello product",
            product_price:20,

        },
        {
            image:"https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg",
            product_id:1,
            product_name:"hello product",
            product_price:20,

        },
    ]

  return (
    <>
      <div className="container-fluid products">
        <h1>Our Products</h1>

        <div className="collection-product-display">
          {displayedPosts.length > 0
            ? displayedPosts.map((post) => (

              <div className="collection-product-card" key={post.product_id} >
                <div className="collection-product-image-container">

                  <img
                    src={post.image}
                    alt={post.product_name}
                    className="collection-default"
                  />

                  <div className="sale-container">sale</div>
                </div>
                <div className="product-name">
                  <h6>{post.product_name}</h6>
                </div>
                <div className="product-price-details">
                  <div className="price">
                    <span>Points</span>
                    {post.product_price}
                  </div>
                </div>
              </div>
            ))
            : (
              <div>
                <h1>No products available</h1>
              </div>
            )
          }

        </div>
      </div>
    </>
  );
}

export default Myproduct;
