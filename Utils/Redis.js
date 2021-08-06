/**
 * @Created 06/08/2021 - 16:20 PM
 * @Project ipo-result-backend
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
/*eslint-disable*/
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT || 6379, process.env.REDIS_HOST || 'localhost');
client.on('error', (error) => {
    console.error(error);
});
client.on('connect', () => {
    console.log('Connected to redis');
});

class RedisContainer {
    constructor(redisClient = client) {
        this._redisClient = redisClient;
        // init 'this' here.
        if (RedisContainer._instance) {
            return RedisContainer._instance;
        }
        RedisContainer._instance = this;
    }

    // uses of singleton pattern
    static createRedisState() {
        return this._instance;
    }

    // set data .
    setData(cacheKey, data) {
        this._redisClient.set(cacheKey, JSON.stringify(data));
    }

    async getData(cacheKey) {
        if (!cacheKey) {
            console.warn('CacheKey is required');
            return;
        }
        return new Promise((resolve, reject) => {
            this._redisClient.get(cacheKey, async (error, data) => {
                if (error) {
                    reject('Error finding data ', error);
                } else {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                }
            });
        });
    }

   async clearCache() {
        return this._redisClient.flushdb((err, succeeded) => {
            if (err) {
                return err;
            }
            return succeeded;
        });
    }
}

module.exports = { RedisContainer };
