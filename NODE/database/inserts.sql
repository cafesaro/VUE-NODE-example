insert into fut_tut.ms_country
    (name_country)
values
    ('España'),
    ('Francia'),
    ('Portugal'),
    ('Argentina'),
    ('Inglaterra'),
    ('Alemania'),
    ('Italia'),
    ('Holanda');

insert into fut_tut.ms_player_position
    (name_position)
values
    ('POR'),
    ('DEF'),
    ('MED'),
    ('DEL');

insert into fut_tut.lnk_club
    (name_club, name_coach, status, bugdet, id_country)
values
    ('Real Madrid', 'Carlos Pirelli Sánchez', true, 100000, 1),
    ('PSG', 'Sofia Armando Rodriguez', true, 1000000, 2);

insert into fut_tut.lnk_player
    (name_player, value_player, status, id_country, id_position)
values
    ('Cesar Guzman', 10 , true, 1, 3),
    ('Gabriel tagliafico', 11 , true, 1, 3);
