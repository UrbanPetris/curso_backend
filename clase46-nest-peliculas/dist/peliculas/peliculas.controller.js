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
exports.PeliculasController = void 0;
const common_1 = require("@nestjs/common");
const peliculas_service_1 = require("./peliculas.service");
const create_pelicula_dto_1 = require("./dto/create-pelicula.dto");
const update_pelicula_dto_1 = require("./dto/update-pelicula.dto");
let PeliculasController = class PeliculasController {
    constructor(peliculasService) {
        this.peliculasService = peliculasService;
    }
    create(createPeliculaDto) {
        return this.peliculasService.create(createPeliculaDto);
    }
    findAll() {
        return this.peliculasService.findAll();
    }
    findOne(id) {
        return this.peliculasService.findOne(id);
    }
    update(id, updatePeliculaDto) {
        return this.peliculasService.update(id, updatePeliculaDto);
    }
    remove(id) {
        return this.peliculasService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pelicula_dto_1.CreatePeliculaDto]),
    __metadata("design:returntype", void 0)
], PeliculasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PeliculasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeliculasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pelicula_dto_1.UpdatePeliculaDto]),
    __metadata("design:returntype", void 0)
], PeliculasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeliculasController.prototype, "remove", null);
PeliculasController = __decorate([
    (0, common_1.Controller)('peliculas'),
    __metadata("design:paramtypes", [peliculas_service_1.PeliculasService])
], PeliculasController);
exports.PeliculasController = PeliculasController;
//# sourceMappingURL=peliculas.controller.js.map