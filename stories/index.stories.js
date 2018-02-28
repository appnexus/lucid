import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/index.less';
import Button from '../src/components/Button/Button';

storiesOf('Button', module)
	.add('with text', () => <Button>Hello Button</Button>)
	.add('with some emoji', () => <Button>😀 😎 👍 💯</Button>);
