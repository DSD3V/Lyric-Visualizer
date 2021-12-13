import { Router } from 'express';
import SongSearch from '../schemas/SongSearch.js';
import { getWordCloud } from '../utilities.js';


const router = Router();
/*
 TODO:
 @GET
 Input: Artist Name, Song Name
 Output: SongSearch object: { Song image, Map of words in song -> Count of word }
*/

router.get('/', async function (req, res) {
    //getWordCloud(req.query.artistname, req.query.songname).then(response => console.log(response));

    let word_cloud = await getWordCloud(req.query.artistname, req.query.songname)
    console.log(word_cloud)

    res.status(201).send({
        message: 'Successfully Queried Song',
        data: word_cloud
    }); 

    
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
