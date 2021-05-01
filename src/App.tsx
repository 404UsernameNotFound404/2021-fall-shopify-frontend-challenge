import React, { useState } from 'react';
import {AppProvider} from '@shopify/polaris';
import styled, {css} from 'styled-components';
import translations from '@shopify/polaris/locales/en.json';
import { MovieSearchBarContainer } from './packages/movie-search-bar-container-react';
import { NominationsDisplay } from './packages/nominations-display-react';
import { ResultsDisplay } from './packages/search-results-display-react';

const TestResults = [
  {
    title: "test",
    id: "testId",
    year: "1999",
    nominated: true
  },
  {
    title: "test2",
    id: "testId2",
    year: "1999",
    nominated: false
  }
];

const TestNominations = [
  {
    title: "test",
    id: "testId",
    year: "1999",
  }
];

const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f4f6f8;
`;

const PageContent = styled.div`
  width: 85rem;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const ResultsAndNominationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
`;

const ResultsAndNominationsSharedStyle = css`
  width: 49%;
`;

const StyledNominationsDisplay = styled(NominationsDisplay)`
  ${ResultsAndNominationsSharedStyle};
`;

const StyledResultsDisplay = styled(ResultsDisplay)`
  ${ResultsAndNominationsSharedStyle};
`;

function App() {
  const [nominations, setNominations] = useState(TestNominations);
  const [searchResults, setSearchResults] = useState(TestResults);

  const generateSearchResults = (searchString: string) => {
    console.log("search string: " + searchString);
  }

  const nominateFilm = (filmId: string) => {
    setSearchResults(searchResults.map(searchResult => {
      if (searchResult.id == filmId) {
        setNominations([...nominations, {
          title: searchResult.title,
          year: searchResult.year,
          id: searchResult.id
        }]);
        return {...searchResult, nominated: true};
      }
      return searchResult;
    }));
  }

  const removeNomination = (filmId: string) => {
    setNominations(nominations.filter(nomination => {
      return !(nomination.id == filmId);
    }));

    setSearchResults(searchResults.map(searchResult => {
      return {...searchResult, nominated: searchResult.id == filmId ? false : searchResult.nominated};
    }));
  }

  return (
    <AppProvider i18n={translations}>
      <Page>
        <PageContent>
          <Title>The Shoppies</Title>
          <MovieSearchBarContainer generateSearchResults={generateSearchResults} />
          <ResultsAndNominationsContainer>
            <StyledResultsDisplay nominateFilm={nominateFilm} results={searchResults} />
            <StyledNominationsDisplay removeNomination={removeNomination} nominations={nominations} />
          </ResultsAndNominationsContainer>
        </PageContent>
      </Page>
    </AppProvider>
  );
}

export default App;
