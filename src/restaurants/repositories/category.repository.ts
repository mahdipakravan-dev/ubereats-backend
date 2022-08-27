import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getOrCreateCategory(categoryName: string): Promise<Category> {
    categoryName = categoryName.trim().toLowerCase();
    const slug = categoryName.replace(/ /g, '-');
    let category = await this.findOne({ slug });
    if (!category) {
      category = await this.save(this.create({ name: categoryName, slug }));
    }
    return category;
  }
}
