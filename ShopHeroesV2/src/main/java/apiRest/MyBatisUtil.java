package apiRest;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.log4j.Logger;
import org.apache.tomcat.util.http.fileupload.IOUtils;

public class MyBatisUtil {
	
	private static final Logger logger = Logger.getLogger(MyBatisUtil.class);
	private static final String resource = "mybatis-config.xml";
	private static SqlSessionFactory sqlSessionFactory;
	 
	static{
		Reader reader=null;
		try{
			reader = Resources.getResourceAsReader(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
		} catch (IOException e) {
			logger.error(e);
		}finally{
			IOUtils.closeQuietly(reader);
		}
	}
	 
	public static SqlSession getSession() {
		return sqlSessionFactory.openSession();
	}

}
