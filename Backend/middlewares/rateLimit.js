import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 60 * 1000 * 5,
    max: 3,
    message: {
        status: 429,
        message: 'API rate limit exceeded. Please try again later.'
    }
});

export { limiter };
