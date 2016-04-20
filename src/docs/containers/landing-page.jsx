import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-LandingPage');

const LandingPage = React.createClass({
	render() {
		return (
			<div className={boundClassNames('&')} >
				<svg
					className={boundClassNames('&-carpet')}
					x='0px'
					y='0px'
					width='395px'
					height='342px'
					viewBox='0 0 395 342'
				>
					<g className='pattern-group'>
						<g className='parts-group'>
							<g className='parts' transform='matrix(0.3536,-0.3536,0.3536,0.3536,-17.58,138.6071)'>
								<rect x='1.204' y='186.341' className='part-25 pink' width='17' height='17'/>
								<rect x='27.204' y='186.341' className='part-24 pink' width='17' height='17'/>
								<rect x='53.204' y='186.341' className='part-23 pink' width='17' height='17'/>
								<rect x='212.996' y='1' className='part-22 darkBlue' width='17' height='17'/>
								<rect x='369.519' y='312.014' className='part-21 darkBlue' width='17' height='17'/>
								<rect x='346.519' y='289.014' className='part-20 darkBlue' width='17' height='17'/>
								<rect x='323.519' y='266.014' className='part-19 darkBlue' width='17' height='17'/>
								<rect x='213.067' y='323.901' className='part-18 lightBlue' width='17' height='17'/>
								<rect x='213.067' y='299.901' className='part-17 lightBlue' width='17' height='17'/>
								<rect x='213.067' y='276.901' className='part-16 lightBlue' width='17' height='17'/>
								<rect x='213.067' y='253.901' className='part-15 lightBlue' width='17' height='17'/>
								<rect x='143.956' y='229.17' className='part-14 darkBlue' width='17' height='17'/>
								<rect x='166.956' y='206.17' className='part-13 darkBlue' width='17' height='17'/>
								<rect x='189.956' y='183.17' className='part-12 darkBlue' width='17' height='17'/>
								<rect x='376.996' y='134.811' className='part-11 purple' width='17' height='17'/>
								<rect x='353.996' y='134.811' className='part-10 purple' width='17' height='17'/>
								<rect x='330.996' y='134.811' className='part-9 purple' width='17' height='17'/>
								<rect x='307.996' y='134.811' className='part-8 purple' width='17' height='17'/>
								<rect x='283.996' y='134.811' className='part-7 purple' width='17' height='17'/>
								<rect x='259.996' y='134.811' className='part-6 purple' width='17' height='17'/>
								<rect x='235.996' y='134.811' className='part-5 purple' width='17' height='17'/>
								<rect x='235.996' y='160' className='part-4 pink' width='17' height='17'/>
								<rect x='212.996' y='23' className='part-3 darkBlue' width='17' height='130'/>
								<rect x='1' y='160' className='part-2 darkBlue' width='206' height='17'/>
								<rect x='212.996' y='184' className='part-1 darkBlue' width='17' height='62'/>
								<rect x='212.996' y='160' className='part-0 darkBlue' width='17' height='17'/>
							</g>
						</g>
					</g>
				</svg>
			</div>
		);
	}
});

export default LandingPage;
