SELECT t.start_timestamp, t.start_lat, t.start_lng, t.sos_timestamp, t.sos_lat, t.sos_lng, t.end_timestamp,j.*
FROM trips t
INNER JOIN trips_users_join j ON t.id = j.trips_id
WHERE j.user_phone_number = '1234567890'
ORDER BY j.trips_id DESC;

SELECT * FROM trips ORDER BY id;
SELECT * FROM trips_users_join;

INSERT INTO trips_users_join (trips_id, user_is_traveler, user_phone_number) VALUES (1, TRUE, '123456789');
INSERT INTO trips_users_join (trips_id, user_is_traveler, user_phone_number) VALUES (1, FALSE, '1234567890');
INSERT INTO trips_users_join (trips_id, user_is_traveler, user_phone_number) VALUES (1, FALSE, '732861923');
INSERT INTO trips_users_join (trips_id, user_is_traveler, user_phone_number) VALUES (1, FALSE, '7876543298');

INSERT INTO trips_users_join (trips_id, user_is_traveler, user_phone_number) VALUES (2, TRUE, '1234567890');
INSERT INTO trips_users_join (trips_id, user_is_traveler, user_phone_number) VALUES (2, FALSE, '2746873264');
INSERT INTO trips_users_join (trips_id, user_is_traveler, user_phone_number) VALUES (2, FALSE, '7347638915');
INSERT INTO trips_users_join (trips_id, user_is_traveler, user_phone_number) VALUES (2, FALSE, '6758493019');

SELECT * FROM users;

UPDATE trips_users_join
SET trips_id = 2
WHERE user_phone_number = '6758493019';

UPDATE trips
SET start_lat = 33.8567844, start_lng = 151.2127218
WHERE id = 4;

UPDATE trips
SET sos_timestamp = NOW(), sos_lat = 4, sos_lng = 5
WHERE id = 4
RETURNING *;

UPDATE trips
SET start_timestamp = NOW()
WHERE id IN (9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33)
RETURNING *;

DELETE
FROM trips
WHERE id IN (8);

INSERT
INTO trips
(start_timestamp, start_lat, start_lng)
VALUES
('2023-04-13', 1, 2)
RETURNING id;

SELECT *
FROM   pg_stat_activity
WHERE  usename = 'ulksarah';

SELECT pg_cancel_backend(pid)     -- (SIGINT)
    -- pg_terminate_backend(pid)  -- the less patient alternative (SIGTERM)
FROM   pg_stat_activity
WHERE  usename = 'ulksarah'
AND    pid <> pg_backend_pid();