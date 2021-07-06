const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/todo", async (req, res) => {
    try {
        const person = await pool.query("SELECT * FROM register");
        res.json(person.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.get("/error", async (req, res) => {
    const errors = await pool.query("SELECT * FROM error WHERE \"isActive\" = $1", [true]);
    res.json(errors.rows);
});

app.get("/anError/:id", async (req, res) => {
    const {id} = req.params;
    const error = await pool.query("SELECT * FROM error WHERE id = $1", [id]);
    res.json(error.rows);
})

app.post("/register", async (req, res) => {
    const {name,email,password} = req.body;
    const newRegister = await pool.query("INSERT INTO register(name, email, password, \"isActive\") VALUES($1, $2, $3, $4) RETURNING *", [name, email, password, true]);
    const selectComments = await pool.query("SELECT id FROM comments");
    for (let i = 0; i < selectComments.rowCount; i++) {
        const commentUserRelation = await pool.query("INSERT INTO \"commentUser\"(\"userIndex\", \"commentId\", \"isLiked\", \"isDisliked\") VALUES($1, $2, $3, $4)", [newRegister.rows[0].id, selectComments.rows[i].id, false, false])
    }
    res.json(newRegister.rows);
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const newLogin = await pool.query("SELECT * FROM register WHERE email = $1 AND password = $2", [email, password]);
    if (newLogin.rowCount != 0 ) {
        console.log(newLogin.rows);
        res.json({isValid: true, userId: newLogin.rows[0].id});
    }
    else {
        console.log("Try again");
        res.json(false);
    }
});

app.post("/search", async (req, res) => {
    const {search} = req.body;
    console.log(search);
    const searchError = await pool.query("SELECT * FROM error WHERE (\"errorName\" LIKE $1 OR \"errorContent\" LIKE $1) AND \"isActive\" = $2", ['%' + search + '%', true]);
    console.log(searchError.rows);
    res.json(searchError.rows);
})

app.post("/add", async (req, res) => {
    const {header, content, date, userId} = req.body;
    const newError = await pool.query("INSERT INTO error(\"errorName\", \"errorContent\", \"errorDate\", \"isActive\", \"userId\") VALUES($1, $2, $3, $4, $5) RETURNING *", [header, content, date, true, userId]);
    res.json(newError.rows);
    console.log(newError.rows);
});


app.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    const deleteError = await pool.query("UPDATE error SET \"isActive\" = $1 WHERE id = $2", [false, id]);
    const deleteComment = await pool.query("UPDATE comments SET \"isActive\" = $1 WHERE \"errorId\" = $2", [false, id])
    res.json("deleted");
})

app.put("/edit/:id", async (req, res) => {
    const {id} = req.params;
    const {name, content, date} = req.body;
    const editError = await pool.query("UPDATE error SET \"errorName\" = $1, \"errorContent\" = $2, \"errorDate\" = $3 WHERE id = $4", [name, content, date, id]);
    res.json(editError.rows);
})

app.post("/comment", async (req, res) => {
    const {comment, date, errorId, userId} = req.body;
    const saveComment = await pool.query("INSERT INTO comments(\"comment\", \"commentDate\", \"errorId\", \"whoseComment\", \"isActive\") VALUES($1, $2, $3, (SELECT name FROM register WHERE id = $4), $5)", [comment, date, errorId, userId, true]);
    const allUsers = await pool.query("SELECT id FROM register");
    for (let i = 0; i < allUsers.rowCount; i++) {
        console.log(allUsers.rows[i].id);
        const commentUserRelation = await pool.query("INSERT INTO \"commentUser\"(\"userIndex\", \"commentId\", \"isLiked\", \"isDisliked\") VALUES($1, (SELECT \"id\" FROM comments WHERE \"comment\" = $2 AND \"commentDate\" = $3 AND \"errorId\" = $4 AND \"whoseComment\" = (SELECT name FROM register WHERE id = $5)), $6, $7)", [allUsers.rows[i].id, comment, date, errorId, userId ,false, false])
    }
    res.json(saveComment.rows);
})

