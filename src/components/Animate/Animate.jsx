import _ from 'lodash';
import React from 'react';
// import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import anime from 'animejs';

// const cx = lucidClassNames.bind('&-Animate');

const {
	node,
} = React.PropTypes;

/**
 * {"categories": ["utility"]}
 *
 * Animate.
 *
 */
const Animate = createClass({
	displayName: 'Animate',
	propTypes: {
		/**
		 * Children to be animated.
		 */
		children: node,
	},

	componentWillMount() {
		this.targets = [];
	},

	componentDidMount() {
		this.createAnime();
	},

	shouldComponentUpdate() {
		this.createAnime();
		return true;
	},

	createAnime() {
		const animeArgs = _.assign(
			{},
			_.omit(this.props, 'children'),
			{ targets: this.targets }
		);

		anime(animeArgs);
	},

	addTarget(target) {
		this.targets.push(target);
	},

	render() {
		const children = _.castArray(this.props.children);

		return (
			<g>
				{_.map(children, (child, i) => (
					React.cloneElement(child, { key: i, ref: this.addTarget })
				))}
			</g>
		);
	},
});

export default Animate;
