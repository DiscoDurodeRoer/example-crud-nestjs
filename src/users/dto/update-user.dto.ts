import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType: hereda todas las propiedades de CreateUserDto y hace que sean opcionales
export class UpdateUserDto extends PartialType(CreateUserDto) {}
