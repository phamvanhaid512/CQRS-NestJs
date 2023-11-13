import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
// import { CassandraModule } from './config/cassandra.module';
import { ApplicationModule } from './application/application.module';
import { InfraModule } from './infra/infra.module';
import { CoreModule } from './core/core.module';
@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot(),
    ApplicationModule,
    InfraModule,
    CoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
