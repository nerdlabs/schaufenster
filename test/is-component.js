import test from 'ava';
import isComponent from '../source/is-component';
import classExtendsReactComponent from './fixtures/class-extends-react-component';
import classExtendsReactComponentNoRender from './fixtures/class-extends-react-component-no-render';
import classExtendsComponent from './fixtures/class-extends-component';
import classRenderJsx from './fixtures/class-render-jsx';
import reactCreateClass from './fixtures/react-createclass';
import statelessFunctionalComponent from './fixtures/stateless-functional-component';
import functionNoReturnJsx from './fixtures/function-no-return-jsx';


test('calling is-component with no arguments', t => {
	const actual = () => isComponent();
	t.throws(actual, Error, 'it should throw an error');
});

test('calling is-component with an invalid argument', t => {
	const actual = () => isComponent(1);
	t.throws(actual, Error, 'it should throw an error');
});

test(`calling is-component with a node that doesn't contain a react component`, t => {
	const actual = isComponent({type: 'Identifier'});
	t.false(actual, 'it should return false');
});

test('calling is-component with a class that extends React.Component', t => {
	const actual = isComponent(classExtendsReactComponent);
	t.true(actual, 'it should return true');
});

test('calling is-component with a class that extends React.Component but does not have a render method', t => {
	const actual = isComponent(classExtendsReactComponentNoRender);
	t.false(actual, 'it should return false');
});

test('calling is-component with a class that extends Component', t => {
	const actual = isComponent(classExtendsComponent);
	t.true(actual, 'it should return true');
});

test('calling is-component with a class that has a render method and contains JSX', t => {
	const actual = isComponent(classRenderJsx);
	t.true(actual, 'it should return true');
});

test('calling is-component with a class that has been created by React.createClass', t => {
	const actual = isComponent(reactCreateClass);
	t.true(actual, 'it should return true');
});

test('calling is-component with a stateless functional component', t => {
	const actual = isComponent(statelessFunctionalComponent);
	t.true(actual, 'it should return true');
});

test('calling is-component with a function that does not return JSX', t => {
	const actual = isComponent(functionNoReturnJsx);
	t.false(actual, 'it should return false');
});
