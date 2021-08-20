--Schemas
create schema if not exists fut_tut;

--Extensions
create extension if not exists "uuid-ossp" ;

--Timezone
set TIMEZONE = 'America/Caracas';

--Tables
create table fut_tut.ms_country (
    id_country                 serial          primary key,
    name_country               varchar(50)     not null
);

create table fut_tut.ms_player_position (
    id_position                 serial          primary key,
    name_position              varchar(20)     not null
);

create table fut_tut.lnk_club (
    id_club                  bigserial,
    uuid_club                uuid            default public.uuid_generate_v4(),
    name_club                varchar(30)     not null,
    name_coach               varchar(30)     not null,
    status                   boolean         not null not null default true,
    bugdet                   int             not null,
    creation_date            timestamptz     not null default now(),
    modification_date        timestamptz     not null default now(),
    id_country               int             not null
        references fut_tut.ms_country (id_country),
    primary key (id_club),
    unique (id_club)
);

create table fut_tut.lnk_player (
    id_player                 bigserial,
	uuid_player               uuid            default public.uuid_generate_v4(),
    name_player               varchar(30)     not null,
    value_player              int             not null
        check ( value_player >= 1 ),
    status                   boolean         not null default true,
    creation_date            timestamptz     not null default now(),
    modification_date        timestamptz     not null default now(),
    id_country               int             not null
        references fut_tut.ms_country (id_country),
    id_position              int             not null
        references fut_tut.ms_player_position (id_position),
    primary key (id_player),
	id_club                  int,
	foreign key (id_club) references fut_tut.lnk_club (id_club)
);

--Views
create or replace view fut_tut.v_lnk_player_info as (
    SELECT DISTINCT pl.id_player,
        pl.name_player,
        pl.value_player,
        pc.name_country,
        pp.name_position,
            CASE
                WHEN pl.id_club IS NULL THEN 'None'::character varying
                ELSE cl.name_club
            END AS name_club
    FROM fut_tut.lnk_club cl,
        fut_tut.lnk_player pl
        JOIN fut_tut.ms_country pc ON pl.id_country = pc.id_country
        JOIN fut_tut.ms_player_position pp ON pl.id_position = pp.id_position
    WHERE pl.status = true AND (cl.id_club = pl.id_club OR pl.id_club IS NULL)
);

create or replace view fut_tut.v_lnk_club_info as (
    select
        c.id_club, c.name_club, c.name_coach, 
        cc.name_country, c.bugdet
    from fut_tut.lnk_club c
    inner join fut_tut.ms_country cc on c.id_country = cc.id_country
    where (c.status = true)
);