/* eslint-disable no-undef */
import Login from '@pages/admin/login';

import { render, screen } from './test-utils';

jest.mock('nanoid', () => 'mock id');
jest.mock('serialize-error', () => {});
jest.mock('@hookform/resolvers', () => {});

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return [
      /* t */ (str: string): string => str,
      /* i18n */ { language: 'en' }
    ];
  }
}));

describe('Home', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('renders a heading', () => {
    render(<Login client={{ user_id: '' }} />, {});

    screen.debug();

    // const heading = screen.getByRole('div', {
    //   name: /welcome to next\.js!/i
    // });

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
  });
});
