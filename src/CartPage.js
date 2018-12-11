import React from 'react';
import PropTypes from 'prop-types';
import './CartPage.css';

import Item from './Item';

function CartPage({ items, onAddOne, onRemoveOne, totalPriceCart }) {
	//console.log('totalPriceCart - ', totalPriceCart);
	//if (true) {return <div>Your cart is empty</div>};
	return (
			<>	
				<ul className = 'CartPage-items'>
					{items.map(item => 
						<li key={item.id} className='CartPage-item'>
							<Item item={item}>
								<div className='CartItem-controls'>
										<button
											className = 'CartItem-removeOne'
											onClick = {() => onRemoveOne(item)}
										>
											&ndash;
										</button>
										<span className = 'CartItem-count'>
											{item.count}
										</span>
										<button
											className = 'CartItem-addOne'
											onClick = {() => onAddOne(item)}
										>
											+
										</button>
								</div>
							</Item>
						</li>
					)}
				</ul>
				{
					(
						totalPriceCart !== 0 &&
						<div className = 'CartPage-totalPrice'>
							Total: ${totalPriceCart}
						</div>
					) || 
					<div className = 'CartPage-Empty'>
						<div>Your cart is empty.</div>
						<div>Why not add some expensive products to it?</div>
					</div> 
				}	
			</>	
	);
}

CartPage.propTypes = {
	items: 		 PropTypes.array.isRequired,
	onAddOne: 	 PropTypes.func.isRequired,
	onRemoveOne: PropTypes.func.isRequired
};

export default CartPage;