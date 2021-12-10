import { Router } from 'express';

import artistSearch from './artistSearch.js';
import savedArtists from './savedArtists.js';
import savedSongs from './savedSongs.js';
import songSearch from './songSearch.js';
import user from './user.js';

let rootRouter = Router();

rootRouter.use('/artistSearch', artistSearch);
rootRouter.use('/savedArtists', savedArtists);
rootRouter.use('/savedSongs', savedSongs);
rootRouter.use('/songSearch', songSearch);
rootRouter.use('/user', user);

export default rootRouter;
