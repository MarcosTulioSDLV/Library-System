package com.springboot.library1.controllers;

import com.springboot.library1.dtos.AuthorDto;
import com.springboot.library1.services.*;
import com.springboot.library1.models.Author;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping(value = "/api")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    private static final Logger LOG= LoggerFactory.getLogger(AuthorController.class);


    @GetMapping(value = "/authors")
    @ApiOperation("Find All Authors")
    public ResponseEntity<Page<Author>> getAuthors(@PageableDefault(size = 3) Pageable pageable){
        Page<Author> authorsPage= authorService.getAuthors(pageable);
        return new ResponseEntity<>(authorsPage,HttpStatus.OK);
    }


    @GetMapping(value = "/authors/{id}")
    @ApiOperation("Find an Author by Id")
    public ResponseEntity<Object> getAuthorById(@ApiParam("Primary key of type Long") @PathVariable Long id){
        try {
            Author author= authorService.getAuthorById(id);
            return new ResponseEntity<>(author,HttpStatus.OK);
        }catch (AuthorNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping(value = "/authors-by-name/{name}")
    @ApiOperation("Find Authors by Name")
    public ResponseEntity<Page<Author>> getAuthorsByName(@PathVariable String name,
                                                                   @PageableDefault(size = 3) Pageable pageable){
        Page<Author> authorsPage= authorService.getAuthorsByName(name,pageable);
        return new ResponseEntity<>(authorsPage,HttpStatus.OK);
    }


    @PostMapping(value = "/authors")
    @ApiOperation("Add an Author")
    public ResponseEntity<Object> addAuthor(@RequestBody @Valid AuthorDto authorDto){
        Author author= new Author();
        BeanUtils.copyProperties(authorDto,author);
        try {
            Author addedAuthor= authorService.addAuthor(author);
            return new ResponseEntity<>(addedAuthor,HttpStatus.CREATED);
        }catch (EmailExistsException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);//"Email already exists"
        }
    }



    @PutMapping(value = "/authors/{id}")
    @ApiOperation("Update an Author")
    public ResponseEntity<Object> updateAuthor(@ApiParam("Primary key of type Long") @PathVariable Long id,
                                               @RequestBody @Valid AuthorDto authorDto){
        Author author= new Author();
        BeanUtils.copyProperties(authorDto,author);
        author.setId(id);
        try {
            Author updatedAuthor= authorService.updateAuthor(author);
            return new ResponseEntity<>(updatedAuthor,HttpStatus.OK);
        }catch (AuthorNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }catch (EmailExistsException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }


    @DeleteMapping(value = "/authors/{id}")
    @ApiOperation("Remove an Author")
    public ResponseEntity<Object> removeAuthor(@ApiParam("Primary key of type Long") @PathVariable Long id){
        try {
            Author removedAuthor = authorService.removeAuthor(id);
            return new ResponseEntity<>(removedAuthor, HttpStatus.OK);
        }catch (AuthorNotFoundException e){
            return new ResponseEntity<>("Author with id not found",HttpStatus.NOT_FOUND);
        }
    }


}
