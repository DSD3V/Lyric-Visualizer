import { Router } from 'express';

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
 TODO:
 @DELETE
 Input: User email or ID, depends on if Firebase stores unique IDs, SongSearch object (or SongSearch ID would be preferable)
 Output: Success if succeeded; delete SongSearch object from array of SongSearch objects associated with this user in D.B
*/

export default router;
