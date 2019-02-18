import { Component } from 'inferno';

class Span extends Component {
  render() {
    return <span>{this.props.children}</span>
  }
}

export default Span;
