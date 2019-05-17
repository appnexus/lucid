import _ from 'lodash';
import React, { useState } from 'react';
import Button from '../src/components/Button/Button';

const base = { stroke: '#000', strokeWidth: 1.3, strokeMiterlimit: 10 };
const noFill = _.assign({ fill: 'none' }, base);
const noFillLineJoin = _.assign({ strokeLinejoin: 'round' }, noFill);

const addURL = ({ size, type }) => (
	<svg className='lucid-Icon' width={size} height={size} viewBox={`0 0 16 16`}>
		{type === 'fill' ? (
			<>
				<path d='M11.567 16a.647.647 0 0 1-.589-.375l-.927-1.99-1.561 1.181a.648.648 0 1 1-1.043-.518L7.45 4.83a.649.649 0 0 1 1.068-.497l7.249 6.089a.65.65 0 0 1-.273 1.131l-1.908.435.927 1.99a.65.65 0 0 1-.314.864l-2.356 1.098a.683.683 0 0 1-.276.06zm-1.266-4.019a.649.649 0 0 1 .589.375l.992 2.13 1.179-.549-.992-2.13a.652.652 0 0 1 .444-.909l1.418-.323-5.181-4.35-.001 6.765 1.159-.878a.652.652 0 0 1 .393-.131z' />
				<path d='M1.3 11.7V1.3H16V0H0v13h6v-1.3z' />
			</>
		) : null}
		{type === 'strokefit' ? (
			<>
				<path
					style={noFillLineJoin}
					d='M10.3 12.631l1.267 2.719 2.357-1.098-1.267-2.719 2.693-.614L8.1 4.83l-.002 9.468z'
				/>
				<path style={noFill} d='M16 .65H.65V12H6' />
			</>
		) : null}
		{type === 'strokeoverflow' ? (
			<>
				<path
					style={noFillLineJoin}
					d='M10.7 12.631l1.267 2.719 2.357-1.098-1.267-2.719 2.693-.614L8.5 4.83l-.002 9.468z'
				/>
				<path style={noFill} d='M15.5.5H.5v10h6' />
			</>
		) : null}
	</svg>
);

const analyzeData = ({ size, type }) => (
	<svg className='lucid-Icon' width={size} height={size} viewBox={`0 0 16 16`}>
		{type === 'fill' ? (
			<path d='M1.5 12A1.5 1.5 0 0 0 3 10.5c0-.257-.07-.495-.184-.706l2.612-3.331c.104.023.211.037.322.037.267 0 .514-.075.731-.198l2.093 1.461A1.431 1.431 0 0 0 8.55 8a1.5 1.5 0 0 0 3 0c0-.284-.083-.546-.22-.773l1.964-3.005c.174.046.354.078.543.078 1.186 0 2.15-.964 2.15-2.15S15.022 0 13.837 0s-2.15.964-2.15 2.15c0 .525.197 1 .51 1.374L10.24 6.519c-.063-.008-.125-.019-.19-.019-.267 0-.513.075-.73.197l-2.093-1.46c.012-.078.023-.156.023-.237a1.5 1.5 0 0 0-3 0c0 .237.06.458.158.658L1.765 9.027A1.443 1.443 0 0 0 1.5 9a1.5 1.5 0 0 0 0 3zM13.837 1.3a.85.85 0 1 1-.001 1.701.85.85 0 0 1 .001-1.701zM0 14.7h16V16H0z' />
		) : null}
		{type === 'strokefit' ? (
			<>
				<circle style={noFill} cx='13.8' cy='2.2' r='1.5' />
				<circle style={base} cx='10.055' cy='8.014' r='1' />
				<circle style={base} cx='1.65' cy='10.225' r='1' />
				<circle style={base} cx='5.755' cy='5.018' r='1' />
				<path d='M0 14.7h16V16H0z' />
				<path style={noFill} d='M1.652 10.232L5.75 5l4.3 3 2.951-4.545' />
			</>
		) : null}
		{type === 'strokeoverflow' ? (
			<>
				<path style={noFillLineJoin} d='M0 15.5h16' />
				<circle style={base} cx='1.5' cy='10.5' r='1' />
				<circle style={base} cx='5.5' cy='5.5' r='1' />
				<circle style={base} cx='9.5' cy='9.5' r='1' />
				<circle style={noFill} cx='13.5' cy='2.5' r='2' />
				<path style={noFill} d='M1.5 10.5l4-5 4 4 3.065-5.364' />
			</>
		) : null}
	</svg>
);

const arrow = ({ size, type }) => (
	<svg className='lucid-Icon' width={size} height={size} viewBox={`0 0 16 16`}>
		{type === 'fill' ? (
			<path d='M9.04 1.043l-.92.919 5.391 5.388H0v1.3h13.511L8.12 14.038l.92.919L15.999 8z' />
		) : null}
		{type === 'strokefit' ? (
			<>
				<path d='M0 8h15m-6.42 6.494l6.5-6.497L8.58 1.5' style={noFill} />
			</>
		) : null}
		{type === 'strokeoverflow' ? (
			<>
				<path d='M0 8h15M9.5 2l6 6-6 6' style={noFill} />
			</>
		) : null}
	</svg>
);