app.get("/allComments/:id", async (req, res) => {
    const {id} = req.params;
    const comments = await pool.query("SELECT * FROM comments WHERE \"errorId\" = $1 AND \"parentCommentId\" IS NULL ORDER BY \"like\" DESC", [id]);
    res.json(comments.rows);
})

app.post("/extraComment", async (req, res) => {
    const {comment, date, errorId, userId, commentId} = req.body;
    const childComments = await pool.query("INSERT INTO comments(\"comment\", \"commentDate\", \"errorId\", \"whoseComment\", \"parentCommentId\", \"isActive\") VALUES($1, $2, $3, (SELECT name FROM register WHERE id = $4), $5, $6)", [comment, date, errorId, userId, commentId, true]);
})

app.get("/childComments/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const specificChildComments = await pool.query("SELECT * FROM comments WHERE \"parentCommentId\" = $1", [commentId]);
    res.json(specificChildComments.rows);
})

app.put("/rate/:id/:userId", async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    const checkLike = await pool.query("SELECT \"isLiked\" FROM \"commentUser\" WHERE \"userIndex\" = $1 AND \"commentId\" = $2", [userId, id]);
    if (checkLike.rows[0].isLiked) {
        const setRate = await pool.query("UPDATE comments SET \"like\" = (SELECT \"like\" FROM comments WHERE \"id\" = $1) - 1 WHERE id = $1", [id]);
        const fixLike = await pool.query("UPDATE \"commentUser\" SET \"isLiked\" = $1 WHERE \"userIndex\" = $2 AND \"commentId\" = $3", [false, userId, id]);
        res.json(setRate.rows);
    }
    else {
        const setRate = await pool.query("UPDATE comments SET \"like\" = (SELECT \"like\" FROM comments WHERE \"id\" = $1) + 1 WHERE id = $1", [id]);
        const fixLike = await pool.query("UPDATE \"commentUser\" SET \"isLiked\" = $1 WHERE \"userIndex\" = $2 AND \"commentId\" = $3", [true, userId, id])
        res.json(setRate.rows);
    }
})

app.put("/rate2/:id/:userId", async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    const checkLike2 = await pool.query("SELECT \"isDisliked\" FROM \"commentUser\" WHERE \"userIndex\" = $1 AND \"commentId\" = $2", [userId, id]);
    if (checkLike2.rows[0].isDisliked) {
        const setRate = await pool.query("UPDATE comments SET \"dislike\" = (SELECT \"dislike\" FROM comments WHERE \"id\" = $1) - 1 WHERE id = $1", [id]);
        const fixLike2 = await pool.query("UPDATE \"commentUser\" SET \"isDisliked\" = $1 WHERE \"userIndex\" = $2 AND \"commentId\" = $3", [false, userId, id])
        res.json(setRate.rows);
    }
    else {
        const setRate = await pool.query("UPDATE comments SET \"dislike\" = (SELECT \"dislike\" FROM comments WHERE \"id\" = $1) + 1 WHERE id = $1", [id]);
        const fixLike2 = await pool.query("UPDATE \"commentUser\" SET \"isDisliked\" = $1 WHERE \"userIndex\" = $2 AND \"commentId\" = $3", [true, userId, id])
        res.json(setRate.rows);
    }
})

app.get("/profile/:userId", async (req, res) => {
    const {userId} = req.params;
    const userName = await pool.query("SELECT name FROM register WHERE id = $1", [userId]);
    res.json(userName.rows);
})

app.get("/profileErrors/:userId", async (req, res) => {
    const {userId} = req.params;
    const userErrors = await pool.query("SELECT * FROM error WHERE \"userId\" = $1 AND \"isActive\" = $2", [userId, true]);
    res.json(userErrors.rows);
    console.log(userErrors.rows);
})

app.get("/profileComment/:userId", async (req, res) => {
    const {userId} = req.params;
    const userComment = await pool.query("SELECT * FROM comments WHERE \"isActive\" = $1 AND \"parentCommentId\" IS NULL", [true]);
    res.json(userComment.rows);
})

app.listen(5000, () => {
    console.log("Server has started on port 5000.");
});