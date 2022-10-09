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
exports.PeliculasService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
let PeliculasService = class PeliculasService {
    constructor(peliculaModel) {
        this.peliculaModel = peliculaModel;
    }
    async create(createPeliculaDto) {
        const createdPelicula = new this.peliculaModel(createPeliculaDto);
        return await createdPelicula.save();
    }
    async findAll() {
        return await this.peliculaModel.find().exec();
    }
    async findOne(id) {
        return await this.peliculaModel.findById(id).exec();
    }
    async update(id, updatePeliculaDto) {
        const updatedPelicula = await this.peliculaModel.findByIdAndUpdate(id, updatePeliculaDto);
        if (!updatedPelicula) {
            throw new common_1.NotFoundException();
        }
        return updatedPelicula;
    }
    async remove(id) {
        const deletedPelicula = await this.peliculaModel.findByIdAndDelete(id);
        if (!deletedPelicula) {
            throw new common_1.NotFoundException();
        }
        return deletedPelicula;
    }
};
PeliculasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PELICULA_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PeliculasService);
exports.PeliculasService = PeliculasService;
//# sourceMappingURL=peliculas.service.js.map