import { Exclude } from 'class-transformer';

export class MeResponseDto {
  id: number;
  email: string;
  @Exclude()
  password: string;
}
