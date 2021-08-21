--Trigger Functions
create or replace function fut_tut.tf_before_update_lnk_club()
returns trigger
language plpgsql
as $$
begin
    new.modification_date := now();
    return new;
end;
$$;

create or replace function fut_tut.tf_before_update_lnk_player()
returns trigger
language plpgsql
as $$
begin
    new.modification_date := now();
    return new;
end;
$$;

--Triggers
create trigger t_modification_date_lnk_club
before update on fut_tut.lnk_club
for each row
execute procedure fut_tut.tf_before_update_lnk_club();


create trigger t_modification_date_lnk_player
before update on fut_tut.lnk_player
for each row
execute procedure fut_tut.tf_before_update_lnk_player();