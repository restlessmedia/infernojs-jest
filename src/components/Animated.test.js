import Animated from './Animated';
import { renderToSnapshot } from 'inferno-test-utils';

describe('Animated', () => {

  it('should render', () => {
    const props = {};
    const renderedTree = renderToSnapshot(<Animated {...props} />);

    expect(renderedTree).toMatchSnapshot();
  });
});
