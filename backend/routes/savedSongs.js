import { Router } from 'express';
import SavedSongs from '../schemas/SavedSongs.js';

const router = Router();

/*
 @GET
 Input: User ID
 Output: Array of SongSearch objects associated with this user
*/

router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const isUserAlreadyInDB = await SavedSongs.findOne({ userId });

    if (isUserAlreadyInDB) {
      const data = await SavedSongs.findOne({
        userId,
      });
      return data
        ? res.status(200).json({
            message: 'Song searches retrieved.',
            data: data.savedSongs,
          })
        : res.status(200).json({
            message: 'There are no song searches associated with this user.',
          });
    } else {
      res.status(400).json({
        message: 'User does not exist.',
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

/*
 @POST
 Input: User ID, SongSearch object
 Output: Success if succeeded; add SongSearch object to array of SongSearch objects associated with this user in D.B,
         create new entry in D.B if needed
*/

router.post('/', async (req, res) => {
  const { userId } = req.query;
  const songSearch = req.body;
  try {
    const isUserAlreadyInDB = await SavedSongs.findOne({ userId });
    if (isUserAlreadyInDB) {
      await SavedSongs.updateOne(
        { userId },
        { $push: { savedSongs: songSearch } }
      );
      res.status(200).json({ message: 'Song successfully added.' });
    } else {
      const newSavedSongs = new SavedSongs({
        userId,
        savedSongs: [songSearch],
      });
      await newSavedSongs.save();
      res.status(200).json({
        message: 'User added to DB and song successfully added.',
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to save song.', error });
  }
});

/*
 @DELETE
 Input: User ID, SongSearch ID
 Output: Success if succeeded; delete SongSearch object from array of SongSearch objects associated with this user in D.B
*/

router.delete('/', async (req, res) => {
  const { userId, songId } = req.query;
  try {
    await SavedSongs.updateOne(
      { userId },
      {
        $pull: {
          savedSongs: {
            songId,
          },
        },
      }
    );
    res.status(200).json({
      message: 'Song successfully deleted.',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete song.',
      error,
    });
  }
});

export default router;
