import React from 'react';
import createClass from 'create-react-class';
import { ContextMenu, Button } from '../../../index';

export default createClass({
	render() {
		return (
			<section>

				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget tempor mi. Curabitur eget risus ac diam euismod ultricies ac in est. Morbi in vehicula arcu, at laoreet libero. Phasellus nisi dolor, porta et erat quis, egestas mattis purus.

				<ContextMenu isExpanded direction="up">

					<ContextMenu.Target>
						<Button>Target</Button>
					</ContextMenu.Target>

					<ContextMenu.FlyOut
						style={{
							background: 'white',
							boxShadow: '1px -1px 4px black',
							padding: 4,
						}}
					>
						FlyOut
					</ContextMenu.FlyOut>
				</ContextMenu>

				Sed vel ex iaculis, tincidunt magna in, fringilla urna. Aenean congue est nec elit molestie, nec mollis mi rutrum. Quisque hendrerit nisl placerat tempus sodales. Vivamus et tortor vulputate, elementum turpis tempor, condimentum sapien. Nunc ac imperdiet ipsum, vitae ullamcorper sem.

			</section>
		);
	},
});
