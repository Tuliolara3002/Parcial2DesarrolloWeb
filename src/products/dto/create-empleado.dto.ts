import {
    IsString,
    IsNumber,
    IsOptional,
    IsPositive,
    MinLength
} from 'class-validator';

export class CreateEmpleadoDto {

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    edad?: number;

    @IsString()
    @MinLength(1)
    puesto: string;

    @IsString()
    @IsOptional()
    departamento?: string;

    @IsNumber()
    @IsOptional()
    salario?: number;
}
