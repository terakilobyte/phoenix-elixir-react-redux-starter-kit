import React from 'react';
import { connect } from 'react-redux';
import { actions as counterActions } from '../redux/modules/counter';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
});
export class HomeView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to the Phoenix Elixir React Redux Starter Kit</h1>
        <h2>
          Sample Counter:&nbsp;
          <span>{this.props.counter}</span>
        </h2>
        <button className='btn btn-default'
                onClick={() => this.props.increment(1)}>
          Increment
        </button>
        <button className='btn btn-default'
                onClick={() => this.props.decrement(1)}>
          Decrement
        </button>
        <button className='btn btn-default'
                onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
        <hr />
      </div>
    );
  }
}

HomeView.propTypes = {
  counter: React.PropTypes.number.isRequired,
  decrement: React.PropTypes.func.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, counterActions)(HomeView);
