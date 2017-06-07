import React from 'react';
import createClass from 'create-react-class';
import { SplitVertical } from '../../../index';

export default createClass({
	render() {
		return (
			<SplitVertical>
				<SplitVertical.LeftPane width={250}>
					<p>
						Jean shorts reprehenderit in, commodo godard skateboard retro heirloom street art church-key. Gochujang sint hella food truck, officia next level sriracha listicle knausgaard try-hard 3 wolf moon kale chips. Offal scenester quinoa, hammock qui sint direct trade heirloom. Bushwick letterpress pabst, odio nihil sapiente ex cold-pressed flannel laboris wayfarers retro marfa jean shorts. Chia next level cardigan, deserunt church-key asymmetrical ennui messenger bag portland. Aute selvage cred gastropub freegan literally. Readymade artisan distillery occaecat qui.
					</p>
				</SplitVertical.LeftPane>
				<SplitVertical.RightPane isPrimary>
					<p>
						Plaid wolf cold-pressed, post-ironic etsy roof party tilde tattooed pug stumptown sed tofu art party ennui. Asymmetrical wayfarers dolor dolore, nisi mollit sed austin skateboard readymade 90's tumblr fugiat sint shoreditch. Cillum intelligentsia esse next level polaroid, beard vero. Qui polaroid portland beard artisan. Mixtape qui hella est. Fap consectetur freegan roof party duis mollit. Mixtape swag mustache, twee fashion axe sustainable ennui aliquip mlkshk gastropub seitan commodo photo booth blue bottle.
					</p>
				</SplitVertical.RightPane>
			</SplitVertical>
		);
	},
});
