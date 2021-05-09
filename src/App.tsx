import React, { useEffect, useState } from 'react';
import {AppProvider} from '@shopify/polaris';
import styled, {css, ThemeProvider} from 'styled-components';
import translations from '@shopify/polaris/locales/en.json';
import { MovieSearchBarContainer } from './packages/movie-search-bar-react';
import { NominationsDisplay } from './packages/nominations-display-react';
import { ResultType, SearchResultsDisplay } from './packages/search-results-display-react';
import { MovieData } from './packages/movie-display-react';
import Cookies from 'js-cookie';
import { ThemeSwitchButton } from './packages/theme-switch-button-react';
import darkTheme from './dark-theme';
import lightTheme from './light-theme';

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${({theme}) => theme && theme.secondaryBackgroundColor};
`;

const PageContent = styled.div`
  width: 85rem;
  margin: auto;
  @media only screen and (max-width: ${({theme}) => theme && theme.mobileBreakPoint}) {
    padding-top: 8rem;
    width: 90%;
    margin: auto; 
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: ${({theme}) => theme && theme.primaryTextColor};
`;

const ResultsAndNominationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
  @media only screen and (max-width: ${({theme}) => theme && theme.mobileBreakPoint}) {
    display: block;
  }
`;

const ResultsAndNominationsSharedStyle = css`
  width: 49%;
  @media only screen and (max-width: ${({theme}) => theme && theme.mobileBreakPoint}) {
    min-height: 10rem;
    margin: auto;
    margin-bottom: 2rem;
    width: 100%;
  }
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
  const [loadedNominations, setLoadedNominations] = useState(false);
  const [searchResults, setSearchResults] = useState({} as {searchString: string, results: ResultType[], error: string} | null);
  const [currentSearchString, setCurrentSearchString] = useState(null as null | string);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light" as "light" | "dark");

  // when searchResults load it checks if the user has updated there search string. If so it does not turn off loading as it's still waiting for the new results.
  useEffect(() => {
    // this if makes sure the code does not run on the startup of the component.
    if (currentSearchString != null) {  
      if (searchResults?.searchString == currentSearchString) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
  }, [searchResults]);

  // Loading nominations from cookies and Setting cookies when nominations change
  useEffect(() => {
    if (!loadedNominations) {
      const nominationsRaw = Cookies.get("nominations");
      if (nominationsRaw) {
        const nominationsArray = JSON.parse(nominationsRaw);
        if (nominationsArray) setNominations(nominationsArray);
      }
      setLoadedNominations(true);
    } else {
      Cookies.set("nominations", nominations);
    }
  }, [nominations]);

  // checking the users preferred theme from browser
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark");
    }
  }, []);

  const generateSearchResults = (searchString: string) => {
    setCurrentSearchString(searchString);
    setLoading(true);
    generateSearchResultsAsync(searchString);
  }

  const generateSearchResultsAsync = async (searchString: string) => {
    try {
      const apiSearchResultRaw = await fetch(`http://www.omdbapi.com/?s=${searchString}&page=1&type=movie&apikey=24e07721`);
      const apiSearchResultJSON = await apiSearchResultRaw.json();
      // This is because the API returns so quickly you can be mid typing and it loads results which makes things jumpy
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

  const switchTheme = () => {
    if (theme == "light") setTheme("dark")
    else setTheme("light");
  }

  const loadTheme = () => {
    switch(theme) {
      case "light":
        return {...lightTheme, mobileBreakPoint: "600px"};
      break;
      case "dark":
        return {...darkTheme, mobileBreakPoint: "600px"};
      break;
      default:
        return {...lightTheme, mobileBreakPoint: "600px"};
    }
  }

  return (
    <AppProvider theme={{colorScheme: theme}} i18n={translations}>
      <ThemeProvider theme={loadTheme}>
        <ThemeSwitchButton switchTheme={switchTheme} />
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
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
