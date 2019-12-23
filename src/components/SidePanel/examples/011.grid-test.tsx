import React from 'react';
import { SidePanel } from '../../../index';
import { Panel } from '../../../index';
import _ from 'lodash';

const TestCell = ({ idx, style }: { idx: number; style: any }) => (
	<Panel style={{ padding: '10px' }}>{idx}</Panel>
);

const Grid = (props: { cells?: Array<any> } = { cells: [] }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '33% 33% 33%',
				gridTemplateAreas: '0 0 0 1 2 3 4 5 6 7 8',
			}}
			className='anx_grid'
		>
			{_.times(9, i => (
				<TestCell style={{ gridArea: `${i}` }} idx={i} />
			))}
		</div>
	);
};

export default class extends React.Component {
	//@ts-ignore
	constructor(...args) {
		//@ts-ignore
		super(...(args as Array));
		this.state = { isExpanded: true };
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle() {
		this.setState({
			//@ts-ignore
			isExpanded: !this.state.isExpanded,
		});
	}

	render() {
		return (
			<section>
				<p>
					modal can be disabled in the underlying Overlay component to allow
					interaction with the background
				</p>
				<button onClick={this.handleToggle}>Toggle SidePanel</button>

				<SidePanel
					isModal={false}
					//@ts-ignore
					isExpanded={this.state.isExpanded}
					onCollapse={this.handleToggle}
					Header='Stumptown keytar schlitz'
				>
					<div>
						<Grid />
					</div>
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
