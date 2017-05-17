import React from 'react';
import createClass from 'create-react-class';
import { SplitHorizontal } from '../../../index';

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

				<section style={{ height: 300, outline: '1px solid #e3e3e3' }}>

					<SplitHorizontal
						style={{ height: '100%' }}
						isAnimated
						isExpanded={this.state.isExpanded}
					>
						<SplitHorizontal.TopPane>
							<p>
								Poutine ea ramps cold-pressed, vinyl bespoke sint keffiyeh tumblr banjo kitsch hoodie tousled. Echo park occupy whatever voluptate iPhone. Freegan butcher shabby chic aliquip, truffaut single-origin coffee meditation tote bag gochujang meh est. Ut letterpress gochujang master cleanse, pariatur locavore meditation quis irure incididunt shoreditch typewriter placeat intelligentsia hoodie. Shabby chic chicharrones id, meh swag migas readymade chartreuse consectetur adipisicing ullamco. Laborum commodo occaecat paleo occupy. Cold-pressed kinfolk beard, exercitation post-ironic typewriter non street art offal flexitarian mixtape listicle pitchfork nostrud direct trade.
							</p>
						</SplitHorizontal.TopPane>
						<SplitHorizontal.BottomPane>
							<p>This pane is primary by default.</p>
							<p>
								Trust fund brunch waistcoat, fixie cronut typewriter ut gluten-free veniam blue bottle cillum laboris. Truffaut cronut cliche in dolore. Kickstarter ugh craft beer swag fashion axe. Nostrud tacos cred anim, exercitation kinfolk chillwave you probably haven't heard of them roof party wayfarers cray fingerstache dolore tattooed. Hashtag trust fund sed, bespoke 3 wolf moon everyday carry anim blog vero mollit helvetica bushwick keffiyeh nesciunt. Yr mlkshk authentic small batch. Humblebrag kogi deep v, ex four dollar toast DIY street art adipisicing mlkshk iPhone excepteur intelligentsia cardigan.
							</p>
						</SplitHorizontal.BottomPane>
					</SplitHorizontal>

				</section>

			</section>
		);
	},
});
