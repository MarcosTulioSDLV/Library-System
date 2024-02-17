package com.springboot.library1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

/**
 * http://localhost:8080/swagger-ui/
 */

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.springboot.library1.controllers"))
                .paths(PathSelectors.any())
                .build();
    }

    public ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("Library System Rest API")
                .description("Rest API to manage authors and their books in a library, providing CRUD (Create, Read, Update and Delete) operations.")
                .version("1.0")
                .contact(new Contact("Marcos Soto","https://ar.linkedin.com/in/marcos-tulio-soto-de-la-vega-8a6b9668","mtsotodelavega@gmail.com"))
                .license("GNU General Public License")
                .licenseUrl("https://www.gnu.org/licenses/gpl-3.0.html")
                .build();
    }

}
