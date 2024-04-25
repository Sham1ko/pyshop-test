import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
