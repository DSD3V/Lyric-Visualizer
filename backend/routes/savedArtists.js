import { Router } from 'express'
import SavedArtists from '../schemas/SavedArtists.js'
const router = Router()

/*
 TODO:
 @GET
 Input: User email or ID, depends on if Firebase stores unique IDs
 Output: Array of ArtistSearch objects that this user has saved
*/

router.get('/:id?', async function (req, res) {
  const user_id = req.params.id
  console.log(user_id)

  // use user id to get the list of SongSearch objects

  SavedArtists.findOne({ userId: user_id }).then((data) => {
    if (data) {
      res.status(201).json({
        message: 'Successfully Queried Saved Artists',
        data: data.savedArtists
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
 Input: User email or ID, depends on if Firebase stores unique IDs, ArtistSearch object (or ArtistSearch ID would be preferable)
 Output: Success if succeeded; addArtistSearch object to array of ArtistSearch objects associated with this user in D.B
*/

/*
 TODO:
 @DELETE
 Input: User email or ID, depends on if Firebase stores unique IDs, ArtistSearch object (or ArtistSearch ID would be preferable)
 Output: Success if succeeded; delete ArtistSearch object from array of ArtistSearch objects associated with this user in D.B
*/
router.delete('/', function (req, res) {
  const user_id = req.params.id
  SavedArtists.deleteOne({ userId: user_id }).then((data) => {
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
