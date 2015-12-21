import React from 'react';
import 'styles/core.scss';

import Navbar from 'components/Navbar/Navbar';
import 'components/Navbar/Navbar.scss';

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className='view-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
