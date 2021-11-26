// eslint-disable-next-line no-unused-vars
import express from 'express' 

declare global {
        namespace Express {
                interface Request {
                        token: string,
                        user: import('../../models/User').userInterface
                }
        }
}