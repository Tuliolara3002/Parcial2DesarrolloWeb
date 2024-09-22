import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { Empleado } from './entities/empleado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

@Module({
  controllers: [EmpleadosController],
  providers: [EmpleadosService, ErrorHandleService],
  imports: [TypeOrmModule.forFeature([Empleado])],
})
export class EmpleadosModule {}
