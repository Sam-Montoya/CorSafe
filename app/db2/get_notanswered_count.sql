SELECT count(*) FROM tickets WHERE auth_id = $1 AND status = 'Not Answered';