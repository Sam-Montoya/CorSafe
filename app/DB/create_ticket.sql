INSERT INTO tickets (auth_id, subject, status, description)
VALUES ($1,$2,$3,$4)
RETURNING *;