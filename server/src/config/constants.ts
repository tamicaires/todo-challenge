export const dbkeys = {
  dbUrl: process.env.DATABASE_URL as string,
};

export const jwtKeys = {
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpire: process.env.JWT_EXPIRE as string,
};
