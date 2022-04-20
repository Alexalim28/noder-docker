module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PWD: process.env.MONGO_PWD,
    REDIS_URL: process.env.MONGO_URL || "redis",
    REDIS_PORT: process.env.MONGO_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET 
}