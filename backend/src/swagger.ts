import swaggerJSDoc from "swagger-jsdoc";
import * as path from "path";
import * as fs from "fs";

// Swagger options for API documentation
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CONNECT APP BACKEND API",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    // Security schemes for JWT authentication
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    // Components section to define security scheme
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // Recursively find all .ts files in the specified directory for API documentation
  apis: getRouteFiles(path.join(__dirname, "routes", ".")),
};

// Recursively find all .ts files in the specified directory
function getRouteFiles(dir: any) {
  let results: any[] = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      results = results.concat(getRouteFiles(filePath));
    } else if (file.endsWith(".ts")) {
      results.push(filePath);
    }
  });

  return results;
}

// Define parameters for Authorization header
const bearerAuthHeader = {
  name: "Authorization", // Header name
  in: "header", // Location of the parameter
  description: "Bearer token in the format 'Bearer {token}'", // Description
  required: true, // Indicates it's a required header
  schema: {
    type: "string",
    format: "Bearer {token}", // Example format
  },
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
