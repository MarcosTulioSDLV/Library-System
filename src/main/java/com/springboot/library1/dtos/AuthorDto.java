package com.springboot.library1.dtos;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter @Setter @ToString @ApiModel(value = "AuthorDto",description = "Class to validate the Author attributes")
public class AuthorDto {

    @NotBlank
    private String name;
    @NotBlank
    private String lastName;
    @NotBlank @Email(message = "The email format is not valid") @ApiModelProperty("Unique attribute")
    private String email;

}
