import { Select, Button, Modal, Input,Space,message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState,useCallback,useReducer,useEffect } from "react";
import { useMoralis } from "react-moralis";



const { Option } = Select;

function Purchase({ book, setCount }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delivery, setDelivery] = useState("");
  // const [cartContent,setCartContent] = useState(0);
  const { Moralis, account, chainId } = useMoralis();

  

  const handleOk = async () => {
    // Get The Price of MATIC
    console.log("Working");
    
    const options = {
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      chain: "eth",
    };
    const price = await Moralis.Web3API.token.getTokenPrice(options);
    const priceMatic = book.price / price.usdPrice;


    // Send Matic to book store owenr address
    const options1 = {
      type: "native",
      amount: Moralis.Units.ETH(priceMatic),
      receiver: "0x80A80a31dF2e5B112c499968DFfDc194Ed234d42",
    };
    let result = await Moralis.transfer(options1);

    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("Transaction");
    const transaction = new Transaction();

    transaction.set("Customer", account);
    transaction.set("Delivery", delivery);
    transaction.set("Product", book.name);

    transaction.save();
    setIsModalVisible(false);
  };


  const addToCart = (product) =>{

    // localStorage.clear();
    let value = localStorage.getItem("productList");
    console.log("locale",value);
    
    if (value === null || value === "")
    {
      localStorage.clear();
      let ar =  [];
      product.Quantity = 1;
      console.log("if",product);
      ar.push(JSON.stringify(product))
      setCount(ar.length);
      localStorage.setItem("productList",JSON.stringify(ar));
    }
    else
    {
      let ar = JSON.parse(value);
      let products = [];
      
      if( ar.length === 0 )
      {
        localStorage.clear();
        let r =  [];
        product.Quantity = 1;
        r.push(JSON.stringify(product))
        setCount(r.length);
        localStorage.setItem("productList",JSON.stringify(r));

      }
      else
      {
        let isPresent = false;
        ar.map((str_product,e)=>{
          let prod = JSON.parse(str_product);
          if( prod.name == product.name)
          {
            isPresent = true;
            prod.Quantity = prod.Quantity+1;
          }
          else{
            prod.Quantity = 1;
          }
          console.log("else",prod);
          products.push(prod);
        })

        if (!isPresent)
        {
          product.Quantity = 1;
          products.push(product);
        }
  
        console.log(products);
        let str_prod = [];
        
        products.map(prod=>{
          str_prod.push(JSON.stringify(prod));
        })
  
        console.log(JSON.stringify(str_prod));
  
        setCount(str_prod.length);
        localStorage.setItem("productList",JSON.stringify(str_prod));
      }
      // setValue(value + 1)
    }
    message.success('Product added to cart', 10)
    // forceUpdate()
    
  }

  const getDetails = () =>{
    // localStorage.clear();
    let val = JSON.parse(localStorage.getItem('productList'))
    // console.log(localStorage.getItem('productList'));
    val.map(ele=>{
      console.log(JSON.parse(ele));
    })
  }

  // const forceUpdate = useForceUpdate();
  
  return (
    <>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <span className="price"> ${book.price}</span>
      <p>No Import Fees & Free Shipping Included</p>
      <h1 style={{ color: "green" }}> In Stock </h1>
      {/* <h3>Quantity</h3> */}
      {/* <Select defaultValue={1} style={{ width: "100%" }}>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
        <Option value={5}>5</Option>
      </Select> */}
      {chainId === "0x13881" && (
        <Button
          className="login"
          style={{ width: "100%" }}
          onClick={() => setIsModalVisible(true)}
        >
          <ShoppingCartOutlined /> Buy Now
        </Button>
      )}

      
      <div>
        <Button style={{ width: "100%" }} onClick={()=>addToCart(book)}> Add to Cart </Button>
      </div>

      {/* <div>
        <Button onClick={()=>{getDetails()}}> console it </Button>
      </div> */}

      </Space>

      <Modal
        title="Purchase Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <div style={{ display: "flex" }}>
          <img src={book.image} alt="product" style={{ width: "200px" }}></img>
          <div>
            <h3>{book.name}</h3>
            <h2>${book.price}</h2>
            <h4>Delivery Address</h4>
            <Input
              onChange={(value) => setDelivery(value.target.value)}
            ></Input>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Purchase;
