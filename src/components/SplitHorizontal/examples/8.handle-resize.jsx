import React from 'react';
import createClass from 'create-react-class';
import { SplitHorizontal } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			newHeight: null,
		};
	},

	handleResizing(height) {
		this.setState({ newHeight: height });
	},

	handleResize(height) {
		this.setState({ newHeight: height });
	},

	render() {
		return (
			<section>

				New Height: {`${this.state.newHeight}`}

				<section style={{ height: 300, outline: '1px solid #e3e3e3' }}>

					<SplitHorizontal
						style={{ height: '100%' }}
						onResizing={this.handleResizing}
						onResize={this.handleResize}
					>
						<SplitHorizontal.TopPane height={250}>
							<p>
								Occupy biodiesel nesciunt pug fugiat. VHS accusamus intelligentsia, chartreuse raw denim kogi bushwick cold-pressed chia heirloom sint forage. Cornhole affogato swag duis hella, pabst bitters trust fund heirloom viral blog selfies green juice commodo nulla. Single-origin coffee 8-bit ugh jean shorts proident, tote bag small batch meditation poutine next level lo-fi. Ethical before they sold out shoreditch, etsy man braid semiotics ea health goth squid aliquip drinking vinegar kinfolk excepteur polaroid. Meh schlitz cred tattooed chartreuse 3 wolf moon. Lumbersexual poutine kinfolk hella chartreuse thundercats.
							</p>
						</SplitHorizontal.TopPane>
						<SplitHorizontal.BottomPane>
							<p>
								Bitters jean shorts trust fund, typewriter assumenda lomo kickstarter waistcoat kombucha officia semiotics fanny pack yr. Ex quinoa nulla franzen, mollit enim kinfolk deep v pop-up consequat. Drinking vinegar beard cillum portland. Beard chambray sartorial est, enim mumblecore craft beer irony paleo pork belly typewriter ugh trust fund blog elit. Nostrud green juice fingerstache, adipisicing art party kitsch gochujang try-hard eu you probably haven't heard of them sed cornhole thundercats iPhone food truck. Scenester poutine tote bag, pug humblebrag 90's ullamco craft beer vice sed actually fanny pack gentrify. Flexitarian kale chips odio minim.
							</p>
						</SplitHorizontal.BottomPane>
					</SplitHorizontal>

				</section>

			</section>
		);
	},
});
