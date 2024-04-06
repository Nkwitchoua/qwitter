class SessionStore {
    findSession(id) {}
    saveSession(id, session) {}
    findAllSessions() {}
  }
  
  const SESSION_TTL = 24 * 60 * 60;
  const mapSession = ([userID, username, connected]) =>
    userID ? { userID, username, connected: connected === "true" } : undefined;
  
  export class RedisSessionStore extends SessionStore {
    constructor(redisClient) {
      super();
      this.redisClient = redisClient;
    }
  
    async findSession(id) {
      try {
          const session = await new Promise((resolve, reject) => {
              this.redisClient.hmget(`session:${id}`, "userId", (err, reply) => {
                  if (err) {
                      console.log("Error in hmget findSession -> ", err);
                      reject(err);
                  } else {
                      console.log("reply -----> ", reply);
                      resolve(reply);
                  }
              });
          });
  
          console.log('this is what i found ', session);
          return session;
      } catch (error) {
          console.error('Error in findSession: ', error);
          return null;
      }
  }
  
  
    saveSession(id, userId, socketId, connected) {

      console.log(`session saving data: \n sessionId: ${id}, userId: ${userId}, socketId: ${socketId}`);

      this.redisClient
        .hmset(
          `session:${id}`,
          "userId",
          userId,
          "socketId",
          socketId,
          "connected",
          connected
        )
    }
  
    async findAllSessions() {
      const keys = new Set();
      let nextIndex = 0;
      do {
        const [nextIndexAsStr, results] = await this.redisClient.scan(
          nextIndex,
          "MATCH",
          "session:*",
          "COUNT",
          "100"
        );ы
        nextIndex = parseInt(nextIndexAsStr, 10);
        results.forEach((s) => keys.add(s));
      } while (nextIndex !== 0);
      const commands = [];
      keys.forEach((key) => {
        commands.push(["hmget", key, "userID", "username", "connected"]);
      });
      return this.redisClient
        .multi(commands)
        .exec()
        .then((results) => {
          return results
            .map(([err, session]) => (err ? undefined : mapSession(session)))
            .filter((v) => !!v);
        });
    }
  }