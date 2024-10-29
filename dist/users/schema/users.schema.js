"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSchema = exports.Users = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const location_schema_1 = require("../../location/schema/location.schema");
const organization_schema_1 = require("../../organization/schema/organization.schema");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        lowercase: true,
        sparse: true,
        trim: true,
        set: (value) => (value === '' ? null : value),
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: organization_schema_1.Organization.name,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Users.prototype, "organization", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: location_schema_1.Location.name,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Users.prototype, "location", void 0);
exports.Users = Users = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Users);
exports.UsersSchema = mongoose_1.SchemaFactory.createForClass(Users);
//# sourceMappingURL=users.schema.js.map