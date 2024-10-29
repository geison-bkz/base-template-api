import { HashService } from '../../../../src/infrastructure/third-party/HashService';

describe('HashService', () => {
  let hashServiceMock: jest.Mocked<HashService>;

  beforeEach(() => {
    const saltRounds = 10;
    hashServiceMock = new HashService(saltRounds) as jest.Mocked<HashService>;
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
