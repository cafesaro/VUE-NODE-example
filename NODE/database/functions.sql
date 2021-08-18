--Functions and Stored Procedures
create or replace function fut_tut.sp_lnk_club_insert(
    c_name                    varchar(30),
    c_bugdet                  int,
    c_name_coach              varchar(50),
    c_name_country            varchar(50)
)
returns void
language plpgsql
as $$
declare
    v_id_country              int;
    v_id_club                 int;
    v_json_resp               json;

begin
    select id_country into v_id_country
    from fut_tut.ms_country
    where name_country = c_name_country;
    if (v_id_country is null) then
        insert into fut_tut.ms_country
            (name_country)
        values
            (c_name_country)
        returning id_country into v_id_country;
    end if;
    insert into fut_tut.lnk_club
        (name_club, bugdet, name_coach, id_country)
    values
        (c_name, c_bugdet, c_name_coach, v_id_country)
    returning  id_club into v_id_club;

        v_json_resp := json_build_object(
        'idClub', v_id_club,
        'name', c_name,
        'coach', c_name_coach,
        'country', c_name_country,
        'bugdet', c_bugdet
    );
    perform pg_notify('club_verify', v_json_resp::text);
    return;
end;
$$;

create or replace function fut_tut.sp_lnk_player_insert(
    p_name                    varchar(30),
    p_value                   int,
    p_id_club                 int,
    p_name_position           varchar(50),
    p_name_country            varchar(50)
)
returns void
language plpgsql
as $$
declare
    v_id_country              int;
    v_id_position             int;
    v_id_player               int;
    v_name_club               varchar(30);
    v_json_resp               json;

begin
    select id_country into v_id_country
    from fut_tut.ms_country
    where name_country = p_name_country;
    if (v_id_country is null) then
        insert into fut_tut.ms_country
            (name_country)
        values
            (p_name_country)
        returning id_country into v_id_country;
    end if;


    select id_position into v_id_position
    from fut_tut.ms_player_position
    where name_position = p_name_position;
    if (v_id_position is null) then
        insert into fut_tut.ms_player_position
            (name_position)
        values
            (p_name_position)
        returning id_position into v_id_position;
    end if;


    select name_club into v_name_club
    from fut_tut.lnk_club
    where id_club = p_id_club;


    insert into fut_tut.lnk_player
        (name_player, value_player, id_position, id_country, id_club)
    values
        (p_name, p_value, v_id_position, v_id_country, p_id_club)
    returning id_player into v_id_player;

        v_json_resp := json_build_object(
        'idPlayer', v_id_player,
        'name', p_name,
        'value', p_value,
        'country', p_name_country,
        'position', p_name_position,
        'club', v_name_club
    );
    perform pg_notify('player_verify', v_json_resp::text);
    return;
end;
$$;



create or replace function fut_tut.sp_lnk_player_changeteam(
    c_id_club                int,
    p_id_player               int
)
returns void
language plpgsql
as $$
declare
    v_json_resp               json;
    v_id_player               int;
    v_id_club                 int;
    v_id_country              int;
    v_id_position             int;
    v_name_player             varchar(20);
    v_name_country            varchar(20);
    v_name_position           varchar(20);
    v_name_club               varchar(20);
    v_value_player            int;

begin
    select value_player, id_player, name_player, id_club, id_position, id_country
    into v_value_player, v_id_player, v_name_player, v_id_club, v_id_position, v_id_country
    from fut_tut.lnk_player
    where id_player = p_id_player;

    select name_country
    into v_name_country
    from fut_tut.ms_country
    where id_country = v_id_country;

    select name_position
    into v_name_position
    from fut_tut.ms_player_position
    where id_position = v_id_position;

    select name_club
    into v_name_club
    from fut_tut.lnk_club
    where id_club =c;

    if (v_id_club > 0) then
    update fut_tut.lnk_club
    set bugdet = bugdet + v_value_player
    where id_club = v_id_club;
    end if;

    update fut_tut.lnk_club
    set bugdet = bugdet - v_value_player
    where id_club = c_id_club;

    update fut_tut.lnk_player
    set id_club = c_id_club
    where id_player = p_id_player;

        v_json_resp := json_build_object(
        'idPlayer', v_id_player,
        'name', v_name_player,
        'value', v_value_player,
        'country', v_name_country,
        'position', v_name_position,
        'club', v_name_club
    );
    perform pg_notify('club_verify', v_json_resp::text);
    return;
end;
$$;

create or replace function fut_tut.sp_lnk_player_deleateteam(
    p_id_player               int
)
returns void
language plpgsql
as $$
declare
    v_json_resp               json;
    v_id_player               int;
    v_id_club                 int;
    v_id_country              int;
    v_id_position             int;
    v_name_player             varchar(20);
    v_name_country            varchar(20);
    v_name_position           varchar(20);
    v_name_club               varchar(20);
    v_value_player            int;

begin
    select value_player, id_player, name_player, id_club, id_position, id_country
    into v_value_player, v_id_player, v_name_player, v_id_club, v_id_position, v_id_country
    from fut_tut.lnk_player
    where id_player = p_id_player;

    select name_country
    into v_name_country
    from fut_tut.ms_country
    where id_country = v_id_country;

    select name_position
    into v_name_position
    from fut_tut.ms_player_position
    where id_position = v_id_position;


    update fut_tut.lnk_player
    set id_club = null
    where id_player = p_id_player;

        v_json_resp := json_build_object(
        'idPlayer', v_id_player,
        'name', v_name_player,
        'value', v_value_player,
        'country', v_name_country,
        'position', v_name_position,
        'club', null
    );
    perform pg_notify('club_verify', v_json_resp::text);
    return;
end;
$$;

create or replace function fut_tut.sp_lnk_club_get()
returns table (
    "idClub"                   int,
    name                       varchar(30),
    coach                      varchar(50),
    country                    varchar(30),
    bugdet                     int
)
language plpgsql
as $$
begin
    return query
        select
            c.id_club::int, c.name_club, c.name_coach,
            c.name_country, c.bugdet::int
        from fut_tut.v_lnk_club_info c;
end;
$$;

create or replace function fut_tut.sp_lnk_player_get()
returns table (
    "idPlayer"                 int,
    name                       varchar(30),
    value                      int,
    country                    varchar(30),
    "position"                 varchar(30),
    club                       varchar(30)
)
language plpgsql
as $$
begin
    return query
        select
            p.id_player::int, p.name_player,p.value_player::int ,p.name_country,
            p.name_position, p.name_club
        from fut_tut.v_lnk_player_info p;
end;
$$;

select fut_tut.sp_lnk_player_deleateteam(1);
select fut_tut.sp_lnk_player_changeteam(1, 1);
select * from fut_tut.sp_lnk_club_get();
select fut_tut.sp_lnk_club_insert('Caracas Furbol club'::varchar, 100, 'Gabo'::varchar, 'Venezuela'::varchar);
select fut_tut.sp_lnk_player_insert('Diego Maradona'::varchar, 1000000, 2, 'CRA'::varchar , 'Brazil'::varchar);
