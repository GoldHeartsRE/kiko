-- Create Role
CREATE ROLE kikouser WITH
  LOGIN
  PASSWORD 'p';

-- Create Tablespace
CREATE TABLESPACE ts_kiko
  OWNER kikouser
  LOCATION 'C:\kiko\tablespace';

-- Create Database
CREATE DATABASE kikodb
  OWNER kikouser
  TABLESPACE ts_kiko;

-- Connect to the Database
\c kikodb;

-- Create Schema
CREATE SCHEMA kiko_schema AUTHORIZATION kikouser;

-- Change SearchPath
ALTER ROLE kikouser SET search_path TO kiko_schema;

-- Display the updated SearchPath
SHOW search_path;