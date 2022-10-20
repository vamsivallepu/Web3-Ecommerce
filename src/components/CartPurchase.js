import { Select, Button, Modal, Input,Space,message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState,useCallback,useReducer,useEffect } from "react";
import { useMoralis } from "react-moralis";



const { Option } = Select;

function CartPurchase({ products, quantity , total }) {
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
    const priceMatic = total / price.usdPrice;
    

    

    // Send Matic to book store owenr address

    const options1 = {
      type: "native",
      amount: Moralis.Units.ETH(priceMatic),
      receiver: "0xf2B805dEb13D3fF3dDbf49eCE5c863A1991e1C59",
    };
    let result = await Moralis.transfer(options1);

    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("Transaction");
    const transaction = new Transaction();

    products.map((product)=>{
      transaction.set("Customer", account);
      transaction.set("Delivery", delivery);
      transaction.set("Product", product.name);
    })

    transaction.save();
    setIsModalVisible(false);
  };



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
      <span className="price"> Total contents : {quantity} </span>
      <span className="price"> Total : ${Math.ceil(total * 100)/100}</span>
      {chainId === "0x13881" && (
        <Button
          className="login"
          style={{ width: "100%", marginTop: "50px" }}
          onClick={() => setIsModalVisible(true)}
        >
          <ShoppingCartOutlined /> Buy Now
        </Button>
      )}

      {/* <div>
        <Button onClick={()=>{getDetails()}}> console it </Button>
      </div> */}

      </Space>

      <Modal
        title="Purchase"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <div>
          {products.map((product)=>{
            return(
              <div style={{ display: "flex" }}>
                <img src={product.image} alt="product" style={{ width: "200px" }}></img>
                  <div>
                    <h3>{product.name}</h3>
                    <h2>${product.price}</h2>
                  </div>
              </div>
            ); 
          })}
          </div>
        <center style={{marginTop:"10px"}}>
        <h2> Total : ${total}</h2>
        </center>
        <h4>Delivery Address</h4>
        <Input
          onChange={(value) => setDelivery(value.target.value)}
        ></Input>
      </Modal>
    </>
  );
}

export default CartPurchase;