const attach = ({ size, type }) => (
	<svg className='lucid-Icon' width={size} height={size} viewBox={`0 0 16 16`}>
		{type === 'fill' ? (
			<path d='M5.764 15.997a4.775 4.775 0 0 1-3.386-1.4c-.904-.904-1.402-2.106-1.402-3.385s.498-2.482 1.402-3.386L9.205.999a3.414 3.414 0 0 1 4.821 0 3.414 3.414 0 0 1 0 4.82L7.47 12.376a2.032 2.032 0 0 1-2.87 0 2.033 2.033 0 0 1-.001-2.87L9.855 4.25l.92.919-5.257 5.256a.732.732 0 0 0 0 1.032.732.732 0 0 0 1.032-.001L13.106 4.9c.822-.822.822-2.16 0-2.982s-2.159-.821-2.981 0L3.298 8.745c-.659.659-1.022 1.535-1.022 2.466s.363 1.808 1.022 2.466a3.493 3.493 0 0 0 4.932 0l4.877-4.876.92.919-4.877 4.876a4.775 4.775 0 0 1-3.386 1.401z' />
		) : null}
		{type === 'strokefit' ? (
			<>
				<path
					d='M13.566 9.261L8.69 14.137a4.138 4.138 0 1 1-5.852-5.852l6.827-6.827a2.759 2.759 0 0 1 3.901 3.901L7.01 11.916a1.38 1.38 0 1 1-1.951-1.951l5.256-5.256'
					style={noFill}
				/>
			</>
		) : null}
		{type === 'strokeoverflow' ? (
			<>
				<path
					d='M12.636 10.257l-4.182 4.182a3.986 3.986 0 0 1-5.636 0 4.5 4.5 0 0 1 0-6.364l6.697-6.697a3 3 0 0 1 4.243 0 2.656 2.656 0 0 1 0 3.757l-7.182 7.182a1.328 1.328 0 0 1-1.879 0 1.5 1.5 0 0 1 0-2.121l4.939-4.939'
					style={noFill}
				/>
			</>
		) : null}
	</svg>
);

const search = ({ size, type }) => (
	<svg className='lucid-Icon' width={size} height={size} viewBox={`0 0 16 16`}>
		{type === 'fill' ? (
			<path d='M15.96 15.041l-5.285-5.285A5.968 5.968 0 0 0 12 6a6 6 0 1 0-6 6 5.968 5.968 0 0 0 3.756-1.325l5.284 5.284.92-.918zM6 10.7A4.705 4.705 0 0 1 1.3 6c0-2.592 2.108-4.7 4.7-4.7s4.7 2.108 4.7 4.7-2.108 4.7-4.7 4.7z' />
		) : null}
		{type === 'strokefit' ? (
			<>
				<path style={noFill} d='M10.036 10.036L15.5 15.5' />
				<circle style={noFill} cx='6.15' cy='6.15' r='5.5' />
			</>
		) : null}
		{type === 'strokeoverflow' ? (
			<>
				<circle style={noFill} cx='6' cy='6' r='5.5' />
				<path style={noFill} d='M15.5 15.5L9.876 9.876' />
			</>
		) : null}
	</svg>
);

const sizes = [
	{ showButton: false, size: 12 },
	{ showButton: false, size: 16 },
	{ showButton: false, size: 32 },
	{ showButton: true, size: 14 },
	{ showButton: true, size: 16 },
];
const allIcons = [addURL, analyzeData, arrow, attach, search];
const divStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(5, 1fr)',
	gap: '1rem',
	marginBottom: '1rem',
};

export default () => {
	const [hasOverflow, setHasOverflow] = useState(true);

	return (
		<div>
			<p>
				I created this page to help David Maloney try out various approaches for
				icon design. It's throw away work that'll help us determine which
				approach is sensible for our Xandr rebrand.
			</p>
			<style>{'svg {-moz-transform: translate3d(0, 0, 0);}'}</style>
			<h2>Fill</h2>
			<div style={divStyle}>
				{_.map(sizes, ({ showButton, size }) =>
					_.map(allIcons, Icon =>
						showButton ? (
							<Button>
								<Icon size={size} type='fill' /> Some Button Text
							</Button>
						) : (
							<Icon size={size} type='fill' />
						)
					)
				)}
			</div>
			<h2>Stroke Fit</h2>
			<div style={divStyle}>
				{_.map(sizes, ({ showButton, size }) =>
					_.map(allIcons, Icon =>
						showButton ? (
							<Button>
								<Icon size={size} type='strokefit' /> Some Button Text
							</Button>
						) : (
							<Icon size={size} type='strokefit' />
						)
					)
				)}
			</div>
			<h2>Stroke Overflow</h2>
			{hasOverflow ? <style>{'svg {overflow: visible;}'}</style> : null}
			<label style={{ display: 'block', marginBottom: '1rem' }}>
				<pre style={{ display: 'inline-block' }}>
					<code>overflow: visible;</code>
				</pre>
				<input
					type='checkbox'
					checked={hasOverflow}
					onChange={e => setHasOverflow(e.target.checked)}
				/>
			</label>
			<div style={divStyle}>
				{_.map(sizes, ({ showButton, size }) =>
					_.map(allIcons, Icon =>
						showButton ? (
							<Button>
								<Icon size={size} type='strokeoverflow' /> Some Button Text
							</Button>
						) : (
							<Icon size={size} type='strokeoverflow' />
						)
					)
				)}
			</div>
		</div>
	);
};
