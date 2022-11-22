export class FilterProductDTO{
    constructor(
        public title:string,
        public products: [],
        public pageId:number,
        public pageCount: number,
        public startPage: number,
        public endPage:number,
        public takeEntity: number,
        public skipEntity: number,
        public activePage: number,
        public categories: number[],
        public SortBy?: ProductSortBy
    ){
        this.SortBy = ProductSortBy.NotSelected
    }
}

export enum ProductSortBy {
    NotSelected,
    PriceAsc,
    PriceDesc,
    Latest,
    Popular,
}