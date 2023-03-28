import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  // Datos
  private users: User[] = [
    {
      id: 1,
      name: 'Fernando',
      email: 'fernando@gmail.com'
    },
    {
      id: 2,
      name: 'Alberto',
      email: 'alberto@gmail.com'
    },
    {
      id: 3,
      name: 'Miguel',
      email: 'miguel@gmail.com'
    },
  ];

  // Simulamos un autoincrement
  private autoIncrement: number = 4;

  /**
   * Crea un usuario
   * @param createUserDto 
   * @returns 
   */
  create(createUserDto: CreateUserDto) {
    
    // obtenemos el id que nos dan en createUserDto
    let id = createUserDto.id

    // sino existe el id, lo autoincrementamos
    if(!id){
      id = this.autoIncrement++;
    }else{
      // El id existe
      // Comprobamos si el id existe
      if(this.users.find(u => u.id == id)){
        throw new ConflictException('El id ya existe');
      }
      this.autoIncrement = id + 1;
    }

    // Comprobamos si el email existe
    if(this.users.find(u => u.email == createUserDto.email)){
      throw new ConflictException('El email ya existe');
    }

    // Creamos el usuario
    const user = {
      id,
      name: createUserDto.name,
      email: createUserDto.email
    };

    // añadimos el usuario al array
    this.users.push(user);

    // devolvemos el usuario
    return user;
  }

  /**
   * Devolvemos todos los usuarios
   * @returns 
   */
  findAll() {
    return this.users;
  }

  /**
   * Devolvemos un usuario dado un id
   * @param id 
   * @returns 
   */
  findOne(id: number) {
    return this.users.find(user => user.id == id);
  }

  /**
   * Actualizamos un usuario
   * @param id 
   * @param updateUserDto 
   * @returns 
   */
  update(id: number, updateUserDto: UpdateUserDto) {
    // Buscamos si el usuario existe
    let user = this.users.find(user => user.id == id);
    if(user){

      // Compruebo si el nuevo id existe, evitamos la comprobacion del propio usuario a editar
      if(updateUserDto.id && this.users.find(user => user.id != id && user.id == updateUserDto.id)){
        throw new ConflictException('El id ya existe');
      }

      // Compruebo si el nuevo email existe, evitamos la comprobacion del propio usuario a editar
      if(updateUserDto.email && this.users.find(user => user.id != id && user.email == updateUserDto.email)){
        throw new ConflictException('El email ya existe');
      }

      // Modificamos el id si viene en el objeto updateUserDto, sino le dejamos el que original
      user.id = updateUserDto.id ? updateUserDto.id : user.id;
      // Modificamos el name si viene en el objeto updateUserDto, sino le dejamos el que original
      user.name = updateUserDto.name ? updateUserDto.name : user.name;
      // Modificamos el email si viene en el objeto updateUserDto, sino le dejamos el que original
      user.email = updateUserDto.email ? updateUserDto.email : user.email;

      // Devuelve el usuario
      return user;
    }
    return null;
  }

  /**
   * Eliminamos un usuario dado un id
   * @param id 
   * @returns 
   */
  remove(id: number) {
    // Buscamos el id de un usuario
    let userIndex = this.users.findIndex(user => user.id == id);
    // Si existe lo borramos con splice
    if(userIndex != -1){
      this.users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}
