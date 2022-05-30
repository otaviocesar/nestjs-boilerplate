import {
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  Headers,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { RecipientServicePort } from '../../domain/ports/primary/recipient-service.port';
import RecipientHeaderDto from '../../domain/entities/recipient/recipient-header.dto';
import PostRecipientDto from '../../domain/entities/recipient/post-recipient.dto';
import { CustomValidationPipe } from '../../infra/exceptions/validation.pipe';
import ResponseSucessDto from '../../domain/entities/recipient/response-success.dto';
import ResponseErrorDto from '../../domain/entities/recipient/response-error.dto';

@ApiTags('recipients')
@Controller('recipient-bank-accounts')
export class RecipientBankAccountController {
  constructor(
    @Inject('RecipientServicePort')
    private recipientServicePort: RecipientServicePort,
  ) {}

  @ApiOperation({
    summary:
      'Create bank account and updates all recipients associated with the cpfCnpj provided.',
  })
  @ApiCreatedResponse({
    description: 'Created.',
    type: ResponseSucessDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
    type: ResponseErrorDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.', type: ResponseErrorDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
    type: ResponseErrorDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error.',
    type: ResponseErrorDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async post(
    @Body(new CustomValidationPipe()) recipient: PostRecipientDto,
    @Headers() headers: RecipientHeaderDto,
  ): Promise<any> {
    return this.recipientServicePort.post(headers, recipient);
  }
}
