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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, userService, JwtStrategy) {
        this.userModel = userModel;
        this.userService = userService;
        this.JwtStrategy = JwtStrategy;
    }
    async registerUser(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const existingUser = await this.userService.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const newUser = await this.userService.createUser({
            ...createUserDto,
            password: hashedPassword,
        });
        const payload = { email: newUser.email, sub: newUser._id };
        const accessToken = this.JwtStrategy.sign(payload);
        return { user: newUser, accessToken };
    }
    async loginUser(LoginDto) {
        const existingUser = await this.userService.findByEmail(LoginDto.email);
        if (!existingUser) {
            throw new Error('User is not found');
        }
        const isPasswordValid = await bcrypt.compare(LoginDto.password, existingUser.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const payload = { email: existingUser.email, sub: existingUser._id };
        const accessToken = this.JwtStrategy.sign(payload);
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map