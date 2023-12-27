import {Pool, ClientConfig} from "pg";

let params: ClientConfig = {};

if (process.env.PGSQL_STRING) {
    params.connectionString = process.env.PGSQL_STRING;
} else {
    params.user = process.env.PGSQL_USER;
    params.password = process.env.PGSQL_PASSWORD;
    params.host = process.env.PGSQL_HOST;
    params.port = Number(process.env.PGSQL_PORT);
    params.database = process.env.PGSQL_DATABASE
}


const conn = new Pool(params);

export default conn;