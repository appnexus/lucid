import _ from 'lodash';
import React from 'react';

import ColorPalette from '../ColorPalette';

const colorList = [
	{
		category: 'basic',
		colors: [
			'white',
			'black',
			'borderColor',
			'backgroundColor',
		]
	},
	{
		category: 'transparent gray',
		colors: [
			'gray-5',
			'gray-10',
			'gray-25',
			'gray-30',
		]
	},
	{
		category: 'grays',
		colors: [
			'lightGray',
			'gray',
			'mediumGray',
			'darkGray',
		]
	},
	{
		category: 'featured colors',
		colors: [
			'default',
			'primary',
			'success',
			'info',
			'warning',
		]
	},
	{
		category: 'featured default',
		colors: [
			'default-borderColor',
			'default-backgroundColor',
			'default-gradientStartColor',
			'default-gradientEndColor',
		]
	},
	{
		category: 'featured primary',
		colors: [
			'primary-borderColor',
			'primary-backgroundColor',
			'primary-gradientStartColor',
			'primary-gradientEndColor',
		]
	},
	{
		category: 'featured success',
		colors: [
			'success-borderColor',
			'success-backgroundColor',
			'success-gradientStartColor',
			'success-gradientEndColor',
		]
	},
	{
		category: 'featured info',
		colors: [
			'info-borderColor',
			'info-backgroundColor',
			'info-gradientStartColor',
			'info-gradientEndColor',
		]
	},
	{
		category: 'featured warning',
		colors: [
			'warning-borderColor',
			'warning-backgroundColor',
			'warning-gradientStartColor',
			'warning-gradientEndColor',
		]
	},
	{
		category: 'featured danger',
		colors: [
			'danger-borderColor',
			'danger-backgroundColor',
			'danger-gradientStartColor',
			'danger-gradientEndColor',
		]
	},
];

export default React.createClass({
	render() {
		return (
			<div>
				{_.map(colorList, (group, i) => (
					<div key={i} style={{display: 'flex', flexWrap: 'wrap'}}>
						{console.log(group)}
						<h2 style={{flex: '1 0 100%'}}>{group.category}</h2>
						{_.map(group.colors, (color) => (
							<ColorPalette
								className={`lucid-ColorPalette-color-${color}`}
								variableName={`@${color};`}
							/>
						))}
					</div>
				))}
			</div>
		);
	}
});
