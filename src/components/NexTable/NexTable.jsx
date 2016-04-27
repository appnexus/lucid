import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import { findElementsByType } from '../../util/child-component';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';

const boundClassNames = lucidClassNames.bind('&-NexTable');

const {
	node,
	func,
	number,
	object,
	string,
	bool
} = React.PropTypes;

/**
 *
 * {"categories": ["table"], "madeFrom": ["CaretIcon", "DragCaptureZone"]}
 *
 * `Fragment` provides the most basic components to create a lucid table.
 * It is recommended to create a wrapper around this component rather than using it directly in an app.
 */
const Fragment = React.createClass(createLucidComponentDefinition({
	displayName: 'Fragment',

	propTypes: {
		/**
		 * children
		 */
		children: node,
		/**
		 * onUpdateDimensions
		 */
		onUpdateDimensions: func,
	},

	getDefaultProps() {
		return {
			onUpdateDimensions: _.noop,
		};
	},

	componentDidMount() {
		const {
			xRef,
			colSnapTo,
			rowSnapTo,
			vTable,
		} = this.props;

		vTable.fragLookup.set(xRef, this);

		_.delay(() => {
			// TODO: create a two-way association between this and target fragments:
			//   - update this fragment's columns and rows to match the target fragments' columns and rows
			//   - make sure the target fragment component notifies this fragment component of any changes in columns and rows
			//     (notify should cascade to all downstream fragments)
			//
			//colSnapTo - target fragments for column width match
			//rowSnapTo - target fragments for row height match
			this.updateDimensions();
		});
	},

	componentWillUnmount() {
		const {
			xRef,
			vTable,
		} = this.props;

		vTable.fragLookup.delete(xRef);
	},

	updateDimensions() {
		const {
			colSnapTo,
			rowSnapTo,
			onUpdateDimensions,
			vTable,
		} = this.props;

		let hasBeenUpdated = false;

		if (!_.isEmpty(colSnapTo)) {
			this.updateColumnWidths(_.map(colSnapTo, (ref) => vTable.fragLookup.get(ref)));
			hasBeenUpdated = true;
		}

		if (!_.isEmpty(rowSnapTo)) {
			this.updateRowHeights(_.map(rowSnapTo, (ref) => vTable.fragLookup.get(ref)));
			hasBeenUpdated = true;
		}

		if (hasBeenUpdated) {
			onUpdateDimensions();
		}
	},

	updateColumnWidths(snapFragments) {
		const nextColumnWidths = this.getNextColumnWidths(snapFragments);
		_.forEach(_.tail(Array.from(this.columnNodes.values())), (columnCellDomNode, index) => {
			columnCellDomNode.style.width = nextColumnWidths[index] + 'px';
		});
	},

	getNextColumnWidths(snapFragments) {
		return _.reduce(snapFragments, (nextColumnWidths, fragment) => {
			return nextColumnWidths.concat(_.times(fragment.props.cols, (n) => fragment.getColWidth(n)));
		}, []);
	},

	updateRowHeights(snapFragments) {
		const nextRowHeights = this.getNextRowHeights(snapFragments);
		_.forEach(Array.from(this.rowNodes.values()), (rowCellDomNode, index) => {
			rowCellDomNode.style.height = nextRowHeights[index] + 'px';
		});
	},

	getNextRowHeights(snapFragments) {
		return _.reduce(snapFragments, (nextRowHeights, fragment) => {
			return nextRowHeights.concat(_.times(fragment.props.rows, (n) => fragment.getRowHeight(n)));
		}, []);
	},

	getHandlerForRefColCell(colIndex) {
		return (domNode) => {
			if (_.isNil(this.columnNodes)) {
				this.columnNodes = new Map();
			}
			this.columnNodes.set(colIndex, domNode);
		};
	},

	getHandlerForRefRowCell(rowIndex) {
		return (domNode) => {
			if (_.isNil(this.rowNodes)) {
				this.rowNodes = new Map();
			}
			this.rowNodes.set(rowIndex, domNode);
		};
	},
	
	getColWidth(columnIndex) {
		const domNode = this.columnNodes.get(columnIndex)
		if (domNode) {
			return domNode.getBoundingClientRect().width;
		}
		return null;
	},

	getRowHeight(rowIndex) {
		const domNode = this.rowNodes.get(rowIndex)
		if (domNode) {
			return domNode.getBoundingClientRect().height;
		}
		return null;
	},

	render() {
		const {
			children,
			cols,
			rows,
			colSnapTo,
			rowSnapTo,
			xRef,
		} = this.props;

		const leadingRow = (
			<tr className={boundClassNames('&-Fragment-lead-row')}>
				{_.times(cols + 1, (n) => (
					<td key={n} ref={this.getHandlerForRefColCell(n - 1)}/>
				))}
			</tr>
		);

		const childrenWithLeadingCol = (React.Children.map(children, (element, index) => {
			if (element.type === 'tr') {
				return (
					<tr {...element.props} key={index}>
						<td className={boundClassNames('&-Fragment-lead-col')} ref={this.getHandlerForRefRowCell(index)} />
						{/*element.props.children*/}
						{React.Children.map(element.props.children, (element) => (element.type === 'td' ? (
							<td {...element.props} className={boundClassNames('&-Fragment-cell')}>
								<div className={boundClassNames('&-Fragment-cell-content')}>{element.props.children}</div>
							</td>
						) : element))}
					</tr>
				);
			}
			return element;
		}));

		return (
			<div className={boundClassNames('&-Fragment')}>
				<table className={boundClassNames('&-Fragment-table')}>
					<tbody>
						{leadingRow}
						{childrenWithLeadingCol}
					</tbody>
				</table>
			</div>
		);
	}
}));

