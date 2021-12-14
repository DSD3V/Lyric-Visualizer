import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { AuthWrapper } from './auth/AuthWrapper';
import { AccountSettingsForm } from './components/forms/AccountSettingsForm';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './components/PageNotFound';
import { SavedSongs } from './components/SavedSongs';
import { SongSearch } from './components/SongSearch';
import { TabNavigation } from './components/TabNavigation';
import { selectUserIsAuthenticated } from './selectors/userSelectors';
import { useAppSelector } from './store';

export const App = () => {
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);

  return (
    <Router>
      <AuthWrapper>
        <Navbar />
        {isAuthenticated && <TabNavigation />}
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path='/' element={<Navigate to='/song-search' />} />
              <Route path='/login' element={<Navigate to='/song-search' />} />
              <Route path='/signup' element={<Navigate to='/song-search' />} />
              <Route path='/song-search' element={<SongSearch />} />
              <Route path='/saved-songs/*' element={<SavedSongs />} />
              <Route
                path='/account-settings'
                element={<AccountSettingsForm />}
              />
              <Route path='*' element={<PageNotFound />} />
            </>
          ) : (
            <Route path='*' element={<Home />} />
          )}
        </Routes>
      </AuthWrapper>
    </Router>
  );
};
