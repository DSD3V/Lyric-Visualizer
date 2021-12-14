import { useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { deleteSong } from '../../actions/savedSongsActions';
import {
  selectSavedSongsIsLoading,
  selectSavedSongsErrorMessage,
} from '../../selectors/savedSongsSelectors';
import { selectUserId } from '../../selectors/userSelectors';
import { useAppDispatch, useAppSelector } from '../../store';
import { ErrorMessage } from '../../styles/FormStyles';
import { ButtonsDiv, ReturnLink } from '../../styles/SavedSongsStyles';
import {
  SongWordCloudContainer,
  SongWordCloudDiv,
} from '../../styles/SongSearchStyles';
import { WordCloud } from './WordCloud';

export const SavedSongWordCloud = ({
  song,
}: {
  song: {
    artistName: string;
    imageUrl: string;
    id: string;
    songName: string;
    wordCounts: {
      text: string;
      value: number;
    }[];
  };
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const savedSongsErrorMessage = useAppSelector(selectSavedSongsErrorMessage);
  const userId = useAppSelector(selectUserId);
  const isSavedSongsLoading = useAppSelector(selectSavedSongsIsLoading);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleDeleteModal = useCallback(
    () => setIsDeleteModalOpen(prevState => !prevState),
    []
  );

  const handleDeleteWordCloud = useCallback(
    () =>
      dispatch(
        deleteSong({
          deleteSuccessCallback: () => navigate(-1),
          songId: song.id,
          userId,
        })
      ),
    [dispatch, navigate, song.id, userId]
  );

  return (
    <SongWordCloudContainer>
      <SongWordCloudDiv>
        <WordCloud {...song} />
        {isDeleteModalOpen && (
          <Modal show={isDeleteModalOpen} onHide={toggleDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this song wordcloud?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={toggleDeleteModal} variant='secondary'>
                Close
              </Button>
              <Button onClick={handleDeleteWordCloud} variant='danger'>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <ButtonsDiv>
          <ReturnLink to='..'>Return to Saved Songs</ReturnLink>
          <Button
            disabled={isSavedSongsLoading}
            onClick={toggleDeleteModal}
            variant='danger'
          >
            Delete Word Cloud
          </Button>
        </ButtonsDiv>
        {isSavedSongsLoading && <div>Deleting song wordcloud...</div>}
        {!!savedSongsErrorMessage && (
          <ErrorMessage>{savedSongsErrorMessage}</ErrorMessage>
        )}
      </SongWordCloudDiv>
    </SongWordCloudContainer>
  );
};
