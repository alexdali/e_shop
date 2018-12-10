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

  renderContent() {
    switch(this.state.activeTab) {
      default:
      case 0: return <ItemPage
                        items={items}
                        onAddToCart={this.handleAddToCart}
                      />
      case 1: return  <CartPage
                        items={this.state.cart}
                      />
    }
  }

  render() {
    let {activeTab, cart } = this.state;

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
