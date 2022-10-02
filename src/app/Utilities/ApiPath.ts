import { environment } from './../../environments/environment';

export const SimpleDomainName = environment.production ? 'http://digifile.com/' : 'https://localhost:44308/';
export const DomainName = environment.production ? 'http://digifile.com/' : 'https://localhost:44308/api/';
export const ProductImages = environment.production ? 'http://digifile.com/product/thumbnail/' : 'https://localhost:44308/product/thumbnail/'