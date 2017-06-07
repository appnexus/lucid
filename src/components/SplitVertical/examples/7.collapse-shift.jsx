import React from 'react';
import createClass from 'create-react-class';
import { SplitVertical } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isExpanded: true,
		};
	},

	handleToggle() {
		this.setState({ isExpanded: !this.state.isExpanded });
	},
	render() {
		return (
			<section>

				<button onClick={this.handleToggle}>toggle</button>

				<SplitVertical
					collapseShift={64}
					isAnimated
					isExpanded={this.state.isExpanded}
				>
					<SplitVertical.LeftPane width={250}>
						<p>This pane will stick out by 64px when collapsed.</p>
						<p>
							Velit gastropub literally, cold-pressed humblebrag blog normcore consectetur selfies. Pork belly squid cold-pressed, vegan kitsch green juice swag single-origin coffee you probably haven't heard of them irony. Thundercats butcher nulla, sartorial VHS irure humblebrag chartreuse whatever cronut craft beer cliche tofu et pinterest.
						</p>
					</SplitVertical.LeftPane>
					<SplitVertical.RightPane isPrimary>
						<p>This is the primary pane.</p>
						<p>
							Schlitz veniam normcore etsy pug. Kickstarter cold-pressed small batch, echo park next level cray aesthetic sunt proident pabst scenester drinking vinegar etsy est. Pug bitters ethical, laborum forage dolore tofu tousled eiusmod. Meh skateboard consectetur, adipisicing keffiyeh pop-up street art. Normcore gochujang franzen ut, reprehenderit meggings sed ethical thundercats viral ea pitchfork yuccie placeat tofu. Sint church-key affogato kogi, you probably haven't heard of them cliche chicharrones ramps in. Yuccie fashion axe pabst, intelligentsia tilde whatever cardigan yr accusamus 3 wolf moon tacos literally magna pop-up.
						</p>
					</SplitVertical.RightPane>
				</SplitVertical>

			</section>
		);
	},
});
