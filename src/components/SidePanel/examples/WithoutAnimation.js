import React from 'react';
import { SidePanel } from '../../../src/index.js';

export default class extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { isExpanded: true };
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle() {
		this.setState({
			isExpanded: !this.state.isExpanded,
		});
	}

	render() {
		return (
			<section>
				<p>transition animations can be disabled if desired</p>
				<button onClick={this.handleToggle}>Toggle SidePanel</button>

				<SidePanel
					isAnimated={false}
					isExpanded={this.state.isExpanded}
					onCollapse={this.handleToggle}
					Header="Stumptown keytar schlitz"
				>
					<p>
						Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
						crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
						helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
						pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
						schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
						chic tofu celiac shaman, twee af squid blue bottle street art.
						Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
						portland beard celiac polaroid.
					</p>
					<p>
						Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk four
						loko selfies ramps pop-up coloring book before they sold out yuccie
						biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
						synth. Fanny pack farm-to-table pok pok, next level trust fund
						live-edge asymmetrical art party intelligentsia listicle sriracha.
						Tote bag ugh meggings, selfies vegan blog locavore messenger bag
						chambray etsy heirloom cronut enamel pin hammock umami. Bushwick
						venmo activated charcoal, mumblecore skateboard hashtag literally
						brooklyn etsy ennui 3 wolf moon. Before they sold out blog iPhone
						subway tile, truffaut dreamcatcher organic raclette portland
						whatever brooklyn succulents flexitarian gentrify cray. Kogi subway
						tile gochujang dreamcatcher.
					</p>
				</SidePanel>
			</section>
		);
	}
}
