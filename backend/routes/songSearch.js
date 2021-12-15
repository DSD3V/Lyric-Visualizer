import { Router } from 'express';

import { getWordCloud } from '../utilities.js';

const router = Router();

/*
 @GET
 Input: Artist Name, Song Name
 Output: SongSearch object: { Song image, Map of words in song -> Count of word }
*/

router.get('/', async (req, res) => {
  try {
    const word_cloud = await getWordCloud(
      req.query.artistName,
      req.query.songName
    );

    if (word_cloud) {
      res.status(201).send({
        message: 'Successfully Queried Song',
        data: word_cloud,
      });
    } else {
      res.status(201).send({
        message: 'No lyrics found for this song.',
      });
    }
  } catch (error) {
    res.status(400).send({
      message: 'There was an error fetching song lyrics.',
      error,
    });
  }
});

export default router;
