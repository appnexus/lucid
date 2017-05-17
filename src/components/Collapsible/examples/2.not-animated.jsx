import React from 'react';
import createClass from 'create-react-class';
import { Collapsible } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isExpanded: true,
		};
	},

	handleToggle() {
		this.setState({
			isExpanded: !this.state.isExpanded,
		});
	},

	render() {
		return (
			<section>

				<button onClick={this.handleToggle}>toggle</button>

				<Collapsible
					isAnimated={false}
					isExpanded={this.state.isExpanded}
					style={{ background: 'lightgray' }}
				>
					<p>
						Kitsch aesthetic gluten-free bitters affogato, you probably haven't heard of them DIY in cornhole sunt meditation man braid cardigan. Selfies stumptown sriracha, small batch williamsburg synth organic aute mlkshk beard venmo normcore XOXO freegan chambray. Freegan delectus next level nostrud intelligentsia swag. Pabst delectus selfies kale chips, duis pariatur locavore iPhone. Chia 3 wolf moon tofu messenger bag pop-up intelligentsia. Pinterest excepteur yuccie four dollar toast DIY. Plaid drinking vinegar locavore id mustache.
					</p>
					<p>
						Flexitarian gentrify taxidermy, bitters chambray swag etsy brunch kogi pork belly authentic. Direct trade put a bird on it ad bespoke, occaecat marfa cliche nisi aliquip kale chips synth readymade. Odio austin keytar pour-over fugiat. Pickled everyday carry laborum sartorial pinterest labore, organic voluptate banh mi kitsch. Leggings austin thundercats cliche. Neutra typewriter sapiente, intelligentsia semiotics +1 esse ex authentic aesthetic banh mi drinking vinegar knausgaard. Id tousled culpa, ut chia cillum actually fashion axe cronut forage assumenda tilde ramps.
					</p>
				</Collapsible>

			</section>
		);
	},
});
