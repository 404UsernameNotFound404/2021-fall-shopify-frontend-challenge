import React, { useEffect, useState } from 'react';
import {AppProvider} from '@shopify/polaris';
import styled, {css} from 'styled-components';
import translations from '@shopify/polaris/locales/en.json';
import { MovieSearchBarContainer } from './packages/movie-search-bar-react';
import { NominationsDisplay } from './packages/nominations-display-react';
import { ResultType, SearchResultsDisplay } from './packages/search-results-display-react';
import { MovieData } from './packages/movie-display-react';

const TestResults = {
  searchString: "",
  results: [
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
  ]
};

const TestNominations = [
  {
    Title: "test",
    imdbID: "testId",
    Year: "1999",
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

const StyledSearchResultsDisplay = styled(SearchResultsDisplay)`
  ${ResultsAndNominationsSharedStyle};
`;

function later(delay: number) {
  return new Promise(function(resolve) {
      setTimeout(resolve, delay);
  });
}

function App() {
  const [nominations, setNominations] = useState([] as MovieData[]);
  const [searchResults, setSearchResults] = useState({} as {searchString: string, results: ResultType[], error: string} | null);
  const [currentSearchString, setCurrentSearchString] = useState(null as null | string); // TODO different name as it's purpose is different now.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // this if makes sure the code does not run on the startup of the component.
    if (currentSearchString != null) {  
      if (searchResults?.searchString == currentSearchString) {
        // good to go
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
  }, [searchResults])

  const generateSearchResults = (searchString: string) => {
    console.log(searchString);
    setCurrentSearchString(searchString);
    setLoading(true);
    generateSearchResultsAsync(searchString);
  }

  const generateSearchResultsAsync = async (searchString: string) => {
    try {
      const apiSearchResultRaw = await fetch(`http://www.omdbapi.com/?s=${searchString}&page=1&type=movie&apikey=24e07721`);
      const apiSearchResultJSON = await apiSearchResultRaw.json();
      // This is because the API returns so quickly you can be mid typing and it 
      await later(500);
     
      if (!apiSearchResultJSON.Error) {
        const resultsWithNomination = apiSearchResultJSON.Search.map((result: MovieData) => {
          return {...result, nominated: !!nominations.find(nomination => nomination.imdbID == result.imdbID)};
        });
        setSearchResults({results: resultsWithNomination, searchString: searchString, error: ""}); 
      }
      else setSearchResults({results: [], searchString: searchString, error: apiSearchResultJSON.Error}); 
    } catch(err) {
      setSearchResults({results: [], searchString: searchString, error: "Error"});
    }
  };

  const nominateFilm = (filmId: string) => {
      if (searchResults != null) {
        setSearchResults({...searchResults, results: searchResults.results.map(searchResult => {
          if (searchResult.imdbID == filmId) {
            setNominations([...nominations, {
              Title: searchResult.Title,
              Year: searchResult.Year,
              imdbID: searchResult.imdbID
            }]);
            return {...searchResult, nominated: true};
          }
          return searchResult;
        })});
    }
  }

  const removeNomination = (filmId: string) => {
    setNominations(nominations.filter(nomination => {
      return !(nomination.imdbID == filmId);
    }));

    if (searchResults != null) {
      setSearchResults({...searchResults, results: searchResults.results.map(searchResult => {
        return {...searchResult, nominated: searchResult.imdbID == filmId ? false : searchResult.nominated};
      })});
    }
  }

  return (
    <AppProvider i18n={translations}>
      <Page>
        <PageContent>
          <Title>The Shoppies</Title>
          <MovieSearchBarContainer generateSearchResults={generateSearchResults} />
          <ResultsAndNominationsContainer>
            <StyledSearchResultsDisplay loading={loading} error={searchResults?.error} searchString={searchResults != null ? searchResults.searchString : ""} nominateFilm={nominateFilm} results={searchResults != null ? searchResults.results : []} />
            <StyledNominationsDisplay removeNomination={removeNomination} nominations={nominations} />
          </ResultsAndNominationsContainer>
        </PageContent>
      </Page>
    </AppProvider>
  );
}

export default App;
