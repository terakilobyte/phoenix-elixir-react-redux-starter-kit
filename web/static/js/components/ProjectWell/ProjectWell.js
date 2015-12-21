import React from 'react';
import './ProjectWell.scss';
import { Link } from 'react-router';

export default class ProjectWell extends React.Component {
  static propTypes = {
    link: React.PropTypes.string.isRequired,
    source: React.PropTypes.string.isRequired
  }

  render () {
    return (
      <div className='well'>
        <Link to={this.props.link}>
          <img src={this.props.source} />
        </Link>
      </div>
    );
  }
}
