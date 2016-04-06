import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import {
	findElementsByType,
	rejectElementsByType
} from '../../util/child-component';

import Table from '../Table/Table';
import StickyContainer from '../StickyContainer/StickyContainer';

const boundClassNames = lucidClassNames.bind('&-ScrollTable');

const {
	number,
	string,
	bool,
} = React.PropTypes;

function getColSpanWidth(theadNode, colspan=1, offsetColspan=0) {
	const tr = document.createElement('tr');
	const measureTh = document.createElement('th');
	measureTh.setAttribute('colspan', colspan);

	if (offsetColspan > 0) {
		const offsetTh = document.createElement('th');
		offsetTh.setAttribute('colspan', offsetColspan);
		tr.appendChild(offsetTh);
	}

	tr.appendChild(measureTh);
	theadNode.appendChild(tr);
	const colspanWidth = measureTh.getBoundingClientRect().width;
	theadNode.removeChild(tr);
	return colspanWidth;
}

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
		className: string,
		/**
		 * freezeColSpan
		 */
		freezeColSpan: number,
		/**
		 * hasStickyHeader
		 */
		hasStickyHeader: bool,
		/**
		 * widthColspan
		 */
		widthColspan: number,
	},

	statics: {
		Thead,
		Tbody,
		Tr,
		Th,
		Td,
	},

	getDefaultProps() {
		return {
			freezeColSpan: null,
			hasStickyHeader: null,
			widthColspan: null,
		};
	},

	getInitialState() {
		return {
			theadHeight: null,
			colspanWidth: null,
			scrollColspanWidth: null,
			tableWidth: null,
		};
	},

	handleRefThead(instance) {
		const theadDOMNode = ReactDOM.findDOMNode(instance);

		if (this.theadDOMNode !== theadDOMNode) {
			this.theadDOMNode = theadDOMNode;
		}
	},

	updateDimensions() {
		setTimeout(() => {
			const {
				freezeColSpan,
				hasStickyHeader,
				widthColspan,
			} = this.props;

			const {
				theadHeight,
				colspanWidth,
				scrollColspanWidth,
				tableWidth,
			} = this.state;

			const theadRect = this.theadDOMNode.getBoundingClientRect();

			if (hasStickyHeader) {
				if (theadHeight !== theadRect.height) {
					this.setState({
						theadHeight: theadRect.height
					});
				}
			}

			if (_.isNumber(freezeColSpan) &&  freezeColSpan > 0) {
				const nextColspanWidth = getColSpanWidth(this.theadDOMNode, freezeColSpan) + 1;
				if (colspanWidth !== nextColspanWidth) {
					this.setState({
						colspanWidth: nextColspanWidth
					});
				}
			}

			if (widthColspan) {
				//const nextScrollColspanWidth = getColSpanWidth(this.theadDOMNode, widthColspan - (freezeColSpan || 0), freezeColSpan) + (_.isNumber(freezeColSpan) &&  freezeColSpan > 0 ? 0 : 1);
				const nextScrollColspanWidth = getColSpanWidth(this.theadDOMNode, widthColspan - (freezeColSpan || 0), freezeColSpan);
				if (scrollColspanWidth !== nextScrollColspanWidth) {
					this.setState({
						scrollColspanWidth: nextScrollColspanWidth
					});
				}
			}

			// Full table width
			const nextTableWidth = theadRect.width + 1;
			if (tableWidth !== nextTableWidth) {
				this.setState({
					tableWidth: nextTableWidth
				});
			}
		}, 1);
	},

	componentDidMount() {
		this.updateDimensions();
	},

	componentDidUpdate() {
		this.updateDimensions();
	},

	render() {
		const {
			children,
			className,
			style,
			widthColspan,
			freezeColSpan,
			hasStickyHeader,
			...passthrus,
		} = this.props;

		const {
			theadHeight,
			colspanWidth,
			scrollColspanWidth,
			tableWidth,
		} = this.state;

		const thead = _.first(findElementsByType(children, [Thead]));
		const nextThead = React.createElement(Thead, {...thead.props, ref: this.handleRefThead, key: 'next-thead'});
		const otherChildren = rejectElementsByType(children, [Thead]);
		const canonicalChildren = [nextThead].concat(otherChildren);

		return (
			<section
				className={boundClassNames('&', className)}
				style={{
					display: 'flex',
					...style
				}}
			>
				{_.isNumber(freezeColSpan) && freezeColSpan > 0 ? (

					<div
						style={{
							margin: 0,
							//width: colspanWidth,
							flexGrow: 0,
							flexShrink: 0,
							flexBasis: colspanWidth,
							display: 'flex',
							overflow: 'hidden',
						}}
					>
						<span
							className={boundClassNames('&-before')}
							style={{
								left: colspanWidth
							}}
						/>
						<span
							className={boundClassNames('&-after')}
							style={{
								left: colspanWidth + scrollColspanWidth -20
							}}
						/>
						{hasStickyHeader ? (
							<StickyContainer>
								<StickyContainer.Header className="test" style={{ zIndex: 999 }}>
									{/*FREEZE HEADER*/}
									<div
										style={{
											width: colspanWidth,
											overflow: 'hidden',
											height: theadHeight,
										}}
									>
										<Table {...passthrus} style={{
											width: tableWidth,
											height: theadHeight,
										}}>
											{children}
										</Table>
									</div>
								</StickyContainer.Header>
								{/*FREEZE BODY*/}
								<Table {...passthrus} style={{
									width: tableWidth,
									marginTop: -theadHeight,
								}}>
									{children}
								</Table>
							</StickyContainer>
						) : (
							/*FREEZE BODY*/
							<Table {...passthrus} style={{
								width: tableWidth,
								marginTop: -theadHeight,
							}}>
								{children}
							</Table>
						)}
					</div>
				) : null}
				<div
					className={boundClassNames('&-scroll-container')}
					style={{
						margin: 0,
						width: scrollColspanWidth,
						overflowX: 'auto',
						overflowY: 'hidden',
					}}
				>
					{hasStickyHeader ? (
						<StickyContainer>
							<StickyContainer.Header  className={boundClassNames('&-isStickyHeader')} viewportWidth={scrollColspanWidth} style={{ zIndex: 999}}>
								{/*SCROLL HEADER*/}
								<div
									style={{
										width: tableWidth - colspanWidth,
										//width: _.isNumber(tableWidth) ? tableWidth - colspanWidth : null,
										overflow: 'hidden',
										height: theadHeight,
									}}
								>
									<Table {...passthrus} style={{
										width: tableWidth,
										height: theadHeight,
										marginLeft: -colspanWidth,
									}}>
										{children}
									</Table>
								</div>
							</StickyContainer.Header>
							{/*SCROLL BODY*/}
							<div style={{ width: _.isNumber(tableWidth) ? null : 9999 }}>
								<Table {...passthrus} style={{
									width: tableWidth,
									marginLeft: -colspanWidth,
									marginTop: -theadHeight,
								}}>
									{canonicalChildren}
								</Table>
							</div>
						</StickyContainer>
					) : (
						<div style={{ width: _.isNumber(tableWidth) ? null : 9999 }}>
							<Table {...passthrus} style={{
								width: tableWidth,
								marginLeft: -colspanWidth,
								marginTop: -theadHeight,
							}}>
								{canonicalChildren}
							</Table>
						</div>
					)}
				</div>
			</section>
		);
	}
}));

export default ScrollTable;
