import { validateSync } from 'class-validator';
import { CreateClientConfigDto } from '../../dto/createClientConfig.dto';
import { IncorrectInputError } from '../../../common/errors/errors';

export interface ClientConfig {
  id?: string;
  client: string;
  version: number;
  key: string;
  value: string;
}

export function newClientConfig(client: string, version: number, key: string, value: string): ClientConfig {
  const config = new CreateClientConfigDto({ client, key, value, version });
  const errors = validateSync(config);

  if (errors.length) {
    throw new IncorrectInputError(errors);
  }

  const id = clientConfigId(client, version);

  return { id, client, key, value, version };
}

export function clientConfigId(client: string, version: number): string {
  return `${client}-${version}`;
}
