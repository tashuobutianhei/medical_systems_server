import redisStore from 'koa-redis';
import {redisOption} from '../config';


export const store = redisStore(redisOption);
