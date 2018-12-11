import React, { Component } from 'react';

import Nav from './Nav';
import ItemPage from './ItemPage';
import CartPage from './CartPage';
import IconCart from './IconCart';
import {items} from './static-data';

import './App.css';


class App extends Component {
  state = {
    activeTab: 0,
    cart: []
  };

  handleTabChange = (index) => {
    this.setState({
      activeTab: index
    });
  }

  // handleAddToCart = (item) => {
  //   const {cart} = this.state;
  //   this.setState({
  //     cart: [ ...cart, item.id ]
  //   });
  // }
  handleAddToCart = (item) => {
    const {cart} = this.state;
    let indexItem =  cart.findIndex(el => item.id === el.id);
    //console.log('indexItem ', indexItem);
    this.setState(     
        { 
          cart:  indexItem !== -1 ? 
                  cart.map((el,index) => {
                      return (index === indexItem ? 
                        { ...el, count: ++el.count, totalPrice: el.count * el.price } 
                      : el);
                  })
                : [ ...cart, { ...item, count: 1, totalPrice: item.price } ]        
    });
  }

  // handleRemoveOne = (item) => {
  //   const {cart} = this.state;
  //   //let newCart = cart.filter (el => item.id !== el.id);
  //   let index = cart.indexOf(item.id);
  //   this.setState({
  //     cart: [ ...cart.slice(0,index), ...cart.slice(index + 1) ]
  //   });
  // }
  handleRemoveOne = (item) => {
    const {cart} = this.state;
    let indexItem =  cart.findIndex(el => item.id === el.id);
    let countItem = cart[indexItem].count;
    //console.log(`rem cart[${indexItem}]: ${cart[indexItem]}`);
    //console.log('cart[indexItem].count - ', cart[indexItem].count );
    this.setState({
       cart: countItem>1 ? 
                cart.map((el,index) => {
                            return (index === indexItem ? 
                              { ...el, count: el.count-1 } 
                            : el);
                        })
                : cart.filter((el,index) => index !== indexItem )
    });
  }

  // handleRemoveItem = (item) => {
  //   const {cart} = this.state;
  //   this.setState({
  //     cart: cart.filter(el => item.id !== el.id)
  //   });
  // }

  // SummPriceCart = () => {
  //   const {cart} = this.state;
  //   // let totalPrice = cart.reduce(totalPrice,item => {
  //   //     return totalPrice + item.count * item.price;
  //   //         });
  //   let totalCountCart = cart.reduce((totalCountCart,item) => {
  //       totalCountCart.count = totalCountCart.count++ || 0;
  //       totalCountCart.price += item.price;
  //       return totalCountCart;
  //   }, {});
  // } 

  _renderCart() {
    // Count how many of each item is in the cart
    let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      itemCounts[itemId] = itemCounts[itemId] || 0;
      itemCounts[itemId]++;
      return itemCounts;
    }, {});

    // Create an array of items
    let cartItems = Object.keys(itemCounts).map(itemId => {
      // Find the item by its id
      var item = items.find(item =>
          item.id === parseInt(itemId, 10)
      );
      
      // Create a new "item" and add the 'count' property
      return {
        ...item,
        count: itemCounts[itemId]
      }
    });

    // count Total

    let totalPrice = 0;
    if(cartItems.length>0) {
        totalPrice = cartItems.map(itemCart => 
                                             (itemCart.price * itemCart.count)
                            ).reduce((summPrice, TotalPriceItem) => {
              return summPrice + TotalPriceItem;
            });
    }

    return (
      <CartPage
        items={cartItems}
        onAddOne={this.handleAddToCart}
        onRemoveOne={this.handleRemoveOne}
        totalPriceCart={totalPrice}
      />
    );
  }

  // renderContent() {
  //   switch(this.state.activeTab) {
  //     default:
  //     case 0: return <ItemPage
  //                       items={items}
  //                       onAddToCart={this.handleAddToCart}
  //                     />
  //     case 1: return  this.renderCart();
  //   }
  // }

  SummPriceCart = () => {
    const {cart} = this.state;
    let totalPriceCart = cart.length>0 ? 
        cart.reduce((totalPriceCart, item) => {
              return totalPriceCart + item.totalPrice;
            }, 0)
        : 0;
    return totalPriceCart;
  }

  CountItemsCart = () => {
    const {cart} = this.state;
    let totalCountItems = cart.length>0 ? 
        cart.reduce((totalCountItems, item) => {
              return totalCountItems + item.count;
            }, 0)
        : 0;
    return totalCountItems;
  }

  renderIconCart() {
    //const {cart} = this.state;
    let totalCountCart = this.CountItemsCart();
    let totalPriceCart = this.SummPriceCart();
    if (totalCountCart>0) {
      return (
              <IconCart
                countItems={totalCountCart}
                totalPriceCart={totalPriceCart}
                onTabChange={this.handleTabChange}
              />
             );
    }

    return null;
  }

  renderContent() {
    const {cart} = this.state;
    let totalPriceCart = this.SummPriceCart();
    //console.log('App totalPriceCart - ', totalPriceCart);
    switch(this.state.activeTab) {
      default:
      case 0: return <ItemPage
                        items={items}
                        onAddToCart={this.handleAddToCart}
                      />
      case 1: return  <CartPage
                        items={cart}
                        onAddOne={this.handleAddToCart}
                        onRemoveOne={this.handleRemoveOne}
                        totalPriceCart={totalPriceCart}
                      />
    }
  }

  render() {
    let {activeTab } = this.state;
    
    //console.log('App countItemsCart - ', countItemsCart);
    return (
      <div className="App">
        <Nav
          activeTab={activeTab}
          onTabChange={this.handleTabChange}
          items={items}
        >
          {this.renderIconCart()}
        </Nav>
        <main className="App-content">
          {this.renderContent()}
        </main>
      </div>
    );
  }
}

export default App;
