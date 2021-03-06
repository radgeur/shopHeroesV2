package apiRest.database.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apiRest.MyBatisUtil;
import apiRest.database.classe.Category;
import apiRest.database.classe.Material;
import apiRest.database.classe.Recipe;
import apiRest.database.mapper.MaterialMapper;
import apiRest.database.mapper.RecipeMapper;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/recipe")
public class RecipeController {

	/////////////////////////////////////////////////////INSERT//////////////////////////////////////////////////////////////
	@RequestMapping(value = "/addRecipe", method = RequestMethod.POST)
	public void insert(@RequestBody Recipe recipe) {
		SqlSession session = MyBatisUtil.getSession();
		try {
			RecipeMapper recipeMapper = session.getMapper(RecipeMapper.class);
			recipeMapper.insertRecipe(recipe);
			session.commit();
			MaterialMapper materialMapper = session.getMapper(MaterialMapper.class);
			Map<String, Object> map = new HashMap<>();
			for(Material material: recipe.getMaterials()) {
				if(material.getQuantity() > 0) {
					map.put("recipe", recipe.getId());
					map.put("material", material.getId());
					map.put("quantity", material.getQuantity());
					materialMapper.insertMaterialQuantity(map);
					map.clear();
				}
			}
			session.commit();
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}
	
	/////////////////////////////////////////////////////GET//////////////////////////////////////////////////////////////
	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public List<Recipe> selectAll() {
		SqlSession session = MyBatisUtil.getSession();
		List<Recipe> result = null;
		try {
			RecipeMapper recipeMapper = session.getMapper(RecipeMapper.class);
			result = recipeMapper.selectAllRecipes();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;
	}
	
	@RequestMapping(value = "/getByCategory", method = RequestMethod.POST)
	public List<Recipe> selectByCategory(@RequestBody Category category) {
		SqlSession session = MyBatisUtil.getSession();
		List<Recipe> result = null;
		try {
			RecipeMapper recipeMapper = session.getMapper(RecipeMapper.class);
			result = recipeMapper.selectRecipesByIdCategory(category);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;
	}
	
	/////////////////////////////////////////////////////DELETE//////////////////////////////////////////////////////////////
	@RequestMapping(value = "/deleteRecipe", method = RequestMethod.DELETE)
	public void deleteRecipe(@RequestParam long idRecipe) {
		SqlSession session = MyBatisUtil.getSession();
		try {
			RecipeMapper recipeMapper = session.getMapper(RecipeMapper.class);
			recipeMapper.deleteMaterialRecipe(idRecipe);
			recipeMapper.deleteRecipe(idRecipe);
			session.commit();
		} catch (Exception e) {
			e.printStackTrace();
			session.rollback();
		} finally {
			session.close();
		}
	}
}
