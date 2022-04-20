const app = require("express")();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")
const { MONGO_USER, 
        MONGO_PWD, 
        MONGO_IP, 
        MONGO_PORT, 
        REDIS_URL, 
        REDIS_PORT, 
        SESSION_SECRET } = require("./config")

let redisClient = createClient({
     legacyMode: true,
        socket: {
        port: REDIS_PORT,
        host: REDIS_URL
    }
})
redisClient.connect().catch(console.error)

const postRouter = require("./routes/postsRoutes");
const authRouter = require("./routes/authRoutes");

const protect = require("./middleware/authMiddleware")

mongoose
    .connect(`mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    .then(() => console.log("Succesfully connected to database"))
    .catch((e) => console.log(e));

app.use(cors());

app.enable("trust proxy");

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000
    }
}))

app.use(express.json());

app.get("/api/v1", (req, res) => {
    console.log("It's running")
    res.send("<h2>Hello guys</h2>")
})

app.use("/api/v1/posts", protect, postRouter);
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));