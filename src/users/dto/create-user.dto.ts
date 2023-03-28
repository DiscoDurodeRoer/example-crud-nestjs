import { IsPositive, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    
    @IsPositive() // Valido si es positivo
    @IsOptional() // No es obligatorio de incluir
    id?: number;
    
    @IsNotEmpty() // Es obligatorio de incluir
    name: string;
    
    @IsNotEmpty() // Es obligatorio de incluir
    @IsEmail() // Debe tener un formato de email
    email: string;
}
