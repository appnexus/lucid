import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';

const boundClassNames = lucidClassNames.bind('&-Table');

const {
	any,
	string,
	bool,
} = React.PropTypes;

/**
 *
 * {"categories": ["table"]}
 *
 * `Table` provides tabbed navigation. It has a flexible interface that allows
 * tab content to be passed as regular React children or through props.
 */

const Table = React.createClass({

	propTypes: {
		/**
		 * Styles that are passed through to the root container.
		 */
		style: any,

		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,

		/**
		 * Adjusts the style of the table to have more spacing within the table cells
		 */
		isComfortable: bool,
	},

	getDefaultProps() {
		return {
			isComfortable: false,
		};
	},

	render() {

		const {
			className,
			style,
			isComfortable,
			...passThroughs,
		} = this.props;

		return (
			<div>
				<table className={boundClassNames('&-table',{
						'&-isComfortable': isComfortable,
					})}>
					<thead className={boundClassNames('&-thead')}>
						<tr className={boundClassNames('&-thead-row')}>
							<th className={boundClassNames('&-cell')} rowSpan="2">RS</th>
							<th className={boundClassNames('&-cell', '&-checkbox')} rowSpan="2">
								<Checkbox></Checkbox>
							</th>
							<th className={boundClassNames('&-cell')} rowSpan="2">Lorem.</th>
							<th className={boundClassNames('&-cell', '&-hasIcon')} rowSpan="2"><SuccessIcon/></th>
							<th className={boundClassNames('&-cell')} rowSpan="2">Button</th>
							<th className={boundClassNames('&-cell', '&-isSorted')} rowSpan="2">Sorted Column</th>
							<th className={boundClassNames('&-cell', '&-align-center')} colSpan="3">Alignments</th>
						</tr>
						<tr className={boundClassNames('&-thead-row')}>
							<th className={boundClassNames('&-cell', '&-align-left')}>align left</th>
							<th className={boundClassNames('&-cell', '&-align-center')}>align center</th>
							<th className={boundClassNames('&-cell', '&-align-right')}>align right</th>
						</tr>
					</thead>
					<tbody className={boundClassNames('&-tbody')}>
						<tr className={boundClassNames('&-row')}>
							<td className={boundClassNames('&-cell', '&-hasBorderRight', '&-hasBorderLeft', '&-hasRowSpan')} rowSpan="9">RS</td>
							<td className={boundClassNames('&-cell', '&-checkbox', '&-fixHover')}><Checkbox/></td>
							<td className={boundClassNames('&-cell')}>Text</td>
							<td className={boundClassNames('&-cell', '&-hasIcon', '&-hasBorderRight', '&-hasBorderLeft')}><SuccessIcon/></td>
							<td className={boundClassNames('&-cell', '&-hasButton')}><Button size="small">button</Button></td>
							<td className={boundClassNames('&-cell')}>Sorted Column</td>
							<td className={boundClassNames('&-cell', '&-align-left', '&-hasBorderLeft')}>align left</td>
							<td className={boundClassNames('&-cell', '&-align-center')}>align center</td>
							<td className={boundClassNames('&-cell', '&-align-right')}>align right</td>
						</tr>
						<tr className={boundClassNames('&-row', '&-isDisabled')}>
							<td className={boundClassNames('&-cell', '&-checkbox')}><Checkbox/></td>
							<td className={boundClassNames('&-cell')}>isDisabled</td>
							<td className={boundClassNames('&-cell', '&-hasIcon', '&-hasBorderRight', '&-hasBorderLeft')}><SuccessIcon/></td>
							<td className={boundClassNames('&-cell', '&-hasButton')}><Button size="small" isDisabled={true}>button</Button></td>
							<td className={boundClassNames('&-cell')}>Sorted Column</td>
							<td className={boundClassNames('&-cell', '&-align-left', '&-hasBorderLeft')}>align left</td>
							<td className={boundClassNames('&-cell', '&-align-center')}>align center</td>
							<td className={boundClassNames('&-cell', '&-align-right')}>align right</td>
						</tr>
						<tr className={boundClassNames('&-row')}>
							<td className={boundClassNames('&-cell', '&-checkbox')}><Checkbox/></td>
							<td className={boundClassNames('&-cell')}><a href="#">Link</a></td>
							<td className={boundClassNames('&-cell', '&-hasIcon', '&-hasBorderRight', '&-hasBorderLeft')}><SuccessIcon/></td>
							<td className={boundClassNames('&-cell', '&-hasButton')}><Button size="small">button</Button></td>
							<td className={boundClassNames('&-cell')}>Sorted Column</td>
							<td className={boundClassNames('&-cell', '&-align-left', '&-hasBorderLeft')}>align left</td>
							<td className={boundClassNames('&-cell', '&-align-center')}>align center</td>
							<td className={boundClassNames('&-cell', '&-align-right')}>align right</td>
						</tr>
						<tr className={boundClassNames('&-row', '&-isDisabled')}>
							<td className={boundClassNames('&-cell', '&-checkbox')}><Checkbox/></td>
							<td className={boundClassNames('&-cell')}><a href="#">isDisabled Link</a></td>
							<td className={boundClassNames('&-cell', '&-hasIcon', '&-hasBorderRight', '&-hasBorderLeft')}><SuccessIcon/></td>
							<td className={boundClassNames('&-cell', '&-hasButton')}><Button size="small" isDisabled={true}>button</Button></td>
							<td className={boundClassNames('&-cell')}>Sorted Column</td>
							<td className={boundClassNames('&-cell', '&-align-left', '&-hasBorderLeft')}>align left</td>
							<td className={boundClassNames('&-cell', '&-align-center')}>align center</td>
							<td className={boundClassNames('&-cell', '&-align-right')}>align right</td>
						</tr>
						<tr className={boundClassNames('&-row', '&-isChecked')}>
							<td className={boundClassNames('&-cell', '&-checkbox')}><Checkbox isSelected={true}/></td>
							<td className={boundClassNames('&-cell')}>isChecked</td>
							<td className={boundClassNames('&-cell', '&-hasIcon', '&-hasBorderRight', '&-hasBorderLeft')}><SuccessIcon/></td>
							<td className={boundClassNames('&-cell', '&-hasButton')}><Button size="small">button</Button></td>
							<td className={boundClassNames('&-cell')}>Sorted Column</td>
							<td className={boundClassNames('&-cell', '&-align-left', '&-hasBorderLeft')}>align left</td>
							<td className={boundClassNames('&-cell', '&-align-center')}>align center</td>
							<td className={boundClassNames('&-cell', '&-align-right')}>align right</td>
						</tr>
						<tr className={boundClassNames('&-row', '&-isChecked', '&-isDisabled')}>
							<td className={boundClassNames('&-cell', '&-checkbox')}><Checkbox isSelected={true}/></td>
							<td className={boundClassNames('&-cell')}>isChecked && isDisabled</td>
							<td className={boundClassNames('&-cell', '&-hasIcon', '&-hasBorderRight', '&-hasBorderLeft')}><SuccessIcon/></td>
							<td className={boundClassNames('&-cell', '&-hasButton')}><Button size="small" isDisabled={true}>button</Button></td>
							<td className={boundClassNames('&-cell')}>Sorted Column</td>
							<td className={boundClassNames('&-cell', '&-align-left', '&-hasBorderLeft')}>align left</td>
							<td className={boundClassNames('&-cell', '&-align-center')}>align center</td>
							<td className={boundClassNames('&-cell', '&-align-right')}>align right</td>
						</tr>
						<tr className={boundClassNames('&-row', '&-isSelected')}>
							<td className={boundClassNames('&-cell', '&-checkbox')}><Checkbox/></td>
							<td className={boundClassNames('&-cell')}>isSelected</td>
							<td className={boundClassNames('&-cell', '&-hasIcon', '&-hasBorderRight', '&-hasBorderLeft')}><SuccessIcon/></td>
							<td className={boundClassNames('&-cell', '&-hasButton')}><Button size="small">button</Button></td>
							<td className={boundClassNames('&-cell')}>Sorted Column</td>
							<td className={boundClassNames('&-cell', '&-align-left', '&-hasBorderLeft')}>align left</td>
							<td className={boundClassNames('&-cell', '&-align-center')}>align center</td>
							<td className={boundClassNames('&-cell', '&-align-right')}>align right</td>
						</tr>
						<tr className={boundClassNames('&-row', '&-isSelected', '&-isDisabled')}>
							<td className={boundClassNames('&-cell', '&-checkbox')}><Checkbox/></td>
							<td className={boundClassNames('&-cell')}>isSelected && isDisabled</td>
							<td className={boundClassNames('&-cell', '&-hasIcon', '&-hasBorderRight', '&-hasBorderLeft')}><SuccessIcon/></td>
							<td className={boundClassNames('&-cell', '&-hasButton')}><Button size="small" isDisabled={true}>button</Button></td>
							<td className={boundClassNames('&-cell')}>Sorted Column</td>
							<td className={boundClassNames('&-cell', '&-align-left', '&-hasBorderLeft')}>align left</td>
							<td className={boundClassNames('&-cell', '&-align-center')}>align center</td>
							<td className={boundClassNames('&-cell', '&-align-right')}>align right</td>
						</tr>
						<tr className={boundClassNames('&-row', '&-isHover')}>
							<td className={boundClassNames('&-cell', '&-checkbox')}><Checkbox/></td>
							<td className={boundClassNames('&-cell')}>:hover</td>
							<td className={boundClassNames('&-cell', '&-hasIcon', '&-hasBorderRight', '&-hasBorderLeft')}><SuccessIcon/></td>
							<td className={boundClassNames('&-cell', '&-hasButton')}><Button size="small">button</Button></td>
							<td className={boundClassNames('&-cell')}>Sorted Column</td>
							<td className={boundClassNames('&-cell', '&-align-left', '&-hasBorderLeft')}>align left</td>
							<td className={boundClassNames('&-cell', '&-align-center')}>align center</td>
							<td className={boundClassNames('&-cell', '&-align-right')}>align right</td>
						</tr>
					</tbody>
				</table>
			</div>

		);
	}
});

export default Table;
