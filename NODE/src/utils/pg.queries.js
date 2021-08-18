import { env } from "./enviroment";

let PGQuery = {};

PGQuery.setSchema = () => {
  return `
        set schema '${env.PG_DB_SCHEMA}';
    `;
};

PGQuery.getClubs = () => {
  return {
    text: `
    select * from sp_lnk_club_get();
        `,
  };
};

PGQuery.insertClub = (name, bugdet, coach, country) => {
  return {
      text: `
      select * from sp_lnk_club_insert($1::varchar,$2,$3::varchar,$4::varchar);
      `,
      values: [name, bugdet, coach, country]
  }
};

PGQuery.insertPlayer= (name, value, idClub, position, country) => {
  return {
      text: `
      select * from sp_lnk_player_insert($1::varchar,$2,$3,$4::varchar,$5::varchar);
      `,
      values: [name, value, idClub, position, country]
  }
};

PGQuery.changePlayer= (idClub, idPlayer) => {
  return {
      text: `
      select * from sp_lnk_player_changeteam($1,$2);
      `,
      values: [idClub, idPlayer]
  }
};

PGQuery.deleteTeam= (idPlayer) => {
  return {
      text: `
      select * from sp_lnk_player_deleateteam($1);
      `,
      values: [idPlayer]
  }
};

PGQuery.getPlayers = () => {
  return {
    text: `
    select * from sp_lnk_player_get();
        `,
  };
};

export default PGQuery;
