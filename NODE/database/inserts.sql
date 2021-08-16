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
    ('Real Madrid', 'Carlo Ancelotti', true, 200000000, 1),
    ('PSG', 'Maurico Pochettino', true, 400000000, 2),
    ('Manchester United', 'Ole Gunnar Solskjaer', true, 185000000, 5),
    ('Borussia Dortmund', 'Marco Rose', true, 120000000, 6),
    ('Juventus de Turín', 'Massimiliano Allegri', true, 135000000, 7);

insert into fut_tut.lnk_player
    (name_player, value_player, status, id_country, id_position)
values
    ('Karim Benzema', 25000000 , true, 2, 4),
    ('Sergio Ramos', 10000000 , true, 1, 2),
    ('Raphaël Varane', 70000000 , true, 2, 2),
    ('Jude Bellingham', 55000000 , true, 5, 3),
    ('Cristiano Ronaldo', 45000000 , true, 3, 4);
    
