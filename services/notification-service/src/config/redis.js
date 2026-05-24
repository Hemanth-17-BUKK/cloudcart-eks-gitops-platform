const redis = require("redis");

const subscriber = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

subscriber.on("error", (err) => {
  console.error("Redis Subscriber Error:", err);
});

const connectSubscriber = async () => {
  try {
    await subscriber.connect();

    console.log("Redis subscriber connected");

    await subscriber.subscribe(
      "user_registered",
      (message) => {
        console.log(
          "Welcome notification processed:",
          message
        );
      }
    );

    console.log(
      "Subscribed to user_registered channel"
    );

  } catch (error) {
    console.error(
      "Redis subscriber connection failed:",
      error
    );
  }
};

connectSubscriber();

module.exports = subscriber;
