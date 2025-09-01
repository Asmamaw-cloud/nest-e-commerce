import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(u => u.id === id);
  }

  create(userData: any) {
    const user = { id: Date.now(), ...userData };
    this.users.push(user);
    return user;
  }

  update(id: number, updateData: any) {
    const user = this.findOne(id);
    Object.assign(user, updateData);
    return user;
  }
}
