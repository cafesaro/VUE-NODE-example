import { env } from "./enviroment";

let PGQuery = {};

PGQuery.setSchema = () => {
  return `
        set schema '${env.PG_DB_SCHEMA}';
    `;
};

PGQuery.getPlants = () => {
  return {
    text: `
        select * from fut_tut.lnk_club;
        `,
  };
};

export default PGQuery;
