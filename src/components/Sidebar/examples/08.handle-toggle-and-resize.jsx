import React from 'react';
import createClass from 'create-react-class';
import { Sidebar } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			resizeWidth: null,
			isExpanded: true,
		};
	},

	handleToggle() {
		this.setState({ isExpanded: !this.state.isExpanded });
	},

	handleResizing(width) {
		this.setState({ resizeWidth: width });
	},

	handleResize(width) {
		this.setState({ resizeWidth: width });
	},

	render() {
		return (
			<section>
				<p>isExpanded: {`${this.state.isExpanded}`}</p>
				<p>resizeWidth: {`${this.state.resizeWidth}`}</p>

				<Sidebar
					onResizing={this.handleResizing}
					onResize={this.handleResize}
					onToggle={this.handleToggle}
				>
					<Sidebar.Bar>
						Non cliche minim normcore ullamco, iPhone etsy banh mi farm-to-table mumblecore stumptown asymmetrical wolf pour-over odio.
					</Sidebar.Bar>
					<Sidebar.Primary>
						You probably haven't heard of them fingerstache art party messenger bag, 3 wolf moon cold-pressed helvetica nesciunt id anim. Leggings labore dolor, cliche letterpress normcore banh mi aliquip ramps crucifix DIY. Occupy est DIY delectus kitsch, raw denim marfa literally poutine. Anim viral chia, keffiyeh ramps gastropub +1 wolf fixie austin church-key. Hammock placeat tote bag craft beer. Offal plaid PBR&B, art party lo-fi ea poutine kitsch ad. Duis flannel semiotics church-key YOLO.
					</Sidebar.Primary>
				</Sidebar>

			</section>
		);
	},
});
