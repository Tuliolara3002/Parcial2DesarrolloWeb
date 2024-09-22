import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    private readonly errorHandler: ErrorHandleService,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    try {
      const empleado = this.empleadoRepository.create(createEmpleadoDto);
      await this.empleadoRepository.save(empleado);
      return empleado;
    } catch (error) {
      this.errorHandler.errorHandle(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      return await this.empleadoRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.errorHandler.errorHandle(error);
    }
  }

  async findOne(term: string) {
    let empleado: Empleado;
    try {
      if (isUUID(term)) {
        empleado = await this.empleadoRepository.findOneBy({ id: term });
      } else {
        empleado = await this.empleadoRepository
          .createQueryBuilder('empleado')
          .where('UPPER(empleado.nombre) = :nombre OR empleado.slug = :slug', {
            nombre: term.toUpperCase(),
            slug: term.toLowerCase(),
          })
          .getOne();
      }

      if (!empleado) {
        throw new NotFoundException(`Empleado with term ${term} not found`);
      }

      return empleado;
    } catch (error) {
      this.errorHandler.errorHandle(error);
    }
  }

  async update(id: string, updateEmpleadoDto: UpdateEmpleadoDto) {
    try {
      const empleado = await this.empleadoRepository.preload({
        id: id,
        ...updateEmpleadoDto,
      });

      if (!empleado) {
        throw new NotFoundException(`Empleado with id: ${id} not found`);
      }

      await this.empleadoRepository.save(empleado);
      return empleado;
    } catch (error) {
      this.errorHandler.errorHandle(error);
    }
  }

  async remove(id: string) {
    try {
      const empleado = await this.findOne(id);
      if (!empleado) {
        throw new NotFoundException(`Empleado with id ${id} not found`);
      }

      await this.empleadoRepository.remove(empleado);
      return `Empleado with id ${id} has been deleted`;
    } catch (error) {
      this.errorHandler.errorHandle(error);
    }
  }
}
