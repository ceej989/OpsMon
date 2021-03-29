import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApprovalModule } from './approval/approval.module';
import { PermissionModule } from './permission/permission.module';
import { RiskratingModule } from './riskrating/riskrating.module';
import { DepartmentModule } from './department/department.module';
import { ApplicationModule } from './application/application.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({   
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "postgres",
      "database": "opsmon",
      "entities": [__dirname + '/**/entities/*.entity.{ts,js}'],
      "autoLoadEntities": true,
      "synchronize": true
    }), //config autopulled from ormconfig.json
    ApprovalModule,
    PermissionModule,
    RiskratingModule,
    DepartmentModule,
    ApplicationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor (private connection: Connection){}
}
