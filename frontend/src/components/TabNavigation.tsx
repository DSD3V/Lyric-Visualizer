import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Divider, TabButton, TabsDiv } from '../styles/TabNavigationStyles';

export const TabNavigation = () => {
  const currentRoute = useLocation().pathname;
  const [selectedTab, setSelectedTab] = useState(currentRoute);

  useEffect(() => {
    setSelectedTab(currentRoute);
  }, [currentRoute]);

  return (
    <TabsDiv>
      {/* <TabButton
        $isSelected={selectedTab === '/artist-search'}
        to='/artist-search'
      >
        Search Artists
      </TabButton>
      <Divider>|</Divider> */}
      <TabButton $isSelected={selectedTab === '/song-search'} to='/song-search'>
        Search Songs
      </TabButton>
      <Divider>|</Divider>
      {/* <TabButton
        $isSelected={selectedTab === '/saved-artists'}
        to='/saved-artists'
      >
        Saved Artists
      </TabButton>
      <Divider>|</Divider> */}
      <TabButton $isSelected={selectedTab === '/saved-songs'} to='/saved-songs'>
        Saved Songs
      </TabButton>
    </TabsDiv>
  );
};
