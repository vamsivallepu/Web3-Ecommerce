
import React,{useState} from 'react';
import { Rate,Button,Card,Avatar,Space,Row,Col } from 'antd';
import { Link } from 'react-router-dom';
import "./Product.css";
import Header from '../components/Header';
import Product from './Product';
import CartPurchase from '../components/CartPurchase';

const {Meta} = Card;

const Cart = () => {
  
    let strProducts = JSON.parse(localStorage.getItem('productList'));
    let products = [];
    strProducts.map((strProduct)=>{
        products.push(JSON.parse(strProduct))
    })
    let [prods,setProds] = useState(products);
    let total = 0;
    let Quantity = 0;

    console.log("hi",products)

    const removeProduct = (prod) =>{
        let newproducts = prods.filter(prodct => { return prodct.name !== prod.name } )
        
        
            let str_products = [];
            newproducts.map((prodct)=>{
                str_products.push(JSON.stringify(prodct));
            })
    
            localStorage.setItem("productList",JSON.stringify(str_products));
            setProds(newproducts);
        }

  return(
    <>
    
    <Header />

    <div className="container"> 

        <div className="product-content">
            <div>

            
            {products.map((product,e) => {

                        {total = total+(product.price * product.Quantity)}
                        {Quantity = Quantity+ product.Quantity}
                        return (
                            // <Row>
                            //     <Col span={8} offset={2} >
                                        <Space direction="vertical" size={"middle"} style={{ display: 'flex',marginTop: "20px"}} >
                                            <Card title="Book" extra={
                                                <>
                                                    <Button style={{border:'none'}}>
                                                        <Link to="/product" state={product} className="login" style={{border:'none',marginLeft:"4px"}}>
                                                            Check product
                                                        </Link>
                                                    </Button>
                                                    <Button  onClick={()=>{removeProduct(product)}} danger type="primary">
                                                        Remove
                                                    </Button>
                                                </>
                                                } 
                                                
                                                style={{ width: 1000 }}>
                                                <Meta
                                                    avatar={<Avatar src={product.image} size={100} shape="square" />}
                                                    title={product.name}
                                                    description= {`price : $ ${product.price} ~\t
                                                                    Quantity : ${product.Quantity}`}
                                                />
                                            </Card>
                                        </Space>
                            //     </Col>
                            // </Row>
                                
                                );
                                
                            })}
                </div>
                <div className="purchase-details">
                    <CartPurchase products={prods} quantity={Quantity} total={total} />
                </div>
            </div>

        
            <Row>
                <Col span={8} offset={2} >
                    <Space direction="horizontal" size={"middle"} style={{ display: 'flex',marginTop: "20px"}} >
                    <h3> Quantity = {Quantity} </h3> &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <h3 style={{position:'relative',left:"400px"}}>Total Price = $ {Math.ceil(total * 100)/100}</h3>
                    </Space>
                </Col>
            </Row>
{/* 
            <Row>
                <Col span={8} offset={12} >
                    <Space direction="horizontal" size={"middle"} style={{ display: 'flex',marginTop: "20px"}} >
                        BUY
                    </Space>
                </Col>
            </Row> */}

            {/* <div className="purchase-details">
                <CartPurchase products={prods} quantity={Quantity} total={total} />
            </div> */}
        
    </div>

    
    </>
  )
}

export default Cart;