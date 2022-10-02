export class ShowCategoriesDTO {
    constructor(
        public categoryId: number,
        public parentId: number,
        public title: string,
    ){}
}