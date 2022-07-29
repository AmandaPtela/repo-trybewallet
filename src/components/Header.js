import React from 'react';
import { useSelector } from 'react-redux';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
function Header() {
  const userObj = useSelector((state) => state);
  const user = Object.values(userObj);
  return (
    <div>
      <p>{user.map((item) => item.email)}</p>
      <span>trybe</span>
    </div>
  );
}
export default Header;
