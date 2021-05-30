"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = exports.pool = void 0;
var pg_1 = require("pg");
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var pool = new pg_1.Pool();
exports.pool = pool;
var s3 = new aws_sdk_1.default.S3();
exports.s3 = s3;
pool.on('error', function (err) {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
//# sourceMappingURL=connections.js.map