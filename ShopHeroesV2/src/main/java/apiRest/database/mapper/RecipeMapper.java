package apiRest.database.mapper;

import java.util.List;

import apiRest.database.classe.Category;
import apiRest.database.classe.Recipe;

public interface RecipeMapper {

	public void insertRecipe(Recipe recipe);
	
	public List<Recipe> selectAllRecipes();
	public List<Recipe> selectRecipesByIdCategory(Category category);
	
	public void deleteRecipe(long idRecipe);
	public void deleteMaterialRecipe(long idRecipe);
	
}
