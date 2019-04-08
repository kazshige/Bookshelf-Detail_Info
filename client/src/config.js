export default {
  backendUrl: process.env.NODE_ENV === "development"? "http://localhost:3002": ""
};