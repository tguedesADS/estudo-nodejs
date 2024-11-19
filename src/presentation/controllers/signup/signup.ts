import { HttpResponse, HttpRequest, Controller, EmailValidator, AddAccount } from './signup-protocols';
import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest, serverError, successRequest } from '../../helpers/http-helper';

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator;
    private addAccount: AddAccount;
    
    constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator;
        this.addAccount = addAccount;
    }

    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredField = ['name', 'email', 'password', 'passwordConfirmation'];
            for(const field of requiredField) {
                if(!httpRequest.body[field]) {
                    return badRequest (new MissingParamError (field));
                }
            }
            const { name, email, password, passwordConfirmation } = httpRequest.body;
            if(password !== passwordConfirmation){
                return badRequest(new InvalidParamError('passwordConfirmation'));
            }
            const isValid = this.emailValidator.isValid(email);
            if(!isValid) {
                return badRequest(new InvalidParamError('email'));
            }
            const account = this.addAccount.add({
                name,
                email,
                password
            });
            return successRequest(account);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch(error) {
            return serverError();
        }
    }
}
