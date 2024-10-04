import { ErrorRequestHandler } from "express";

// Middleware handle error
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.message === 'File uploaded must be .sol') {
        res.status(400).send('File uploaded must be .sol');
    } else {
        res.status(500).send('An internal server error occurred');
    }
    /**
     * Passes the error to the next middleware function for handling.
     * @param err - The error object to be passed to the next middleware.
     */
    next(err);
};
