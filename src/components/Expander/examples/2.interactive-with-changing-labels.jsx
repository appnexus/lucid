import React from 'react';
import createClass from 'create-react-class';
import { Expander } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isExpanded: false,
		};
	},

	render() {
		return (
			<div>
				<Expander
					isExpanded={this.state.isExpanded}
					onToggle={this.handleExpanded}
				>
					<Expander.Label>
						{this.state.isExpanded ? 'Show Less' : 'Show More'}
					</Expander.Label>
					<p>
						Artisan helvetica quinoa kogi fingerstache, biodiesel church-key blue bottle everyday carry schlitz seitan locavore. Retro +1 tilde, normcore post-ironic chillwave PBR&B umami. Mlkshk mumblecore meh, kitsch pickled wolf helvetica man bun cronut keffiyeh meggings ramps. Banh mi stumptown cronut wayfarers. Banh mi venmo street art chicharrones, put a bird on it yuccie cornhole poutine knausgaard echo park tilde retro. Occupy XOXO etsy meh pabst blue bottle. Photo booth four loko biodiesel, cornhole chicharrones echo park actually pork belly gochujang DIY gluten-free plaid microdosing salvia pinterest.
					</p>
					<p>
						Cred lumbersexual organic, echo park hashtag roof party pinterest shabby chic green juice salvia scenester hella ramps. Schlitz knausgaard church-key disrupt, four loko XOXO bicycle rights post-ironic four dollar toast fixie butcher mustache tousled humblebrag. Bushwick 8-bit swag, wolf intelligentsia kickstarter roof party cred meh semiotics flannel. Typewriter umami narwhal irony, slow-carb VHS street art cold-pressed wayfarers sriracha everyday carry church-key wolf humblebrag. Skateboard polaroid man braid organic, chambray mustache mixtape freegan humblebrag brunch ugh. Wayfarers VHS brooklyn, fashion axe green juice next level kombucha cray shabby chic lo-fi. Lumbersexual pug farm-to-table, authentic chartreuse street art church-key.
					</p>
					<p>
						3 wolf moon pickled messenger bag knausgaard venmo, retro aliquip portland asymmetrical cliche non pabst pinterest culpa. Laboris beard intelligentsia, pickled viral brooklyn YOLO tempor do cliche fugiat. Messenger bag fanny pack reprehenderit bicycle rights tilde, tumblr neutra do intelligentsia godard street art. Gentrify consectetur laboris, pug venmo literally you probably haven't heard of them actually locavore distillery commodo occupy franzen umami. Slow-carb bespoke pariatur four dollar toast, selfies tofu salvia artisan tousled meggings kinfolk chambray marfa direct trade single-origin coffee. Exercitation fap umami mollit deep v wolf, sint lomo sunt four dollar toast elit selvage vegan truffaut. Cillum pickled sartorial flexitarian chartreuse brooklyn.
					</p>
					<p>
						Artisan helvetica quinoa kogi fingerstache, biodiesel church-key blue bottle everyday carry schlitz seitan locavore. Retro +1 tilde, normcore post-ironic chillwave PBR&B umami. Mlkshk mumblecore meh, kitsch pickled wolf helvetica man bun cronut keffiyeh meggings ramps. Banh mi stumptown cronut wayfarers. Banh mi venmo street art chicharrones, put a bird on it yuccie cornhole poutine knausgaard echo park tilde retro. Occupy XOXO etsy meh pabst blue bottle. Photo booth four loko biodiesel, cornhole chicharrones echo park actually pork belly gochujang DIY gluten-free plaid microdosing salvia pinterest.
					</p>
					<p>
						Cred lumbersexual organic, echo park hashtag roof party pinterest shabby chic green juice salvia scenester hella ramps. Schlitz knausgaard church-key disrupt, four loko XOXO bicycle rights post-ironic four dollar toast fixie butcher mustache tousled humblebrag. Bushwick 8-bit swag, wolf intelligentsia kickstarter roof party cred meh semiotics flannel. Typewriter umami narwhal irony, slow-carb VHS street art cold-pressed wayfarers sriracha everyday carry church-key wolf humblebrag. Skateboard polaroid man braid organic, chambray mustache mixtape freegan humblebrag brunch ugh. Wayfarers VHS brooklyn, fashion axe green juice next level kombucha cray shabby chic lo-fi. Lumbersexual pug farm-to-table, authentic chartreuse street art church-key.
					</p>
					<p>
						3 wolf moon pickled messenger bag knausgaard venmo, retro aliquip portland asymmetrical cliche non pabst pinterest culpa. Laboris beard intelligentsia, pickled viral brooklyn YOLO tempor do cliche fugiat. Messenger bag fanny pack reprehenderit bicycle rights tilde, tumblr neutra do intelligentsia godard street art. Gentrify consectetur laboris, pug venmo literally you probably haven't heard of them actually locavore distillery commodo occupy franzen umami. Slow-carb bespoke pariatur four dollar toast, selfies tofu salvia artisan tousled meggings kinfolk chambray marfa direct trade single-origin coffee. Exercitation fap umami mollit deep v wolf, sint lomo sunt four dollar toast elit selvage vegan truffaut. Cillum pickled sartorial flexitarian chartreuse brooklyn.
					</p>
				</Expander>
			</div>
		);
	},

	handleExpanded(isExpanded) {
		this.setState({
			isExpanded,
		});
	},
});
