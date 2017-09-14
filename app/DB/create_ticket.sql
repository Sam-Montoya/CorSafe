INSERT INTO tickets (auth_id, subject, status, tag, description, date)
VALUES ($1,$2,$3,$4,$5, CURRENT_TIMESTAMP)
RETURNING *;