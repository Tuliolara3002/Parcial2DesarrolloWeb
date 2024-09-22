import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('empleados') // Nombre de la ruta
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    try {
      return await this.empleadosService.create(createEmpleadoDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      return await this.empleadosService.findAll(paginationDto);
    } catch (error) {
      throw error;
    }
  }

  @Get(':term')
  async findOne(@Param('term') term: string) {
    try {
      return await this.empleadosService.findOne(term);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    try {
      return await this.empleadosService.update(id, updateEmpleadoDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.empleadosService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
