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

				<SplitVertical isAnimated isExpanded={this.state.isExpanded}>
					<SplitVertical.LeftPane isPrimary>
						<p>This is now the primary pane.</p>
						<p>
							Sunt nihil franzen fap VHS. Food truck artisan irony photo booth meh, migas pariatur thundercats. Hoodie eiusmod nulla qui godard gochujang. Venmo duis bitters poutine. Cupidatat raw denim franzen, ethical butcher chia occupy echo park church-key ramps proident. Fugiat placeat 90's keytar, bitters beard ullamco authentic adipisicing post-ironic salvia aliquip labore bespoke. Odio cold-pressed tumblr polaroid.
						</p>
					</SplitVertical.LeftPane>
					<SplitVertical.RightPane>
						<p>This side will be collapsed.</p>
						<p>
							Tote bag beard pariatur single-origin coffee portland farm-to-table. Chambray thundercats salvia echo park meditation ut readymade. Venmo occaecat magna placeat single-origin coffee, disrupt est blog fugiat. Chillwave knausgaard ennui velit polaroid. Godard anim aute, occupy dolor qui try-hard ut thundercats esse adipisicing kinfolk. Cray pug ethical ad cliche et, forage green juice consequat shabby chic gentrify fingerstache lomo scenester vegan. Ex labore beard, trust fund neutra chicharrones banjo consectetur jean shorts iPhone messenger bag.
						</p>
					</SplitVertical.RightPane>
				</SplitVertical>

			</section>
		);
	},
});
