import { h, Component } from 'preact';
import './FadeInAnimation.css';

export default class FadeInAnimation extends Component {
  state = {
    isVisible: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 100);
  }

  render() {
    const { isVisible } = this.state;

    return (
      <div className={isVisible ? 'fade-in' : 'base-state'}>
        {this.props.children}
      </div>
    );
  }
}
