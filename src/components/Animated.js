import { Component } from 'inferno';
import { httpGet } from '../helpers/httpJsonClient'

/*
- load data
- when data loaded, fade in
- when fade in complete load data
- when data loaded, fade out
- when fade out complete, change data
- fade in
*/

const timeout = 5000;

class Animated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: '',
    }
    this.show = this.show.bind(this);
    this.data = null;
  }

  async loadData() {
    return await httpGet('/getdata');
  }

  async showNext(){
    await this.setClass('out');
    this.data = this.next;
    this.next = null;
    this.show();
  }

  async show() {
    await this.setClass('in');
    this.next = await this.loadData();
    this.queueNext();
  }

  queueNext() {
    this.stopTimer();
    this.timer = setTimeout(this.showNext, timeout);
  }

  stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  setClass(className) {
    const eventName = 'animationend';
    return new Promise(resolve => {
      this.setState({ className: className }, () => {
        this.el.addEventListener(eventName, function listener() {
          this.removeEventListener(eventName, listener);
          resolve();
        })
      });
    });
  }

  addAnimationComplete(onComplete) {
    onComplete();
  }

  async componentDidMount() {
    this.data = await this.loadData();
    this.loadData();
  }

  handleRef(el) {
    this.el = el;
  }

  render() {
    const className = `animated bounceIn ${this.state.className}`;
    return (
      <div class={className} ref={this.handleRef}>
        {this.data && <div>app</div>}
      </div>
    )
  }
}

export default Animated;
