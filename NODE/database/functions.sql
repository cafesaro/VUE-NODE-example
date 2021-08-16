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
        (c_name, c_bugdet, c_name_coach, v_id_country);
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


    insert into fut_tut.lnk_player
        (name_player, value_player, id_position, id_country, id_club)
    values
        (p_name, p_value, v_id_position, v_id_country, p_id_club);
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
    "position"                   varchar(30),
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

select fut_tut.sp_lnk_club_get();
select fut_tut.sp_lnk_club_insert('Caracas Furbol club'::varchar, 100, 'Gabo'::varchar, 'Venezuela'::varchar);
select fut_tut.sp_lnk_player_insert('Diego Maradona'::varchar, 1000000, 2, 'CRA'::varchar , 'Brazil'::varchar);
