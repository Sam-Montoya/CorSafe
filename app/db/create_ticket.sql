INSERT INTO tickets (auth_id, subject, status, tag, description, date, name, notification)
VALUES ($1,$2,$3,$4,$5,$6,$7, true)
RETURNING *;