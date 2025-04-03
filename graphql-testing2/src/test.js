import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data =  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');
console.log(data);
