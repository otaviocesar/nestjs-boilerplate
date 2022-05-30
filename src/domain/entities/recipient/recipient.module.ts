import { Module } from '@nestjs/common';
import { RecipientController } from '../../../interfaces/http/recipient.controller';
import { RecipientService } from '../../../app/services/recipient.service';
import { HttpClient } from '../../../infra/adapters/http-client/http-client.operations';
import { HttpModule } from '@nestjs/axios';
import { RecipientBankAccountController } from '../../../interfaces/http/recipient-bank-account.controller';

@Module({
  imports: [HttpModule],
  controllers: [RecipientController, RecipientBankAccountController],
  providers: [
    {
      provide: 'RecipientServicePort',
      useClass: RecipientService,
    },
    {
      provide: 'HttpClientPort',
      useClass: HttpClient,
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
