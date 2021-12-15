import { Router } from 'express'
import SavedSongs from '../schemas/SavedSongs.js'
//import SavedSongs from '../schemas/SavedSongs.js';

const router = Router()

/*
 TODO:
 @GET
 Input: User email or ID, depends on if Firebase stores unique IDs
 Output: Array of SongSearch objects that this user has saved
*/

router.get('/:id?', async function (req, res) {
  const user_id = req.params.id
  console.log(user_id)

  // use user id to get the list of SongSearch objects

  SavedSongs.findOne({ userId: user_id }).then((data) => {
    if (data) {
      res.status(201).json({
        message: 'Successfully Queried Saved Songs',
        data: data.savedSongs
      })
    } else {
      res.status(404).json({
        message: 'error',
        data: { reason: "user's data not found" }
      })
    }
  })
})

/*
 TODO:
 @POST
 Input: User email or ID, depends on if Firebase stores unique IDs, SongSearch object (or SongSearch ID would be preferable)
 Output: Success if succeeded; add SongSearch object to array of SongSearch objects associated with this user in D.B
*/

/*
router.post('/', function (req, res) {
    var song = new SavedSongs({
        songImage: req.body.songImage,
        wordCounts: req.body.wordCounts,
    });
       
    song.save()
        .then(item =>{
            return res.status(201).send({
                message: 'Successfully Created Song',
                data: item
            }); 
        })
        .catch(err => {
            res.status(400).send("Unable to add song to the database")
        });  
});
*/

/*
 TODO:
 @DELETE
 Input: User email or ID, depends on if Firebase stores unique IDs, SongSearch object (or SongSearch ID would be preferable)
 Output: Success if succeeded; delete SongSearch object from array of SongSearch objects associated with this user in D.B
*/

router.get('/', function (req, res) {
  SavedSongs.find().then((users) => {
    res.status(201).json({
      data: users
    })
  })
  //console.log(req.query.sort)
})

router.delete('/', function (req, res) {
  const user_id = req.params.id
  SavedSongs.deleteOne({ userId: user_id }).then((data) => {
    if (data) {
      res.status(200).json({
        message: 'OK',
        data: { finished: 'user deleted' }
      })
    } else {
      res.status(404).json({
        message: 'error',
        data: { reason: 'user not found' }
      })
    }
  })
})

export default router
