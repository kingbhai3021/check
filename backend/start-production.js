#!/usr/bin/env node

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load production environment variables
dotenv.config({ path: path.join(__dirname, 'production.env') });

// Set production environment
process.env.NODE_ENV = 'production';

// Import and start the server
import('./index.js');
