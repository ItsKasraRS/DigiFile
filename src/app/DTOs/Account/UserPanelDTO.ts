export class ChangePasswordDTO {
    constructor(
        public currentPassword: string,
        public newPassword: string
    ) {}
}