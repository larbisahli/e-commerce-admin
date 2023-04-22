import { gql } from '@apollo/client';

export const THEMES = gql`
  query Themes {
    themes {
      themeTitle
      themePath
    }
  }
`;
