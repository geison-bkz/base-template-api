import { BcryptHashService } from '../../../../src/infrastructure/third-party/BcryptHashService';

describe('HashService', () => {
  let hashServiceMock: jest.Mocked<BcryptHashService>;

  beforeEach(() => {
    const saltRounds = 10;
    hashServiceMock = new BcryptHashService(saltRounds) as jest.Mocked<BcryptHashService>;
  });

  it('deve gerar um hash da senha', async () => {
    const password = 'minhaSenhaSegura';
    const hashedPassword = await hashServiceMock.hashPassword(password);

    expect(hashedPassword).not.toEqual(password);
    expect(hashedPassword.length).toBeGreaterThan(0);
  });

  it('deve retornar verdadeiro ao comparar senha correta com o hash', async () => {
    const password = 'minhaSenhaSegura';
    const hashedPassword = await hashServiceMock.hashPassword(password);

    const isMatch = await hashServiceMock.comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it('deve retornar falso ao comparar senha incorreta com o hash', async () => {
    const password = 'minhaSenhaSegura';
    const hashedPassword = await hashServiceMock.hashPassword(password);

    const isMatch = await hashServiceMock.comparePassword('senhaIncorreta', hashedPassword);
    expect(isMatch).toBe(false);
  });
});
