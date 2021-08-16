--Functions and Stored Procedures
create or replace function fut_tut.sp_lnk_club_insert(
    c_name                    varchar(30),
    c_bugdet                  int,
    c_name_coach              varchar(50),
    c_name_country              varchar(50)
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

select fut_tut.sp_lnk_club_insert('Caracas Furbol club'::varchar, 100, 'Gabo'::varchar, 'Venezuela'::varchar);
