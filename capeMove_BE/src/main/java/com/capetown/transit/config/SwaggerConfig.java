package com.capetown.transit.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI transitOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Cape Town Transit Companion API")
                        .description("API documentation for the Cape Town Transit Companion application")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Cape Town Transit Team")
                                .email("support@capetowntransit.com")
                                .url("https://capetowntransit.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("transit-public")
                .packagesToScan("com.capetown.transit.controller")
                .build();
    }
}
