import React,{useState} from 'react';


import { Rate,Button } from 'antd';
import "./Product.css";
import Header from '../components/Header';
import { useLocation } from 'react-router';
import Purchase from '../components/Purchase';


const Product = () => {
  
  let {state: book} = useLocation();
  const [cartCount,setCartCount] = useState(0);
  
  const handleCount = (x) => {
    setCartCount(x);  
  }

  return (
  <>
  <div className="container">
    <Header count={cartCount} />
    <div className="product-content">
      <div>
        <div className="product-img">
          <img src={book.image} alt="product" width="100%"></img>
        </div>
        <p style={{ textAlign: "center" }}>Hover over image to zoom</p>
      </div>
      <div className="product-details">
        <h1>{book.name}</h1>
        <Rate value={book.rating} disabled={true}></Rate>
        <hr></hr>
        <p>
          Price:
          <span className="price"> ${book.price}</span>
        </p>
        <p>
          No Import Fees & Free Shipping Included
        </p>
        <hr></hr>
        <h3>About This Item</h3>
        <p>
          {book.about}
        </p>
      </div>
        <div className="purchase-details">
          <Purchase book={book} setCount={handleCount} />
        </div>
      
    </div>
  </div>
  </>
)
}

export default Product;
