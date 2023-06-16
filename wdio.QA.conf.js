import {config} from './wdio.conf.js'
import * as dotenv from 'dotenv'
dotenv.config({ path: './url.env' });


config.baseUrl = process.env.QA_URL

export default {config}
