import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';
import { ShowCategoriesDTO } from '../DTOs/Product/categoriesDTO';

@Pipe({ name: 'categoriesFilter' })
export class CategoriesFilter implements PipeTransform {
  transform(items: ShowCategoriesDTO[], id: number | any): ShowCategoriesDTO[] {
    
    return items?.filter(it=>it.parentId === id);
  }
}