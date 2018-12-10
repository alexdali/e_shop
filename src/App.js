import React, { Component } from 'react';

import Nav from './Nav';
import ItemPage from './ItemPage';
import CartPage from './CartPage';
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

  handleAddToCart = (item) => {
    const {cart} = this.state;
    this.setState({
      cart: [ ...cart, item.id ]
    });
  }

  handleRemoveOne = (item) => {
    const {cart} = this.state;
    //let newCart = cart.filter (el => item.id !== el.id);
    let index = cart.indexOf(item.id);
    this.setState({
      cart: [ ...cart.slice(0,index), ...cart.slice(index + 1) ]
    });
  }

  renderCart() {
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

    return (
      <CartPage
        items={cartItems}
        onAddOne={this.handleAddToCart}
        onRemoveOne={this.handleRemoveOne}
      />
    );
  }

  renderContent() {
    switch(this.state.activeTab) {
      default:
      case 0: return <ItemPage
                        items={items}
                        onAddToCart={this.handleAddToCart}
                      />
      case 1: return  this.renderCart();
    }
  }

  render() {
    let {activeTab } = this.state;

    return (
      <div className="App">
        <Nav
          activeTab={activeTab}
          onTabChange={this.handleTabChange}
          items={items}
        />
        <main className="App-content">
          {this.renderContent()}
        </main>
      </div>
    );
  }
}

export default App;
