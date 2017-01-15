import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment } from '../actions.js';

class Test extends Component {
        click() {
            this.props.inc();
        }
        render() {
            return (
                
                <div>Test {this.props.counter}
                    <button onClick={this.click.bind(this)}>Click</button>
                </div>
            )
        }
}

export default connect(
    (state) => {
        return {
        counter: state.counter
    }},
    (dispatch) => {
        return {
            inc: () => {dispatch(increment())}
        }
    })(Test);