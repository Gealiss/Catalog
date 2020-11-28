import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
export default (props) => (React.createElement(React.Fragment, null,
    React.createElement(NavMenu, null),
    React.createElement(Container, { fluid: true }, props.children)));
//# sourceMappingURL=Layout.js.map