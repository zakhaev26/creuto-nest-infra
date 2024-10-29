"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationSchema = void 0;
const zod_1 = require("zod");
exports.LocationSchema = zod_1.z.object({
    name: zod_1.z.string().min(5, 'too short location name!').max(10, 'too big location name!'),
    x: zod_1.z.number(),
    y: zod_1.z.number(),
});
//# sourceMappingURL=location.dto.js.map