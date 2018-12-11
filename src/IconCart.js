import React from 'react';
import PropTypes from 'prop-types';
import './IconCart.css';

const IconCart = ({ countItems, totalPriceCart, onTabChange }) => (
	
		<div className = 'IconCart'>
			<a onClick = {() => onTabChange(1)}>
			<div className = 'IconCart-item'>
				<i className="fas fa-shopping-cart"></i>
			</div>
			<div className = 'IconCart-item'>
				{countItems} items 
			</div>
			<div className = 'IconCart-item'>
				(${totalPriceCart})
			</div>
			</a>
		</div>
	
);

/// IconCart.propTypes = {
// 	countItems: 		 PropTypes.number.isRequired,
// 	totalPriceCart: 	 PropTypes.number.isRequired
// };

export default IconCart;