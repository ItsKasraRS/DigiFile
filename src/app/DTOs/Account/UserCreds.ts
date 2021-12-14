export class UserCreds {
    constructor (
        public status: string,
        public data: UserData
    ) {}
}

export class UserData {
    constructor(
        public id: number,
        public username: string,
        public email: string
    ) {}
}