import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(userData: any) {
    // Save user to DB here (use UsersService)
    const user = { id: 'some-user-id', ...userData };
    // generate JWT after registration
    const access_token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { message: 'User registered', access_token };
  }

  async login(credentials: any) {
    // Validate user credentials with DB here
    const user = { id: 'some-user-id', email: credentials.email }; // fetched from DB
    const access_token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { message: 'User logged in', access_token };
  }
}
