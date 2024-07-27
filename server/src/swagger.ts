const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Todo Swagger",
    version: "1.0.0",
    description: "Documentação todo list tasks",
  },
  servers: [
    {
      url: "https://todo-challenges.vercel.app",
    },
  ],
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "1",
          },
          title: {
            type: "string",
            example: "My Task",
          },
          description: {
            type: "string",
            example: "Description of the task",
          },
          isDone: {
            type: "boolean",
            example: false,
          },
          expectedDate: {
            type: "string",
            format: "date-time",
            example: "2024-07-27T00:00:00Z",
          },
          createdBy: {
            type: "string",
            example: "user-id",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-27T00:00:00Z",
          },
          completedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-27T00:00:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-27T00:00:00Z",
          },
          users: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["user-id1", "user-id2"],
          },
        },
        required: ["title", "isDone", "expectedDate"],
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "user-id",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "john.doe@example.com",
          },
          password: {
            type: "string",
            example: "password123",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-27T00:00:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-27T00:00:00Z",
          },
        },
        required: ["name", "email", "password"],
      },
    },
  },
};

export default swaggerDefinition;
