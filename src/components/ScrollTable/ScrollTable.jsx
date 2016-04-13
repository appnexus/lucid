import React from 'react';
import ReactDOM from 'react-dom';
import { createLucidComponentDefinition } from '../../util/component-definition';
import { lucidClassNames } from '../../util/style-helpers';
import { findElementsByType } from '../../util/child-component';
import Table from '../Table/Table';

const boundClassNames = lucidClassNames.bind('&-ScrollTable');

const {
	object,
	string,
	bool,
	node,
} = React.PropTypes;

/**
 * {"categories": ["table"]}
 *
 * Renders.
 */
const ScrollTable = React.createClass(createLucidComponentDefinition({
	displayName: 'ScrollTable',

	statics: {
		Thead: Table.Thead,
		Tbody: Table.Tbody,
		Tr: Table.Tr,
		Th: Table.Th,
		Td: Table.Td,
	},

	propTypes: {
		/**
		 * children
		 */
		children: node,
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * style
		 */
		style: object,
	},

	alignFixedHeader() {
		if (!this.alignFixedHeaderScheduled) {
			this.alignFixedHeaderScheduled = true;
			window.requestAnimationFrame(() => {
				this.alignFixedHeaderScheduled = false;
				this.fixedThead.style.transform = 'translate(0, ' + this.scrollContainer.scrollTop + 'px)';
				//this.fixedThead.style.top = this.scrollContainer.scrollTop + 'px';
			});
		}
	},

	componentDidMount() {
		this.fixedThead = ReactDOM.findDOMNode(this.refs.fixedThead);
		this.scrollContainer = ReactDOM.findDOMNode(this.refs.scrollContainer);
		window.requestAnimationFrame(() => {
			this.alignFixedHeader()
		});

		this.scrollContainer.addEventListener('scroll', this.alignFixedHeader);
		this.scrollContainer.addEventListener('wheel', this.alignFixedHeader);
		this.scrollContainer.addEventListener('touchmove', this.alignFixedHeader);
	},

	componentWillUnmount() {
		this.scrollContainer.removeEventListener('scroll', this.alignFixedHeader);
		this.scrollContainer.removeEventListener('wheel', this.alignFixedHeader);
		this.scrollContainer.removeEventListener('touchmove', this.alignFixedHeader);
	},

	render() {
		const {
			children,
			className,
			style,
			...passThrus
		} = this.props;

		const theadElement = _.first(findElementsByType(children, [Table.Thead]));
		const fixedTheadElement = (<Table.Thead
			{...theadElement.props}
			style={{
				position: 'absolute',
				left: 0,
				top: 0,
				...theadElement.props.style,
			}}
			ref='fixedThead'
		/>);

		return (
			<div
				className={boundClassNames('&', className)}
				style={{
					overflow: 'auto',
					position: 'relative',
					...style
				}}
				ref='scrollContainer'
			>
				<Table {...passThrus}>
					{fixedTheadElement}
					{children}
				</Table>
			</div>
		);
	},
}));

export default ScrollTable;
