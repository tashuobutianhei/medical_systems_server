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
