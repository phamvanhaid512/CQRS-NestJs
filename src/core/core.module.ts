import { Module } from '@nestjs/common';
import { InfraModule } from "src/infra/infra.module";
import { commandHandlers } from './command/';
import { queryHandler } from './queries';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
@Module({
  imports:[InfraModule,CqrsModule ],
  providers: [...commandHandlers,...queryHandler],
  exports: [...commandHandlers,...queryHandler],
})
export class CoreModule {}
