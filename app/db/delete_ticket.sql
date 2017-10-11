DELETE FROM tickets WHERE ticket_id = $1;
DELETE FROM comments WHERE ticket_id = $1;