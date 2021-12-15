import { useCallback, useLayoutEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { CLEAR_MESSAGES, deleteSong } from '../../actions/savedSongsActions';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { Song } from '../../objects';
import {
  selectLastDeletedSongId,
  selectSavedSongsErrorMessage,
  selectSavedSongsIsDeleteLoading,
} from '../../selectors/savedSongsSelectors';
import { selectUserId } from '../../selectors/userSelectors';
import { ErrorMessage } from '../../styles/FormStyles';
import { ButtonsDiv, ReturnLink } from '../../styles/SavedSongsStyles';
import {
  SongWordCloudContainer,
  SongWordCloudDiv,
} from '../../styles/SongSearchStyles';
import { WordCloud } from './WordCloud';

export const SavedSongWordCloud = ({ song }: { song: Song }) => {
  const { songId } = song;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDeleteLoading = useAppSelector(selectSavedSongsIsDeleteLoading);
  const lastDeletedSongId = useAppSelector(selectLastDeletedSongId);
  const savedSongsErrorMessage = useAppSelector(selectSavedSongsErrorMessage);
  const userId = useAppSelector(selectUserId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useLayoutEffect(() => {
    dispatch(CLEAR_MESSAGES());
  }, [dispatch]);

  const toggleDeleteModal = useCallback(
    () => setIsDeleteModalOpen(prevState => !prevState),
    []
  );

  const handleDeleteWordCloud = useCallback(async () => {
    await dispatch(
      deleteSong({
        deleteSuccessCallback: () => navigate(-1),
        songId,
        userId,
      })
    );
  }, [dispatch, navigate, songId, userId]);

  return (
    <SongWordCloudContainer>
      {lastDeletedSongId === songId ? (
        <div>This song was deleted. You will be redirected shortly.</div>
      ) : (
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
              disabled={isDeleteLoading}
              onClick={toggleDeleteModal}
              variant='danger'
            >
              Delete Word Cloud
            </Button>
          </ButtonsDiv>
          {isDeleteLoading && <div>Deleting song wordcloud...</div>}
          {!!savedSongsErrorMessage && (
            <ErrorMessage>{savedSongsErrorMessage}</ErrorMessage>
          )}
        </SongWordCloudDiv>
      )}
    </SongWordCloudContainer>
  );
};
