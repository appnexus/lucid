import React from 'react';
import _ from 'lodash';
import '../ResizeGrid.less';
import ResizeGrid from '../ResizeGrid';
import Panel from '../../Panel/Panel';

const cards = _.times(12, n => {
	return (
		<Panel hasMargin={false} isGutterless>
			<Panel.Header>A Panel</Panel.Header>
			He oppose at thrown desire of no. Announcing impression unaffected day his
			are unreserved indulgence. Him hard find read are you sang. Parlors
			visited noisier how explain pleased his see suppose. Do ashamed assured on
			related offence at equally totally. Use mile her whom they its. Kept hold
			an want as he bred of. Was dashwood landlord cheerful husbands two. Estate
			why theirs indeed him polite old settle though she. In as at regard easily
			narrow roused adieus.
		</Panel>
	);
});

export default class extends React.Component {
	render() {
		return (
			<div>
				<ResizeGrid cards={cards} />
			</div>
		);
	}
}
