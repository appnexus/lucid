import React from 'react';
import createClass from 'create-react-class';
import { Selection, Resizer } from '../../../index';

export default createClass({
	render() {
		return (
			<Resizer>
				{width => {
					const responsiveMode = width >= 768 ? 'large' : 'small';

					return (
						<div>
							<Selection
								responsiveMode={responsiveMode}
								Label="Arts & Entertainment"
							>
								<Selection responsiveMode={responsiveMode} Label="Item 1" />
								<Selection responsiveMode={responsiveMode} Label="Item 2" />
								<Selection responsiveMode={responsiveMode} Label="Item 3">
									<Selection responsiveMode={responsiveMode} Label="Item 1" />
									<Selection responsiveMode={responsiveMode} Label="Item 2" />
									<Selection responsiveMode={responsiveMode} Label="Item 3" />
								</Selection>
								<Selection responsiveMode={responsiveMode} Label="Item 4">
									<Selection responsiveMode={responsiveMode} Label="Item 1" />
									<Selection responsiveMode={responsiveMode} Label="Item 2" />
									<Selection responsiveMode={responsiveMode} Label="Item 3" />
									<Selection
										responsiveMode={responsiveMode}
										Label="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
									/>
								</Selection>
							</Selection>

							<Selection
								responsiveMode={responsiveMode}
								kind="info"
								Label="Arts & Entertainment"
							>
								<Selection
									responsiveMode={responsiveMode}
									kind="info"
									Label="Item 1"
								/>
								<Selection
									responsiveMode={responsiveMode}
									kind="info"
									Label="Item 2"
								/>
								<Selection
									responsiveMode={responsiveMode}
									kind="info"
									Label="Item 3"
								>
									<Selection
										responsiveMode={responsiveMode}
										kind="info"
										Label="Item 1"
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind="info"
										Label="Item 2"
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind="info"
										Label="Item 3"
									/>
								</Selection>
								<Selection
									responsiveMode={responsiveMode}
									kind="warning"
									Label="Item 4"
								>
									<Selection
										responsiveMode={responsiveMode}
										kind="warning"
										Label="Item 1"
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind="warning"
										Label="Item 2"
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind="warning"
										Label="Item 3"
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind="warning"
										Label="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
									/>
								</Selection>
							</Selection>

							<Selection
								responsiveMode={responsiveMode}
								kind="success"
								hasBackground
								isBold
								Label="Leisure"
							>
								<Selection
									responsiveMode={responsiveMode}
									kind="danger"
									Label="Item 1"
								/>
								<Selection
									responsiveMode={responsiveMode}
									kind="danger"
									Label="Item 2"
								/>
								<Selection
									responsiveMode={responsiveMode}
									kind="danger"
									Label="Item 3"
								/>
							</Selection>

							<Selection
								responsiveMode={responsiveMode}
								kind="danger"
								hasBackground
								isBold
								Label="Arts & Entertainment"
							>
								<Selection
									responsiveMode={responsiveMode}
									kind="success"
									Label="Item 1"
								/>
								<Selection
									responsiveMode={responsiveMode}
									kind="success"
									Label="Item 2"
								/>
								<Selection
									responsiveMode={responsiveMode}
									kind="success"
									Label="Item 3"
								/>
							</Selection>
						</div>
					);
				}}

			</Resizer>
		);
	},
});
