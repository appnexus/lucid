import _ from 'lodash';
import React from 'react';

import ColorPalette from '../ColorPalette';

const colorList = [
	{
		category: 'basic',
		colors: [
			{
				varName: 'white',
				hex: '#fff'
			},
			{
				varName: 'black',
				hex: '#000'
			},
			{
				varName: 'borderColor',
				hex: '@color-gray'
			},
			{
				varName: 'backgroundColor',
				hex: '@color-lightGray'
			},
		]
	},
	{
		category: 'transparent gray',
		colors: [
			{
				varName: 'gray-5',
				hex: 'fade(@color-black, 5%)'
			},
			{
				varName: 'gray-10',
				hex: 'fade(@color-black, 10%)'
			},
			{
				varName: 'gray-25',
				hex: 'fade(@color-black, 25%)'
			},
			{
				varName: 'gray-30',
				hex: 'fade(@color-black, 30%)'
			},
		]
	},
	{
		category: 'grays',
		colors: [
			{
				varName: 'lightGray',
				hex: '#f4f4f4'
			},
			{
				varName: 'gray',
				hex: '#e3e3e3'
			},
			{
				varName: 'mediumGray',
				hex: '#c5c5c5'
			},
			{
				varName: 'darkGray',
				hex: '#333333'
			},
		]
	},
	{
		category: 'featured colors',
		colors: [
			{
				varName: 'default',
				hex: '#f3f3f3'
			},
			{
				varName: 'primary',
				hex: '#2abbb0'
			},
			{
				varName: 'success',
				hex: '#3fa516'
			},
			{
				varName:'info',
				hex: '#0089c4'
			},
			{
				varName: 'warning',
				hex: '#feb209'
			},
			{
				varName: 'danger',
				hex: '#f7403a'
			},
		]
	},
	{
		category: 'featured default',
		colors: [
			{varName: 'default-borderColor', hex: '#c5c5c5'},
			{varName: 'default-backgroundColor', hex: '#ededed'},
			{varName: 'default-gradientStartColor', hex: '#f3f3f3'},
			{varName: 'default-gradientEndColor', hex: '#e2e2e2'},
		]
	},
	{
		category: 'featured primary',
		colors: [
			{varName: 'primary-borderColor', hex: '@color-primary'},
			{varName: 'primary-borderColorLite', hex: 'fade(@color-primary, 30%)'},
			{varName: 'primary-backgroundColor', hex: 'fade(@color-primary, 40%)'},
			{varName: 'primary-gradientStartColor', hex: 'fade(@color-primary, 70%)'},
			{varName: 'primary-gradientEndColor', hex: '@color-primary'},
		]
	},
	{
		category: 'featured success',
		colors: [
			{varName: 'success-borderColor', hex: '@color-success'},
			{varName: 'success-borderColorLite', hex: 'fade(@color-success, 30%)'},
			{varName: 'success-backgroundColor', hex: 'fade(@color-success, 40%)'},
			{varName: 'success-gradientStartColor', hex: 'fade(@color-success, 70%)'},
			{varName: 'success-gradientEndColor', hex: '@color-success'},
		]
	},
	{
		category: 'featured info',
		colors: [
			{varName: 'info-borderColor', hex: '@color-info'},
			{varName: 'info-borderColorLite', hex: 'fade(@color-info, 30%)'},
			{varName: 'info-backgroundColor', hex: 'fade(@color-info, 40%)'},
			{varName: 'info-gradientStartColor', hex: 'fade(@color-info, 70%)'},
			{varName: 'info-gradientEndColor', hex: '@color-info'},
		]
	},
	{
		category: 'featured warning',
		colors: [
			{varName: 'warning-borderColor', hex: '@color-warning'},
			{varName: 'warning-borderColorLite', hex: 'fade(@color-warning, 30%)'},
			{varName: 'warning-backgroundColor', hex: 'fade(@color-warning, 40%)'},
			{varName: 'warning-gradientStartColor', hex: 'fade(@color-warning, 70%)'},
			{varName: 'warning-gradientEndColor', hex: '@color-warning'},
		]
	},
	{
		category: 'featured danger',
		colors: [
			{varName: 'danger-borderColor', hex: '@color-danger'},
			{varName: 'danger-borderColorLite', hex: 'fade(@color-danger, 30%)'},
			{varName: 'danger-backgroundColor', hex: 'fade(@color-danger, 40%)'},
			{varName: 'danger-gradientStartColor', hex: 'fade(@color-danger, 70%)'},
			{varName: 'danger-gradientEndColor', hex: '@color-danger'},
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
								className={`lucid-ColorPalette-color-${color.varName}`}
								variableName={`@${color.varName};`}
								hexString={color.hex}
							/>
						))}
					</div>
				))}
			</div>
		);
	}
});
