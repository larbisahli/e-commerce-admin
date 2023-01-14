/* eslint-disable no-undef */
import { MockedProvider } from '@apollo/client/testing';
import ErrorBoundary from '@components/ErrorBoundary';
import { ModalProvider } from '@components/ui/modal/modal.context';
import { render } from '@testing-library/react';
import React from 'react';

const mocks = [];

const AllTheProviders = ({ children }) => {
  return (
    <ErrorBoundary>
      <MockedProvider mocks={mocks} addTypename={false}>
        <ModalProvider>{children}</ModalProvider>
      </MockedProvider>
    </ErrorBoundary>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
