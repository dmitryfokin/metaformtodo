DROP DATABASE IF EXISTS exampletodo;
DROP USER IF EXISTS marcus;
CREATE USER marcus WITH PASSWORD 'marcus';
CREATE DATABASE exampletodo OWNER marcus;

