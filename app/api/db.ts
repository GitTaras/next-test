import {Pool, ClientConfig} from "pg";

let params: ClientConfig = {};

console.log('server db', process.env.NEXT_PUBLIC_PGSQL_STRING);
console.log('server mapbox', process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

if (process.env.NEXT_PUBLIC_PGSQL_STRING) {
    params.connectionString = process.env.NEXT_PUBLIC_PGSQL_STRING;
} else {
    params.user = process.env.NEXT_PUBLIC_USER;
    params.password = process.env.NEXT_PUBLIC_PASSWORD;
    params.host = process.env.NEXT_PUBLIC_HOST;
    params.port = Number(process.env.NEXT_PUBLIC_PORT);
    params.database = process.env.NEXT_PUBLIC_DATABASE
}


const conn = new Pool(params);

export default conn;