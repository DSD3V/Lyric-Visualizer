import { useAppSelector } from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ArtistSearch } from './components/ArtistSearch';
import { LoginSignup } from './components/LoginSignup';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './components/PageNotFound';
import { SavedArtists } from './components/SavedArtists';
import { SavedSongs } from './components/SavedSongs';
import { SongSearch } from './components/SongSearch';
import { TabNavigation } from './components/TabNavigation';
import { selectUserIsLoggedIn } from './selectors/userSelectors';

export const App = () => {
  const isLoggedIn = useAppSelector(selectUserIsLoggedIn);

  return (
    <>
      <Navbar />
      {isLoggedIn && <TabNavigation />}
      <Router>
        <Routes>
          <Route element={<LoginSignup />} path='/' />
          <Route element={<ArtistSearch />} path='/artist-search' />
          <Route element={<SongSearch />} path='/song-search' />
          <Route element={<SavedArtists />} path='/saved-artists' />
          <Route element={<SavedSongs />} path='/saved-songs' />
          <Route element={<PageNotFound />} path='*' />
        </Routes>
      </Router>
    </>
  );
};
