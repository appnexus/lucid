import React from 'react';
import createClass from 'create-react-class';
import { SplitVertical } from '../../../index';

export default createClass({
	render() {
		return (
			<SplitVertical>
				<SplitVertical.LeftPane>
					<p>
						Bicycle rights tofu hashtag blue bottle viral. Mixtape kinfolk mustache, iPhone godard voluptate direct trade pork belly truffaut duis sunt. 8-bit microdosing retro, excepteur direct trade offal listicle kale chips selvage master cleanse sustainable laborum migas helvetica. Man bun esse synth man braid fashion axe post-ironic id, fanny pack PBR&B. Scenester truffaut culpa yr heirloom, fanny pack intelligentsia dreamcatcher dolore nisi green juice ad you probably haven't heard of them raw denim. Before they sold out laborum poutine 90's, blog voluptate chambray whatever. Excepteur ea kinfolk, irure photo booth brooklyn art party master cleanse mlkshk pug.
					</p>
				</SplitVertical.LeftPane>
				<SplitVertical.RightPane>
					<p>
						Aliquip hella incididunt, fashion axe irure small batch single-origin coffee ullamco. Offal fugiat salvia brooklyn meditation occaecat polaroid, fashion axe culpa intelligentsia. Sint ex intelligentsia fixie assumenda sriracha laborum, portland literally bespoke you probably haven't heard of them. Delectus skateboard put a bird on it, in kale chips messenger bag lo-fi. Cred nihil tote bag street art, id et velit authentic ullamco excepteur cold-pressed fixie shabby chic art party blue bottle. Mumblecore tempor selvage cray put a bird on it. Flexitarian crucifix tempor do pinterest, cornhole street art fap affogato selfies distillery consectetur listicle.
					</p>
				</SplitVertical.RightPane>
			</SplitVertical>
		);
	},
});
