import { Router } from 'express';
//import SavedSongs from '../schemas/SavedSongs.js';

const router = Router();

/*
 TODO:
 @GET
 Input: User email or ID, depends on if Firebase stores unique IDs
 Output: Array of SongSearch objects that this user has saved
*/

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
    res.send('hello world')
    //console.log(req.query.sort)
})


export default router;
