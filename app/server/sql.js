// CREATE TABLE users (
//     username VARCHAR(20),
//     name VARCHAR(20),
//     email TEXT,
//     profilepic TEXT,
//     role TEXT,
//     auth_id TEXT PRIMARY KEY
// );

// UPDATE users SET role = 'user' WHERE role IS null;
// select * from users;

// CREATE TABLE tickets (
// id SERIAL PRIMARY KEY,
// username VARCHAR(20),
// auth_id TEXT REFERENCES users (auth_id),
// subject TEXT,
// status VARCHAR(15),
// description TEXT
// );


// SELECT * FROM users;



//SELECT * FROM tickets JOIN users ON users.auth_id = tickets.auth_id WHERE tickets.auth_id = $1;

// update comments set comments = array_append(comments, '{"user_id": "auth_id-1", "comment": "Some random comment"}')

// const {comment, user_id} = response.data

//insert into comments (id) values (2);


// insert into comments (ticket_id) values (1);
// update comments set comments = array_append
// (comments, '{"user_id": "auth_id-1", "comment": "Sam Made a Comment"}');
// select * from comments;


// update comments set comments = array_append
// (comments, '{"user_id": "auth_id-1", "comment": "Sam Made a Comment"}')
// WHERE ticket_id = 33;
// select * from comments




// INSERT INTO users(username, name, email, profilepic, auth_id)
// VALUES ('BrettlyC', 'Sam', 'brettly.clawfield@gmail.com', 'picURL', 'auth_id-1');
// INSERT INTO users(username, name, email, profilepic, auth_id)
// VALUES ('Wh3at1y', 'Wheatly', 'wh3at1y@gmail.com', 'picURL', 'auth_id-2');
// INSERT INTO users(username, name, email, profilepic, auth_id)
// VALUES ('lol2funny1', 'Christian', 'duck@gmail.com', 'picURL', 'auth_id-3');
// INSERT INTO users(username, name, email, profilepic, auth_id)
// VALUES ('Khorsheed', 'Anthony', 'jimm2203@gmail.com', 'picURL', 'auth_id-4');
// INSERT INTO users(username, name, email, profilepic, auth_id)
// VALUES ('Cherika', 'Alex', 'cherika@gmail.com', 'picURL', 'auth_id-5');


// INSERT INTO tickets (auth_id, subject, status, description)
// VALUES ('auth_id-1','Subject','Not Answered','Desc');


// insert into time (date) values (CURRENT_TIMESTAMP);
// ALTER TABLE tickets ADD COLUMN date TIMESTAMP;