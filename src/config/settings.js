import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  AI_API_KEY: process.env.AI_API_KEY || AIzaSyAGHRl2e2FE_twCpFOPskzfCll12SnSc9w,
};

export default config;