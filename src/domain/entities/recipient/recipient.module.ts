import { Module } from '@nestjs/common';
import { RecipientController } from '../../../interfaces/http/recipient.controller';
import { RecipientService } from '../../../app/services/recipient.service';
import { Gateway } from '../../../infra/adapters/gateway/gateway.operations';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RecipientController],
  providers: [
    {
      provide: 'RecipientServicePort',
      useClass: RecipientService,
    },
    {
      provide: 'GatewayPort',
      useClass: Gateway,
    },
  ],
  exports: [
    {
      provide: 'RecipientServicePort',
      useClass: RecipientService,
    },
  ],
})
export class RecipientModule {}
