import { newClientConfig } from './clientConfig';
import { IncorrectInputError } from '../../../common/errors/errors';

describe('ClientConfig', () => {
  it('should create new client config', () => {
    const config = { client: 'ios', version: 1, key: 'test', value: 'test' };
    const result = () => newClientConfig(config.client, config.version, config.key, config.value);

    expect(result).not.toThrow();
  });

  it('should throw if key value is equal "version"', () => {
    const config = { client: 'wrong', version: 1, key: 'version', value: 'test' };
    const result = () => newClientConfig(config.client, config.version, config.key, config.value);

    expect(result).toThrow(IncorrectInputError);
  });
});
