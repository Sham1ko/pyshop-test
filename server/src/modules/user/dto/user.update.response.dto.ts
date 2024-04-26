import { Exclude } from 'class-transformer';

export class UserUpdateResponseDto {
  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.phoneNumber = data.phoneNumber;
    this.address = data.address;
    this.password = data.password;
  }

  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;

  @Exclude()
  password: string;
}
