import swaggerAutogen from "swagger-autogen";
import 'dotenv/config';

const doc = {
  info: {
    version: "v1.0.0",
    title: "Library Management Information System",
    description: "RCA library management information system",
  },
  servers: [
    {
      url: "http://localhost:"+ process.env.PORT,
      description: "Library Management",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routes/userRoutes.ts",
  "./routes/BookRoutes.ts",
  "./routes/authRoutes.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
