import { withCookies } from 'react-cookie';

const LoggedOut = props =>
  props.cookies.get('user-token') ? null : props.children;

export default withCookies(LoggedOut);