import React from 'react';
import ReactDOM from 'react-dom';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import {
	findElementsByType,
	rejectElementsByType
} from '../../util/child-component';

import Table from '../Table/Table';
import StickySection from '../StickySection/StickySection';

const boundClassNames = lucidClassNames.bind('&-ScrollTable');

const {
//	object,
	string,
//	bool,
} = React.PropTypes;

/**
 * `Thead` renders.
 */
const Thead = Table.Thead;

/**
 * `Tbody` renders.
 */
const Tbody = Table.Tbody;

/**
 * `Tr` renders.
 */
const Tr = Table.Tr;

/**
 * `Th` renders.
 */
const Th = Table.Th;

/**
 * `Td` renders.
 */
const Td = Table.Td;

/**
 * {"categories": ["table"]}
 *
 * `ScrollTable` renders a scrollable <Table>.
 */
const ScrollTable = React.createClass(createLucidComponentDefinition({
	propTypes: {
		/**
		 * className
		 */
		className: string
	},

	statics: {
		Thead,
		Tbody,
		Tr,
		Th,
		Td,
	},

	getInitialState() {
		return {
			height: null,
			fourthQuadScrollLeft: null,
		};
	},
	
	handleBindThead(instance) {
		const theadDOMNode = ReactDOM.findDOMNode(instance);

		if (this.theadDOMNode !== theadDOMNode) {
			this.theadDOMNode = theadDOMNode;
		}
	},

	bindTriggerAlign(alignFn) {
		if (this.alignFn !== alignFn) {
			this.alignFn = alignFn;
		}
	},

	handleScroll() {
		if (this.alignFn) {
			this.alignFn();
		}
	},

	handleFourthQuadScroll(event) {
		if (this.state.fourthQuadScrollLeft !== event.target.scrollLeft) {
			this.setState({
				fourthQuadScrollLeft: event.target.scrollLeft
			});
		}
	},
	
	checkTheadHeight() {
		setTimeout(() => {
			const theadRect = this.theadDOMNode.getBoundingClientRect();
			if (this.state.height !== theadRect.height) {
				this.setState({
					height: theadRect.height
				});
			}
		}, 1);
	},

	componentDidMount() {
		this.checkTheadHeight();
	},

	componentDidUpdate() {
		this.checkTheadHeight();
	},

	render() {
		const {
			children,
			className,
			style,
			freezeColSpan,
			...passthrus,
		} = this.props;

		const {
			height,
		} = this.state;

		const thead = _.first(findElementsByType(children, [Thead]));
		const nextThead = React.createElement(Thead, {...thead.props, ref: this.handleBindThead});
		const otherChildren = rejectElementsByType(children, [Thead]);

		return (
			<section className={boundClassNames('&', className)} style={style} onScroll={this.handleScroll}>
				{thead ? ([
					(
						 <StickySection triggerAlign={this.bindTriggerAlign} style={{
							zIndex:999,
							height,
							overflowY: 'hidden',
							marginBottom: -height,
							width: 304,
						}}>
							<div style={{
								width: 304
							}}>
								<Table key='QUAD1' {...passthrus} style={{width: 790}}>
									{nextThead}
									{otherChildren}
								</Table>
							</div>
						</StickySection>
					),
					(
						 <StickySection triggerAlign={this.bindTriggerAlign} style={{
							zIndex:998,
							height,
							overflowY: 'hidden',
							marginBottom: -height,
							width: 600,
						}} scrollLeft={this.state.fourthQuadScrollLeft} contentWidth={790}>
							<div style={{
									//width: 600-this.state.fourthQuadScrollLeft,
									width: 600+this.state.fourthQuadScrollLeft,
									overflow: 'hidden',
							}}>
								<Table key='QUAD2' {...passthrus} style={{
									width: 790,
								}}>
									{children}
								</Table>
							</div>
						</StickySection>
					)
				]) : null}
				<div style={{
					display: 'flex'
				}}>
					<div style={{
						width: 304,
						overflow: 'hidden',
						zIndex: 888,
						boxShadow: '10px 0px 30px rgba(0, 0, 0, 0.3)',
					}}>
						<Table key='QUAD3' {...passthrus} style={{
							width: 790,
						}}>
							{children}
						</Table>
					</div>
					<div style={{
						marginLeft: -304,
						width: 600,
						overflow: 'auto',
					}} onScroll={this.handleFourthQuadScroll}>
						<Table key='QUAD4' {...passthrus} style={{
							width: 790,
						}}>
							{children}
						</Table>
					</div>
				</div>
			</section>
		);

	}
}));

export default ScrollTable;
