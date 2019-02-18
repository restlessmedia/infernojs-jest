import Span from './Span';
import { renderToSnapshot } from 'inferno-test-utils';

describe('Span', () => {

  it('should render', () => {
    const props = {};
    const renderedTree = renderToSnapshot(<Span {...props} />);

    expect(renderedTree).toMatchSnapshot();
  });
});
