import { stream } from "./utils/streamUtils.js";
import {homedir} from 'os';

process.chdir(homedir())
stream()