import { IsNumber, IsString, NotEquals } from 'class-validator';
import { ClientConfig } from '../domain/clientConfig/clientConfig';

export class CreateClientConfigDto implements ClientConfig {
  constructor(obj: Partial<CreateClientConfigDto>) {
    Object.assign(this, obj);
  }

  @IsString()
  client: string;

  @IsNumber()
  version: number;

  @IsString()
  @NotEquals('version')
  key: string;

  @IsString()
  value: string;
}
