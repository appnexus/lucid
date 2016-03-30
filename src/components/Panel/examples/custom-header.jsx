import React from 'react';
import Panel from '../Panel';
import CheckIcon from '../../Icon/CheckIcon/CheckIcon';
import SuccessIcon from '../../Icon/SuccessIcon/SuccessIcon';

export default React.createClass({
	render() {
		return (
			<div>
				<Panel>
					<Panel.Header>
						<SuccessIcon /> Header <CheckIcon style={{float: 'right'}} />
					</Panel.Header>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula ornare ex. Proin dui magna, dapibus in neque sed, aliquet ornare felis. Suspendisse mollis augue vitae sem tincidunt blandit. Vivamus accumsan tincidunt lectus, vehicula pretium magna rutrum ac. Etiam vitae porttitor sem. Curabitur non egestas dui. Nunc aliquam, nulla sit amet hendrerit maximus, turpis nisi vehicula lectus, nec lacinia neque neque consequat est. Vestibulum mattis lorem tellus, ac suscipit neque scelerisque in. Nunc accumsan mi quam, a blandit justo rhoncus ac. Pellentesque laoreet sed tellus eu congue.
					In odio nisl, eleifend sed tortor sed, semper tincidunt magna. Sed feugiat ornare purus, sit amet ullamcorper diam pellentesque ut. Sed congue ornare massa sit amet iaculis. Maecenas tempor, ligula quis maximus tempus, nulla arcu maximus metus, quis ullamcorper metus nisi id ante. Pellentesque a sapien ac purus consectetur sollicitudin ac mollis ligula. Praesent nisl nibh, euismod ac elementum sit amet, iaculis ac nisi. Suspendisse et magna a nunc placerat elementum et ut purus. Duis volutpat luctus tortor, et pulvinar enim faucibus sed. Morbi bibendum molestie ante, eget elementum libero lobortis laoreet. Etiam quam erat, imperdiet at dui in, viverra suscipit ante. Mauris ante diam, maximus non gravida vitae, auctor eget arcu. Cras a volutpat leo. Donec luctus condimentum posuere.
				</Panel>
			</div>
		);
	}
});
