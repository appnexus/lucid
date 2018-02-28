import React from 'react';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import marksy from 'marksy/components';
import { Table, Td, Th } from '@storybook/components';
import { stripIndent } from '../../src/docs/util';

import SyntaxHighlighter, {
	registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import json from 'react-syntax-highlighter/languages/prism/json';
import coy from 'react-syntax-highlighter/styles/prism/coy';

const coyCustom = {
	...coy,
	'code[class*="language-"]': {
		...coy['code[class*="language-"]'],
		tabSize: '2',
	},
	'pre[class*="language-"]': {
		...coy['pre[class*="language-"]'],
		backgroundColor: '',
		fontSize: 12,
	},
};

registerLanguage('jsx', jsx);
registerLanguage('json', json);

const compile = marksy({
	createElement: React.createElement,
	highlight: (language, code) =>
		ReactDOMServer.renderToStaticMarkup(
			<SyntaxHighlighter language={language || 'jsx'} style={coyCustom}>
				{code}
			</SyntaxHighlighter>
		),
	elements: {
		p: props => <p {...props} style={{ margin: '4px 0' }} />,
	},
});

const getDefaultPropValue = (componentRef, property) => {
	const defaultValue = _.get(componentRef, ['defaultProps', property]);
	return _.isUndefined(defaultValue)
		? _.get(componentRef, ['peekDefaultProps', property])
		: defaultValue;
};

const style = {
	a: {
		textDecoration: 'none',
		//color: '#3f6486',
		//textDecoration: 'underline',
		color: '#2abbb0',
	},
	ul: {
		listStyle: 'none',
		paddingLeft: 0,
		margin: '-6px 0 0 0',
	},
	li: {
		margin: '6px 0 6px 0',
	},
	propLink: {
		backgroundColor: 'white',
		padding: '2px 4px',
		border: '1px solid rgb(236,236,236)',
		borderRadius: 3,
		//color: '#666',
		//marginLeft: '1.075em',
	},
	hashSymbol: {
		//color: '#2abbb0',
		//marginRight: 4,
		//textDecoration: 'none',
		//opacity: '.3',
		//width: '1em',
		//marginLeft: '-1.075em',
		display: 'none',
	},
	propType: {
		fontFamily: 'monospace',
		color: '#999',
	},
	isRequired: {
		fontSize: 9,
		//color: '#de5e46',
		color: '#0d8050',
		marginLeft: 4,
		backgroundColor: 'rgba(15,153,96,.15)',
		borderRadius: 2,
		padding: '2px 4px',
	},
	propName: {
		fontFamily: 'monospace',
		//border: '1px solid #ddd',
		//borderRadius: 3,
		//padding: '2px 4px',
		//color: '#555',
		//backgroundColor: '#f8f8f8',
		fontWeight: '100',
	},
	propHeader: {
		marginTop: 0,
		marginBottom: 2,
	},
	propSection: {
		margin: '10px 0 10px 0',
		backgroundColor: 'white',
		//boxShadow: '0 0 10px rgba(64,64,64,0.15)',
		padding: 8,
	},
	defaultValueLabel: {
		fontSize: 'smaller',
		color: '#999',
	},
	defaultValue: {
		color: '#999',
		fontFamily: 'monospace',
		backgroundColor: 'rgb(247,247,247)',
		padding: 10,
	},
	divider: {
		//backgroundColor: 'rgba(64,64,64,0.1)',
		backgroundColor: 'rgb(247,247,247)',
		height: 1,
		border: 'none',
		margin: '18px 0px -10px',
	},
	top: {
		fontSize: 'smaller',
		fontWeight: '200',
		display: 'none',
	},
};

const Block = ({ oneline, ...rest }) =>
	(oneline ? <span {...rest} /> : <div {...rest} />);

const PropType = ({ oneline, type, ...propData }) => {
	if (type === 'oneOf') {
		return (
			<span style={PropType.style.root}>
				{type}:
				<Block
					oneline={oneline}
					style={{ fontFamily: 'monospace', ...PropType.style.section }}
				>
					{JSON.stringify(propData.oneOfData, null, 2)}
				</Block>
			</span>
		);
	}

	if (type === 'arrayOf') {
		return (
			<span style={PropType.style.root}>
				{type}:
				<Block oneline={oneline} style={PropType.style.section}>
					<PropType {...propData.arrayOfData} />
				</Block>
			</span>
		);
	}

	if (type === 'oneOfType') {
		return (
			<span style={PropType.style.root}>
				{type}:
				{_.map(propData.oneOfTypeData, (propTypeData, key) => (
					<Block oneline={oneline} key={key} style={PropType.style.section}>
						<PropType {...propTypeData} />
					</Block>
				))}
			</span>
		);
	}

	if (type === 'instanceOf') {
		return (
			<span style={PropType.style.root}>
				{type}: <span>{propData.instanceOfData}</span>
			</span>
		);
	}

	if (type === 'objectOf') {
		return (
			<span style={PropType.style.root}>
				{type}:
				<Block oneline={oneline} style={PropType.style.section}>
					<PropType {...propData.objectOfData} />
				</Block>
			</span>
		);
	}

	if (type === 'shape') {
		return (
			<span style={PropType.style.root}>
				{type}:
				<Block oneline={oneline} style={PropType.style.section}>
					{'{'}
					{_.map(propData.shapeData, (propTypeData, key) => (
						<div key={key} style={PropType.style.section}>
							{key}:
							<span style={PropType.style.section}>
								<PropType oneline {...propTypeData} />
							</span>
							,
						</div>
					))}
					{'}'}
				</Block>
			</span>
		);
	}

	return (
		<span style={PropType.style.root}>
			{type}
		</span>
	);
};

PropType.style = {
	root: {
		position: 'relative',
	},
	section: {
		marginLeft: '1em',
	},
};

const PropsList = ({ componentRef, props }) => {
	if (componentRef) {
		return <section />;
	}

	const sortedProps = _.sortBy(props, 'isRequired');

	return (
		<section>
			<a name="top" />
			<ul style={style.ul}>
				{_.map(sortedProps, ({
					name,
					type,
					isRequired,
					defaultValue,
					text,
				}) => (
					<li key={name} style={style.li}>

						<a
							style={{ ...style.a, ...style.propName, ...style.propLink }}
							href={`#${name}`}
						>
							<span style={style.hashSymbol}>#</span>{name}
						</a>
						&nbsp;
						<span style={style.propType}>{type}</span>
						{isRequired && <span style={style.isRequired}>Required</span>}
					</li>
				))}
			</ul>
			<hr style={style.divider} />
			{_.map(sortedProps, ({
				name,
				type,
				isRequired,
				defaultValue,
				text,
				...propData
			}) => (
				<span key={name}>
					<a name={name} />
					<div style={style.propSection}>
						<h3 style={style.propHeader}>
							<span style={style.propName}>{name}</span>
						</h3>
						<div>
							<span style={style.propType}>
								<PropType {...{ type, ...propData }} />
							</span>
							{' '}
							{isRequired && <span style={style.isRequired}>Required</span>}
						</div>
						<div>{compile(stripIndent(text)).tree}</div>
						{!_.isUndefined(defaultValue) &&
							<div>
								<span style={style.defaultValueLabel}>default:</span>
								<SyntaxHighlighter
									language="json"
									style={coy}
									customStyle={{
										fontSize: 12,
									}}
								>
									{JSON.stringify(defaultValue, null, 2)}
								</SyntaxHighlighter>
								{/*
								<pre style={style.defaultValue}>
									{JSON.stringify(
										defaultValue,
										null,
										2
									)}
								</pre>
								*/}
							</div>}
						<a style={{ ...style.a, ...style.top }} href="#top">top</a>
					</div>
				</span>
			))}
		</section>
	);
};

export default PropsList;
