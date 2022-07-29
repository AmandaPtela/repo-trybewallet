import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <p>{user}</p>
        <span>trybe</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.email,
});
export default connect(mapStateToProps)(Wallet);
