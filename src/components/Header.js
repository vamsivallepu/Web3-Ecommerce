import { PageHeader, Button, Input, Space, Badge } from 'antd';
import { useMoralis } from "react-moralis";
import { Link } from 'react-router-dom';
import './Header.css'
import Amazon from "../images/logo.png";
import USA from "../images/usa.png";
import BookStore from "../images/bookstore.png";
import Cart from '../pages/Cart';
import {ShoppingCartOutlined, MenuOutlined} from "@ant-design/icons";

const {Search } = Input;
const categories = ["Comics", "Dictionaries", "Novels", "Fantasy", "Horror", "Adventure"];

const Header = ({count}) => {
  const { authenticate, account } = useMoralis();

  let cartQuantity = 0;
  let products = localStorage.getItem("productList");
  if(products !== null && products !== '')
  {
    // console.log(JSON.parse(products).length)
    let parsedProducts = JSON.parse(products);
    if (parsedProducts !== "" && parsedProducts !== null)
    {
      cartQuantity = parsedProducts.length;
    }
  }

  return(
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        extra={[
          <>
          <Link to="/">
          <img src={Amazon} className="logo"></img>
          </Link>
          <img src={BookStore} className="logo"></img>
          <Search
              placeholder="Find A Product"
              enterButton
              className = "searchBar"
            />
         <Button 
         className="login"
         key="1" 
         type="primary" 
         onClick={() => authenticate()}>
          {account ? <span>{account.slice(0,5)}...</span> : <span>login</span>}
          </Button>
          <Space size={"large"}>
              
              <Badge count={0} showZero>
                <span className="header-buttons">
                  <ShoppingCartOutlined className="header-icon" />
                  Cart
                </span>
              </Badge>
              <Space className="header-buttons" size={"small"}>
                <img src={USA} alt="region" className="flag"></img>▾
              </Space> 
            </Space>
          </>
        ]}>
      </PageHeader>
      <div className="site-page-subheader-ghost-wrapper">
      <Space size={"middle"}>
        <Space size={"small"} style={{fontWeight:"bold"}}>
          <MenuOutlined />
          Categories
        </Space>
        {categories.map((e) =>{
          return(
            <Link to="/categories" state={e} className="categories">
              {e}
            </Link>
          )

        })}
      </Space>
    </div>
    
    

    </div>
  )
}

export default Header;