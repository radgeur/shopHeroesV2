package apiRest.database.mapper;

import java.util.List;

import apiRest.database.classe.Category;

public interface CategoryMapper {
	
	public List<Category> selectAllCategories();
	public Category selectCategoryById(long id);
	
	public void insertCategory(String name);

}
