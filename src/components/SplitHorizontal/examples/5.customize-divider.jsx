import React from 'react';
import createClass from 'create-react-class';
import { SplitHorizontal } from '../../../index';

export default createClass({
	render() {
		return (
			<SplitHorizontal>
				<SplitHorizontal.TopPane>
					<p>
						Waistcoat man bun sartorial, PBR&B artisan blue bottle laboris disrupt pug dreamcatcher readymade gluten-free fingerstache placeat. Enim salvia celiac, veniam polaroid stumptown velit PBR&B. Ramps delectus cupidatat dolore. Portland try-hard slow-carb cronut, drinking vinegar readymade nulla pug aliqua cray VHS eiusmod odio incididunt wolf. 3 wolf moon gentrify mustache blog freegan, literally ut helvetica stumptown godard synth direct trade. Sapiente slow-carb deep v, YOLO direct trade irony before they sold out tempor. Sunt aliqua seitan banjo.
					</p>
				</SplitHorizontal.TopPane>

				<SplitHorizontal.Divider
					style={{
						height: 18,
						background: 'gray',
						color: 'white',
						textAlign: 'center',
					}}
				>
					D I V I D E R
				</SplitHorizontal.Divider>

				<SplitHorizontal.BottomPane>
					<p>
						Exercitation fixie distillery pickled, gentrify meh laborum accusamus quinoa street art craft beer migas affogato chia. PBR&B cillum dolore, tilde sed eu tote bag narwhal vero schlitz chambray viral raw denim velit single-origin coffee. Occupy tempor hashtag non. Wayfarers bitters blog fixie mollit flexitarian forage. Listicle sriracha bespoke, laborum direct trade skateboard cliche umami selvage velit art party sartorial forage veniam. Authentic tattooed nesciunt before they sold out, blue bottle bicycle rights gastropub magna veniam hammock. Sint venmo nihil, meditation voluptate readymade banh mi.
					</p>
				</SplitHorizontal.BottomPane>
			</SplitHorizontal>
		);
	},
});
