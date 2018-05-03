import React from 'react';
import { connect } from 'react-redux';
// import { someaction } from './someplace';

export function DeleteButton(props) {
  return (
    <a
      className="delete-button"
      // onClick={() => props.dispatch(someaction(props.id, props.jwt))}
      href="#delete"
    >
      Delete
    </a>
  );
}
// const mapStateToProps = state => ({
//   jwt: window.localStorage.nomnom_token
// });

// export default connect(mapStateToProps)(DeleteButton);
