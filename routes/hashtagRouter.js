import { Router } from "express";
import { getHashtagList, getPostsByHashtag} from '../controllers/hashtagController.js'
const hashtagRouter= Router();

hashtagRouter.get('/hashtag', getHashtagList)
hashtagRouter.get('/hashtag/:word', getPostsByHashtag)


export default hashtagRouter