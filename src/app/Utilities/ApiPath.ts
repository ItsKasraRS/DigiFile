import { environment } from './../../environments/environment';

export const DomainName = environment.production ? 'http://brain-lab.ir/' : 'https://localhost:44308/api/';