"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createS3UploadParams = exports.extractFieldsFromSchool = exports.deleteSchool = exports.updateSchool = exports.insertSchool = exports.findSchool = exports.getSchools = exports.dbName = void 0;
exports.dbName = 'schools';
function getSchools(pool) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, pool.query("SELECT * FROM " + exports.dbName + " ORDER BY id;")];
                case 1:
                    result = _a.sent();
                    return [2, result.rows];
            }
        });
    });
}
exports.getSchools = getSchools;
function findSchool(pool, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, pool.query("SELECT * FROM " + exports.dbName + " WHERE id = $1;", [id])];
                case 1:
                    result = _a.sent();
                    return [2, result.rows];
            }
        });
    });
}
exports.findSchool = findSchool;
function insertSchool(pool, s3, school) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadParams, uploadResult, dbResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uploadParams = createS3UploadParams(school.image);
                    return [4, s3.upload(uploadParams).promise()];
                case 1:
                    uploadResult = _a.sent();
                    return [4, pool.query("\n        INSERT INTO " + exports.dbName + " (name, about, location, admission, image)\n        VALUES ($1, $2, $3, $4, $5)\n        RETURNING *;\n      ", __spreadArray(__spreadArray([], extractFieldsFromSchool(school).slice(0, 4)), [uploadResult.Location]))];
                case 2:
                    dbResult = _a.sent();
                    return [2, dbResult.rows[0]];
            }
        });
    });
}
exports.insertSchool = insertSchool;
function updateSchool(pool, s3, school) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var oldSchool, image, uploadParams, uploadResult, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, findSchool(pool, school.id)];
                case 1:
                    oldSchool = _b.sent();
                    if (!(oldSchool.length === 0)) return [3, 3];
                    return [4, insertSchool(pool, s3, school)];
                case 2: return [2, _b.sent()];
                case 3:
                    image = (_a = oldSchool[0]) === null || _a === void 0 ? void 0 : _a.image;
                    if (!school.image) return [3, 5];
                    uploadParams = createS3UploadParams(school.image);
                    return [4, s3.upload(uploadParams).promise()];
                case 4:
                    uploadResult = _b.sent();
                    image = uploadResult.Location;
                    _b.label = 5;
                case 5: return [4, pool.query("\n    UPDATE " + exports.dbName + "\n    SET name = $1,\n        about = $2,\n        location = $3,\n        admission = $4,\n        image = $5\n    WHERE id = $6\n    RETURNING *;\n    ", __spreadArray(__spreadArray([], extractFieldsFromSchool(school).slice(0, 4)), [image, school.id]))];
                case 6:
                    result = _b.sent();
                    return [2, result.rows[0]];
            }
        });
    });
}
exports.updateSchool = updateSchool;
function deleteSchool(pool, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, pool.query("DELETE FROM " + exports.dbName + " WHERE id = $1 RETURNING id;", [id])];
                case 1:
                    result = _a.sent();
                    return [2, result.rowCount > 0];
            }
        });
    });
}
exports.deleteSchool = deleteSchool;
function extractFieldsFromSchool(school) {
    return [
        school.name,
        school.about,
        school.location,
        school.admission,
        school.image,
        school.id,
    ];
}
exports.extractFieldsFromSchool = extractFieldsFromSchool;
function createS3UploadParams(image) {
    return {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.originalname,
        Body: image.buffer,
        ACL: 'public-read',
    };
}
exports.createS3UploadParams = createS3UploadParams;
//# sourceMappingURL=schoolService.js.map