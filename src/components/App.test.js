import App from './App';
import { renderToSnapshot } from 'inferno-test-utils';

describe('App', () => {

  it('should render', () => {
    const props = {};
    const renderedTree = renderToSnapshot(<App {...props} />);

    expect(renderedTree).toMatchSnapshot();
  });
});
