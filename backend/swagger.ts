import swaggerJSDoc from "swagger-jsdoc";
import * as path from "path";
import * as fs from "fs";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API Documentation for your Express TypeScript app",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  // Recursively find all .ts files in the specified directory
  apis: getRouteFiles(path.join(__dirname, "routes", ".")),
};

function getRouteFiles(dir: any) {
  // Add type annotations
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

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