function createNode(value=null, children=[]) {
	const obj = Object.create(null);
	obj.value = value;
	obj.children = children;
	return obj;
}

function createAdjacencyListFromSparseNodes(nodes) {
	let adjacencyList = [];
	_.forEach(nodes, ([parent, children]) => {
		_.forEach(children, (child) => {
			adjacencyList.push([parent, child]);
		});
	});
	return adjacencyList;
}

function createTreeFromAdjacencyList(adjacencyList) {
	const rootAdjacencies = _.map(_.uniq(_.map(adjacencyList, _.first)), (value) => [null, value]);
	const allAdjacencies = rootAdjacencies.concat(adjacencyList);
	const lookup = new Map();
	const rootNode = {
		isRoot: true,
		parent: null,
		value: null,
		children: new Map(),
	};

	lookup.set(null, rootNode);

	_.forEach(allAdjacencies, ([parent, child]) => {
		let parentNode;
		let childNode;

		if (lookup.has(parent)) {
			parentNode = lookup.get(parent);
		} else {
			parentNode = {
				parent: null,
				value: parent,
				children: new Map(),
			};
			lookup.set(parent, parentNode);
		}

		if (lookup.has(child)) {
			childNode = lookup.get(child);
		} else {
			childNode = {
				parent: parent,
				value: child,
				children: new Map(),
			};
			lookup.set(child, childNode);
		}

		if (childNode.parent !== parent) {
			lookup.get(childNode.parent).children.delete(child);
		}
		childNode.parent = parent;
		parentNode.children.set(child, childNode);
	});

	return rootNode;
}

function simplifySubTree(node) {
	if (node.isRoot) {
		if (node.children.size === 0) {
			return null;
		} else if (node.children.size === 1) {
			return simplifySubTree(node.children.values().next().value);
		}
	}
	return {value: node.value, children: _.map(Array.from(node.children.values()), simplifySubTree)};
}

function traverseTreeInOrder(node, iteratee=_.noop) {
	if (node.isRoot) {
		if (node.children.size === 0) {
			return null;
		} else if (node.children.size === 1) {
			iteratee(node.children.values().next().value.value);
			return traverseTreeInOrder(node.children.values().next().value, iteratee);
		}
	}
	const childNodes = Array.from(node.children.values());
	_.forEach(childNodes, (childNode) => {
		iteratee(childNode.value);
	});
	_.forEach(childNodes, (childNode) => {
		traverseTreeInOrder(childNode, iteratee);
	});
}

/**
 *
 * {"categories": ["table"], "madeFrom": ["CaretIcon", "DragCaptureZone"]}
 *
 * `NexTable` provides the most basic components to create a lucid table.
 * It is recommended to create a wrapper around this component rather than using it directly in an app.
 */
const NexTable = React.createClass(createLucidComponentDefinition({
	displayName: 'NexTable',

	statics: {
		Fragment,
		createVirtualTable() {
			const vTable = {
				fragLookup: new Map(),
				reflow() {
					// Make a tree out of all the fragments that calls [dependencies].updateDimensions() before [dependents].updateDimensions()
					const reverseDependencySets = new Map(); // first revese all the fragment dependency information
					_.forEach(Array.from(vTable.fragLookup.entries()), ([xRef, fragment]) => {
						const targetRefSet = new Set([].concat(
							(_.isEmpty(fragment.props.colSnapTo) ? [] : fragment.props.colSnapTo),
							(_.isEmpty(fragment.props.rowSnapTo) ? [] : fragment.props.rowSnapTo)
						));

						_.forEach(Array.from(targetRefSet.values()), (targetRef) => {
							if (!reverseDependencySets.has(targetRef)) {
								reverseDependencySets.set(targetRef, new Set());
							}
							reverseDependencySets.get(targetRef).add(xRef);
						});
					});

					// then create a forest of sparse trees
					const sparseTreeNodes= _.map(Array.from(reverseDependencySets.entries()), ([xRef, targetRefSet]) => [xRef, Array.from(targetRefSet.values())]);

					// convert the sparse trees into a simple adjacency list, then transform it into a head in order to traverse it,
					// then call the fragment updateDimensions in correct dependency order in order to cascade updates
					traverseTreeInOrder(createTreeFromAdjacencyList(createAdjacencyListFromSparseNodes(sparseTreeNodes)), (xRef) => {
						if (xRef !== null) {
							vTable.fragLookup.get(xRef).updateDimensions();
						}
					});
				},
			};

			return vTable;
		},
	},

	propTypes: {
		/**
		 * children
		 */
		children: node,
	},

	render() {
		return (
			<div className={boundClassNames('&')}>
				<table>
					<tbody>
						<tr>
							<td>c0</td>
							<td>c1</td>
							<td>c2</td>
							<td>c3</td>
						</tr>
						<tr>
							<td>c0</td>
							<td>c1</td>
							<td>c2</td>
							<td>c3</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}));

export default NexTable;
