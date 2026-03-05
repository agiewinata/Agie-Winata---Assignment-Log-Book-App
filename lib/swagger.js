    const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Assignment Logbook API',
        version: '1.0.0',
        description: 'REST API for managing assignments',
    },
    servers: [
        {
        url: 'http://localhost:3000',
        description: 'Development server',
        },
    ],
    paths: {
        '/api/assignments': {
        get: {
            summary: 'Get all assignments',
            tags: ['Assignments'],
            responses: {
            200: { description: 'List of all assignments' }
            }
        },
        post: {
            summary: 'Create a new assignment',
            tags: ['Assignments'],
            requestBody: {
            required: true,
            content: {
                'application/json': {
                schema: {
                    type: 'object',
                    required: ['title', 'subject', 'dueDate'],
                    properties: {
                        title: { type: 'string', example: 'REST API Assignment' },
                        description: { type: 'string', example: 'Build a REST API' },
                        status: { type: 'string', enum: ['Create', 'On Process', 'Submitted'], example: 'Create' },
                        dueDate: { type: 'string', example: '2026-03-10' }
                    }
                }
                }
            }
            },
            responses: {
            201: { description: 'Assignment created successfully' },
            400: { description: 'Missing required fields' }
            }
        }
        },
        '/api/assignments/{id}': {
        get: {
            summary: 'Get assignment by ID',
            tags: ['Assignments'],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'integer' },
                description: 'Assignment ID'
            }
            ],
            responses: {
            200: { description: 'Assignment found' },
            404: { description: 'Assignment not found' }
            }
        },
        put: {
            summary: 'Update an assignment',
            tags: ['Assignments'],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'integer' },
                description: 'Assignment ID'
            }
            ],
            requestBody: {
            required: true,
            content: {
                'application/json': {
                schema: {
                    type: 'object',
                    required: ['title', 'subject', 'dueDate'],
                    properties: {
                    title: { type: 'string', example: 'REST API Assignment' },
                    description: { type: 'string', example: 'Build a REST API' },
                    status: { type: 'string', enum: ['Create', 'On Process', 'Submitted'], example: 'Create' },
                    dueDate: { type: 'string', example: '2026-03-10' }
                    }
                }
                }
            }
            },
            responses: {
            200: { description: 'Assignment updated successfully' },
            404: { description: 'Assignment not found' },
            400: { description: 'Missing required fields' }
            }
        },
        delete: {
            summary: 'Delete an assignment',
            tags: ['Assignments'],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'integer' },
                description: 'Assignment ID'
            }
            ],
            responses: {
            200: { description: 'Assignment deleted successfully' },
            404: { description: 'Assignment not found' }
            }
        }
        }
    }
    };

    export const swaggerSpec = swaggerDefinition;