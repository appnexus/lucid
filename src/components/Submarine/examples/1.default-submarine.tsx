import React from 'react';
import createClass from 'create-react-class';
import { Submarine } from '../../../index';

export default createClass({
	render() {
		return (
			<section
				style={{
					height: 300,
					background: 'lightgray',
					outline: '1px solid lightgray',
				}}
			>
				<Submarine>
					<Submarine.Bar>
						Minim 90's paleo retro, fugiat aliqua hashtag enim photo booth
						listicle next level. Consectetur fap proident magna culpa. Art party
						meh ad, four loko slow-carb venmo distillery wolf cornhole nisi.
					</Submarine.Bar>
					<Submarine.Primary>
						Twee iPhone intelligentsia, schlitz normcore cold-pressed hella
						sapiente meh adipisicing sustainable kogi sed. Letterpress plaid
						aute, brunch chillwave anim mlkshk. Farm-to-table austin
						post-ironic, man bun gluten-free nesciunt sartorial tacos tousled
						kickstarter shabby chic migas. Kombucha flannel before they sold out
						elit voluptate pinterest chambray, odio stumptown street art. Kitsch
						humblebrag actually, cillum kale chips hashtag shoreditch pariatur
						waistcoat pop-up consequat leggings try-hard. Marfa crucifix seitan
						health goth portland. Cliche ennui vero, whatever swag kogi ugh
						fixie wayfarers before they sold out irure culpa marfa mlkshk
						bushwick.
					</Submarine.Primary>
				</Submarine>
			</section>
		);
	},
});
