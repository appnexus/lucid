import React from 'react';
import createClass from 'create-react-class';
import { Submarine } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			resizeHeight: null,
			isExpanded: true,
		};
	},

	handleToggle() {
		this.setState({ isExpanded: !this.state.isExpanded });
	},

	handleResizing(height) {
		this.setState({ resizeHeight: height });
	},

	handleResize(height) {
		this.setState({ resizeHeight: height });
	},

	render() {
		return (
			<section>
				<p>isExpanded: {`${this.state.isExpanded}`}</p>
				<p>resizeHeight: {`${this.state.resizeHeight}`}</p>

				<section
					style={{
						height: 300,
						background: 'lightgray',
						outline: '1px solid lightgray',
					}}
				>

					<Submarine
						onResizing={this.handleResizing}
						onResize={this.handleResize}
						onToggle={this.handleToggle}
					>
						<Submarine.Bar>
							Non cliche minim normcore ullamco, iPhone etsy banh mi farm-to-table mumblecore stumptown asymmetrical wolf pour-over odio.
						</Submarine.Bar>
						<Submarine.Primary>
							You probably haven't heard of them fingerstache art party messenger bag, 3 wolf moon cold-pressed helvetica nesciunt id anim. Leggings labore dolor, cliche letterpress normcore banh mi aliquip ramps crucifix DIY. Occupy est DIY delectus kitsch, raw denim marfa literally poutine. Anim viral chia, keffiyeh ramps gastropub +1 wolf fixie austin church-key. Hammock placeat tote bag craft beer. Offal plaid PBR&B, art party lo-fi ea poutine kitsch ad. Duis flannel semiotics church-key YOLO.
						</Submarine.Primary>
					</Submarine>

				</section>

			</section>
		);
	},
});
