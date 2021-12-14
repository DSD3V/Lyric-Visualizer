import { SongSearchForm } from './forms/SongSearchForm';
import { Container } from '../styles/GlobalStyles';
import { SongWordCloud } from './wordclouds/SongWordCloud';

export const SongSearch = () => (
  <Container>
    <SongSearchForm />
    <SongWordCloud />
  </Container>
);
