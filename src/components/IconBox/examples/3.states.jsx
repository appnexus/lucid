import React from 'react';
import createClass from 'create-react-class';
import IconBox from '../IconBox';
import ClockIcon from '../../Icon/ClockIcon/ClockIcon';

export default createClass({
	render() {
		const style = {
			marginRight: '10px',
			display: 'grid',
			justifyItems: 'center',
		};
		return (
			<section
				style={{
					display: 'flex',
				}}
			>
				<article style={style}>
					<h3>Is Active</h3>
					<IconBox
						Icon={ClockIcon}
						Label="My IconBox"
						isCheckbox={true}
						isActive={true}
					/>
				</article>
				<article style={style}>
					<h3>Is Disabled</h3>
					<IconBox
						Icon={ClockIcon}
						Label="My IconBox"
						isCheckbox={true}
						isDisabled={true}
					/>
				</article>
				<article style={style}>
					<h3>Is Indeterminate</h3>
					<IconBox
						Icon={ClockIcon}
						Label="My IconBox"
						isCheckbox={true}
						isIndeterminate={true}
					/>
				</article>
				<article style={style}>
					<h3>Is Selected</h3>
					<IconBox
						Icon={ClockIcon}
						Label="My IconBox"
						isCheckbox={true}
						isSelected={true}
					/>
				</article>
			</section>
		);
	},
});
