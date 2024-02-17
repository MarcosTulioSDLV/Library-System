package com.springboot.library1.dtos;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.ISBN;

import javax.validation.constraints.*;

@Getter @Setter @ToString @ApiModel(value = "BookDto",description = "Class to validate the Book attributes")
public class BookDto {

    //regex for ISBN-13: ^(978|979)-\d{1,5}-\d{1,7}-\d{1,6}-\d$
    @NotBlank @Pattern(regexp = "^(978|979)-\\d{1,5}-\\d{1,7}-\\d{1,6}-\\d$", message = "ISBN is not valid (use only ISBN-13)")
    @ApiModelProperty("Unique attribute (use only ISBN-13)")
    private String isbn;

    @NotBlank
    private String name;
    @NotBlank
    private String edition;
    @PositiveOrZero(message = "The year must be a non-negative number")
    @ApiModelProperty("Positive number")
    private Integer publicationYear;

}
