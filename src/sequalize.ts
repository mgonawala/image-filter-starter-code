import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config.dev;
console.log(c);
// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": process.env.POSTGRES_USRNAME,
  "password": process.env.POSTGRES_PASSWORD,
  "database": c.database,
  "host":     c.host,

  dialect: 'postgres',
  storage: ':memory:',
});

