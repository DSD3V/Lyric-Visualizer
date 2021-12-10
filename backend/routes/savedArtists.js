import { Router } from 'express';

const router = Router();

/*
 TODO:
 @GET
 Input: User email or ID, depends on if Firebase stores unique IDs
 Output: Array of ArtistSearch objects that this user has saved
*/

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

export default router;
