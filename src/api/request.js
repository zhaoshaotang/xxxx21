import axios from 'axios'
import { url, visUrl } from '../config';

const service=axios.create({
 baseURL:visUrl,
 timeout:5000     //访问超时的时间限制
});
export  default  service

