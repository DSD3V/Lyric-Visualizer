import { Router } from 'express';

import savedSongs from './savedSongs.js';
import songSearch from './songSearch.js';

const rootRouter = Router();

rootRouter.use('/savedSongs', savedSongs);
rootRouter.use('/songSearch', songSearch);

export default rootRouter;
