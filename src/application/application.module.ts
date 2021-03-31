import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRepository } from './application.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ApplicationRepository])],
})
export class ApplicationModule {}
