import redis from 'redis';

export const tokenKey = 'coderlismedicalsystems';

export const mysqlDbOption = {
  db: 'test',
  name: 'root',
  password: '1997123long',
  options: {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

const client = redis.createClient(6379, '127.0.0.1');


export const redisOption = {client: client, db: 1};
