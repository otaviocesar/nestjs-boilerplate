import {
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  Headers,
  Inject,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import PatchAllRecipientDto from '../../domain/entities/recipient/patch-all-recipient.dto';

import { RecipientServicePort } from '../../domain/ports/primary/recipient-service.port';
import RecipientHeaderDto from '../../domain/entities/recipient/recipient-header.dto';
import ResponseSucessDto from '../../domain/entities/recipient/response-success.dto';
import { CustomValidationPipe } from '../../infra/exceptions/validation.pipe';
import ResponseErrorDto from '../../domain/entities/recipient/response-error.dto';

@ApiTags('recipients')
@Controller('recipients')
export class RecipientController {
  constructor(
    @Inject('RecipientServicePort')
    private recipientServicePort: RecipientServicePort,
  ) {}

  @ApiOperation({
    summary:
      'Updates the bank account of all recipients associated with the cpfCnpj provided if there is a valid account and a fake account among them.',
  })
  @ApiOkResponse({
    description: 'Success.',
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
  @HttpCode(HttpStatus.OK)
  @Patch()
  async patch(
    @Body(new CustomValidationPipe()) recipient: PatchAllRecipientDto,
    @Headers() headers: RecipientHeaderDto,
  ): Promise<any> {
    return this.recipientServicePort.patchAll(headers, recipient);
  }
}
