import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
    FC,
    FixDefaults,
    findTypes,
    getFirst,
    omitProps,
    Overwrite,
    StandardProps,
} from '../../util/component-types';

import { buildHybridComponent } from '../../util/state-management';

//TODO: convert reducers file to tsx
import * as reducers from './VerticalTabs.reducers';
//TODO: convert vertical list menu first
import { IVerticalListMenuItemProps, VerticalListMenuDumb as VerticalListMenu } from '../VerticalListMenu/VerticalListMenu';

const cx = lucidClassNames.bind('&-VerticalTabs');

const { string, number, bool, func } = PropTypes;

interface IVerticalTabsPropsRaw
    extends StandardProps {
    /** Custom Tab component (alias for `VerticalTabs.Tab`) */
    Tab?: React.ReactNode;

    /** Custom Title component (alias for `VerticalTabs.Title`) */
    Title?: React.ReactNode;

    /** Indicates which of the \`VerticalTabs.Tab\` children is currently
    selected */
    selectedIndex?: number;

	/** Callback fired when the user selects a \`VerticalListMenu.Item\`.*/
	onSelect: (
		index: number,
		{
			event,
			props,
		}: {
			event: React.MouseEvent;
			props: IVerticalListMenuItemProps;
		}
	) => void;

}

type IVerticalTabsProps = Overwrite<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        IVerticalTabsPropsRaw
>;

export interface IVerticalTabsFC extends FC<IVerticalTabsProps> {
    Tab: FC<IVerticalTabsProps>;
    Title: FC<IVerticalTabsProps>;
}

interface IVerticalTabsTab extends StandardProps {

    /** Determines if the Tab is selected */
    isSelected?: boolean;
}

// TODO: Is Title a child of Tab or VerticalTabs? Remove this if it has no props?
interface IVerticalTabsTitle extends StandardProps {

}

const VerticalTabsTab: FC<IVerticalTabsTab> = (): null => null;

const VerticalTabsTitle: FC<IVerticalTabsTitle> = (): null => null;

/** Default props for the VerticalTabs component */
const defaultProps = {
    selectedIndex: 0,
    onSelect: _.noop,
};

/** Vertical Tabs description */
export const VerticalTabs: IVerticalTabsFC = (props): React.ReactElement => {

    const { 
        className, onSelect, selectedIndex, ...passThroughs 
    } = props as FixDefaults<IVerticalTabsProps, typeof defaultProps>;

    // Grab props array from each Tab
    const tabChildProps = _.map(
        findTypes(props, VerticalTabs.Tab),
        'props',
    );

    const selectedIndexFromChildren = _.findLastIndex(tabChildProps, {
        isSelected: true,
    });

    const actualSelectedIndex =
        selectedIndexFromChildren !== -1
            ? selectedIndexFromChildren
            : selectedIndex;

    return (
        <div
            {...omitProps(passThroughs, undefined, _.keys(VerticalTabs.propTypes))}
            className={cx('&', className)}
        >
            <VerticalListMenu
                selectedIndices={[actualSelectedIndex]}
                onSelect={onSelect}
            >
                {_.map(tabChildProps, (tabChildProp, index) => (
                    <VerticalListMenu.Item
                        className={cx('&-Tab', {
                            '&-Tab-is-active': actualSelectedIndex === index,
                        })}
                        key={index}
                    >
                        <span className={cx('&-Tab-content')}>
                            {_.get(
                                getFirst(tabChildProp, VerticalTabs.Title),
                                'props.children',
                                ''
                            )}
                        </span>
                    </VerticalListMenu.Item>
                ))}
            </VerticalListMenu>
            <div className={cx('&-content')}>
                {_.get(tabChildProps, [actualSelectedIndex, 'children'])}
            </div>           
        </div>
    );
};

/** Vertical Tabs */
VerticalTabs.defaultProps = defaultProps;
//TODO: deal with the reducers...
VerticalTabs.reducers = reducers;

VerticalTabs.displayName = 'VerticalTabs',
VerticalTabs.peek = {
    description: `
        \`VerticalTabs\` provides vertically tabbed navigation. It has a
        flexible interface that allows tab content to be passed as regular
        React children or through props.
    `,
    categories: ['navigation'],
    madeFrom: ['VerticalListMenu'],
},
VerticalTabs.propTypes = {
    className: string`
        Class names that are appended to the defaults.
    `,

    selectedIndex: number`
        Indicates which of the \`VerticalTabs.Tab\` children is currently
        selected. The index of the last \`VerticalTabs.Tab\` child with
        \`isSelected\` equal to \`true\` takes precedence over this prop.
    `,

    onSelect: func`
        Callback for when the user clicks a tab. Called with the index of the tab
        that was clicked.  Signature: \`(index, { event, props}) => {}\`
    `,
},

/** Vertical Tabs Tab */
VerticalTabsTab.displayName = 'VerticalTabs.Tab';
VerticalTabs.Tab = VerticalTabsTab;
VerticalTabsTab.propName = 'Tab';
VerticalTabsTab.peek = {
    description: `
        Content that will be rendered in a tab. Be sure to nest a Title
        inside each Tab or provide it as a prop.
    `,
};
VerticalTabsTab.propTypes = {
    isSelected: bool`
        Determines if the Tab is selected.
    `,
};

/** Vertical Tabs Title */
VerticalTabs.Title = VerticalTabsTitle;
VerticalTabsTitle.displayName = 'VerticalTabs.Title';
VerticalTabsTitle.propName = 'Title';
VerticalTabsTitle.peek= {
    description: `
        Titles can be provided as a child or prop to a Tab.
    `,
},

export default buildHybridComponent(VerticalTabs);
export { VerticalTabs as VerticalTabsDumb };