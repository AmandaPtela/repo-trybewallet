import React from 'react';
import { useSelector, connect } from 'react-redux';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
function Wallet() {
  // const dispatch = useDispatch();
  const wallet = useSelector((state) => state);
  const walletObj = Object.values(wallet);
  const obj = Object.values(walletObj[1]);
  console.log(obj.map((item) => item.currencies));

  return (
    <div>
      {/* {dispatch({type: 'wallet', value: 1})} */}
      <p>{obj.map((item) => item.currencies)}</p>
      <span>trybe</span>
    </div>
  );
}

export default connect()(Wallet);
