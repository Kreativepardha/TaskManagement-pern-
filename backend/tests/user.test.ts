// tests/user.test.ts
import { Prisma } from '../src/config/DBconfig';  // Ensure this import is needed and correct
import { Register } from '../src/controllers/userController'; // Correct import path
import { Request, Response } from 'express';
import { jest } from '@jest/globals';

describe('User Registration', () => {
  it('should return 422 for invalid input', async () => {
    // Mock the Request object
    const req = {
      body: {
        email: 'invalidemail', // Invalid email format
        password: 'short', // Password too short
      },
    } as Request;

    // Mock the Response object
    const res = {
      status: jest.fn().mockReturnThis(),  // Allows method chaining like res.status(...).json(...)
      json: jest.fn(), // Mock the json method
    } as unknown as Response;  // Cast as unknown first to bypass type errors, then as Response

    await Register(req, res); // Call the Register function with mocks

    // Assertions to check if the status and json methods were called correctly
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Invalid inputs',
      })
    );
  });
});
