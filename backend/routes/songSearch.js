import { Router } from 'express';
import SongSearch from '../schemas/SongSearch.js';

const router = Router();

/*
 TODO:
 @GET
 Input: Artist Name, Song Name
 Output: SongSearch object: { Song image, Map of words in song -> Count of word }
*/

router.get('/', function (req, res) {
    res.send('hello world')
})


router.post('/', function (req, res) {
    var song = new SongSearch({
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



export default router;
