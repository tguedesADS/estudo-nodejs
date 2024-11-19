import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

interface SutTypes {
    sut: DbAddAccount,
    encrypterStub: Encrypter
}

const makeEncrypter = ():Encrypter => {
    class EncrypterStub implements Encrypter {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'));
        }
    }
    return new EncrypterStub;
};

const makeSut = (): SutTypes => {
    const encrypterStub = makeEncrypter();
    const sut = new DbAddAccount(encrypterStub);
    return{
        sut,
        encrypterStub
    };
};

describe('DbAddAccount Usecase', () => {
    test('Should call Encrypter with correct password', async () => {
        const { sut, encrypterStub } = makeSut();
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
        const accountData = {
            name: 'valid_password',
            email: 'valid_password',
            password: 'valid_password' 
        };
        await sut.add(accountData);
        expect(encryptSpy).toHaveBeenLastCalledWith('valid_password');
    });
});
