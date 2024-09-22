import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('empleados') // Nombre de la tabla
export class Empleado {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    nombre: string;

    @Column('text', {
        default: '',
    })
    puesto: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    salario: number;

    @Column('text', {
        unique: true,
    })
    departamento: string;

    @Column('int', {
        default: 0,
    })
    extension_telefonica: number;

    @Column('text', {
        unique: true,
    })
    slug: string;

    @BeforeInsert()
    checkSlugInsert() {
        this.slug = this.nombre
            .toLowerCase()
            .replace(/ /g, '_')
            .replace(/'/g, '');
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.nombre
            .toLowerCase()
            .replace(/ /g, '_')
            .replace(/'/g, '');
    }
}
