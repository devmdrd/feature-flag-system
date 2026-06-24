const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KEY_RE = /^[a-zA-Z0-9_-]+$/;
const PASSWORD_UPPERCASE_RE = /[A-Z]/;
const PASSWORD_NUMBER_RE = /[0-9]/;
const PASSWORD_SPECIAL_RE = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const BCRYPT_SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;
const MAX_KEY_LENGTH = 100;
const MAX_NAME_LENGTH = 100;
const DEFAULT_CORS_ORIGINS = ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:4202'];
const DEFAULT_PORT = 3000;
const DEFAULT_DB_HOST = 'localhost';
const DEFAULT_DB_NAME = 'feature_flags';
const DEFAULT_JWT_EXPIRES_IN = '3h';

module.exports = {
  EMAIL_RE,
  KEY_RE,
  PASSWORD_UPPERCASE_RE,
  PASSWORD_NUMBER_RE,
  PASSWORD_SPECIAL_RE,
  BCRYPT_SALT_ROUNDS,
  MIN_PASSWORD_LENGTH,
  MAX_KEY_LENGTH,
  MAX_NAME_LENGTH,
  DEFAULT_CORS_ORIGINS,
  DEFAULT_PORT,
  DEFAULT_DB_HOST,
  DEFAULT_DB_NAME,
  DEFAULT_JWT_EXPIRES_IN,
};
