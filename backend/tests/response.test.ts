import { sendSuccess, sendError, sendPaginatedSuccess } from '../src/utils/response';
import { Response } from 'express';

describe('Response Utilities', () => {
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        mockResponse = {
            status: statusMock,
            json: jsonMock,
        };
    });

    describe('sendSuccess', () => {
        it('should send success response with data', () => {
            const data = { id: 1, name: 'Test' };
            sendSuccess(mockResponse as Response, data, 'Success');

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Success',
                data,
            });
        });

        it('should use custom status code', () => {
            sendSuccess(mockResponse as Response, null, 'Created', 201);
            expect(statusMock).toHaveBeenCalledWith(201);
        });
    });

    describe('sendError', () => {
        it('should send error response', () => {
            sendError(mockResponse as Response, 'Something went wrong', 400);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                error: 'Something went wrong',
                errors: undefined,
            });
        });

        it('should include validation errors if provided', () => {
            const errors = [{ field: 'email', message: 'Invalid email' }];
            sendError(mockResponse as Response, 'Validation failed', 400, errors);

            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                error: 'Validation failed',
                errors,
            });
        });
    });

    describe('sendPaginatedSuccess', () => {
        it('should send paginated response', () => {
            const data = [{ id: 1 }, { id: 2 }];
            const pagination = {
                page: 1,
                limit: 10,
                total: 50,
                totalPages: 5,
                hasMore: true,
            };

            sendPaginatedSuccess(mockResponse as Response, data, pagination, 'Fetched');

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Fetched',
                data,
                pagination,
            });
        });
    });
});
