declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_URL: string;
    MODE: "development" | "production";
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  }
}
