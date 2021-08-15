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
    primary key (id_club, uuid_club)
);

create table fut_tut.lnk_player (
    id_player                 bigserial,
    name_player               varchar(30)     not null,
    value_player              int             not null
        check ( value_player >= 1 ),
    status                   boolean         not null default true,
    creation_date            timestamptz     not null default now(),
    modification_date        timestamptz     not null default now(),
    id_country               int             not null
        references fut_tut.ms_country (id_country),
    id_position                  int             not null
        references fut_tut.ms_player_position (id_position),
    primary key (id_player)
);

--Views
create or replace view fut_tut.v_lnk_player_info as (
    select
        pl.id_player, pl.name_player, pl.value_player,
        pc.name_country, pp.name_position
    from fut_tut.lnk_player pl
    inner join fut_tut.ms_country pc on pl.id_country = pc.id_country
    inner join fut_tut.ms_player_position pp on pl.id_position = pp.id_position
    where (pl.status = true) 
);

create or replace view fut_tut.v_lnk_club_info as (
    select
        c.id_club, c.name_club, c.name_coach, 
        cc.name_country, c.bugdet
    from fut_tut.lnk_club c
    inner join fut_tut.ms_country cc on c.id_club = cc.id_country
    where (c.status = true)
);