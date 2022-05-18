import {
  Controller,
  Put,
  HttpStatus,
  HttpCode,
  Body,
  Headers,
  Param,
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
} from '@nestjs/swagger';
import PatchRecipientDto from '../../domain/entities/recipient/patch-all-recipient.dto';

import { RecipientServicePort } from '../../domain/ports/primary/recipient-service.port';
import { AxiosResponse } from 'axios';
import RecipientHeaderDto from 'src/domain/entities/recipient/recipient-header.dto';

@ApiTags('recipients')
@Controller('recipients')
export class RecipientController {
  constructor(
    @Inject('RecipientServicePort')
    private recipientServicePort: RecipientServicePort,
  ) {}

  @ApiOperation({ summary: 'Patch recipient' })
  @ApiOkResponse({ description: 'The record has been successfully patched!' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @HttpCode(HttpStatus.OK)
  @Patch()
  async patch(
    @Body() recipient: PatchRecipientDto,
    @Headers() headers: RecipientHeaderDto,
  ): Promise<any> {
    return this.recipientServicePort.patchAll(headers, recipient);
  }
}
