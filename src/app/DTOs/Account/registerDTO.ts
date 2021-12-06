export class RegisterDTO {
    constructor(
       public username: string,
       public mobile: string,
       public email: string,
       public password: string,
       public rePassword: string
    ) {}
}