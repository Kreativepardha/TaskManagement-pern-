import redis from 'express-redis-cache';

const redisCache = redis({
  port: 6898,
  host: 'localhost',
  prefix: 'task_app',
  expire: 60 * 60,
});

export default redisCache;
