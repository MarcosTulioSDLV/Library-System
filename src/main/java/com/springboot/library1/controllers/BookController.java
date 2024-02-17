package com.springboot.library1.controllers;

import com.springboot.library1.dtos.BookDto;
import com.springboot.library1.models.Author;
import com.springboot.library1.models.Book;
import com.springboot.library1.services.*;
import com.sun.istack.NotNull;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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
public class BookController {

    @Autowired
    private BookService bookService;


    @GetMapping(value="/books")
    @ApiOperation("Find All Books")
    public ResponseEntity<Page<Book>> getBooks(@PageableDefault(size = 3) Pageable pageable){
        Page<Book> booksPage= bookService.getBooks(pageable);
        return new ResponseEntity<>(booksPage,HttpStatus.OK);
    }


    @GetMapping(value = "/books/{id}")
    @ApiOperation("Find a Book By Id")
    public ResponseEntity<Object> getBookById(@ApiParam("Primary key of type Long") @PathVariable Long id){
        try {
            Book book= bookService.getBookById(id);
            return new ResponseEntity<>(book,HttpStatus.OK);
        }catch (BookNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping(value = "/books-by-name/{name}")
    @ApiOperation("Find Books By Name")
    public ResponseEntity<Page<Book>> getBooksByName(@PathVariable String name,
                                                     @PageableDefault(size = 3) Pageable pageable){
        Page<Book> booksPage= bookService.getBooksByName(name,pageable);
        return new ResponseEntity<>(booksPage,HttpStatus.OK);
    }


    @GetMapping(value = "/books-by-author-id/{authorId}")
    @ApiOperation("Find Books By Author Id")
    public ResponseEntity<Object> getBooksByAuthorId(@ApiParam("Foreign key of type Long") @PathVariable Long authorId,
                                                     @PageableDefault(size = 3) Pageable pageable){
        try {
            Page<Book> books= bookService.getBooksByAuthorId(authorId,pageable);
            return new ResponseEntity<>(books,HttpStatus.OK);
        }catch (AuthorNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping(value = "/books/{authorId}")
    @ApiOperation("Add a Book")
    public ResponseEntity<Object> addBook(@ApiParam("Foreign key of type Long") @PathVariable Long authorId,
                                          @RequestBody @Valid BookDto bookDto){
        Book book= new Book();
        BeanUtils.copyProperties(bookDto,book);
        try {
            Book addedBook= bookService.addBook(authorId,book);
            return new ResponseEntity<>(addedBook,HttpStatus.CREATED);
        }catch (IsbnExistsException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }catch (AuthorNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/books/{id}")
    @ApiOperation("Update a Book")
    public ResponseEntity<Object> updateBook(@ApiParam("Primary key of type Long") @PathVariable Long id,
                                             @RequestBody @Valid BookDto bookDto){
        Book book= new Book();
        BeanUtils.copyProperties(bookDto,book);
        book.setId(id);
        try {
            Book updatedBook= bookService.updateBook(book);
            return new ResponseEntity<>(updatedBook,HttpStatus.OK);
        }catch (BookNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }catch (IsbnExistsException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping(value = "/books/{id}")
    @ApiOperation("Remove a Book")
    public ResponseEntity<Object> removeBook(@ApiParam("Primary key of type Long") @PathVariable Long id){
        try {
            Book book= bookService.removeBook(id);
            return new ResponseEntity<>(book,HttpStatus.OK);
        }catch (BookNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

}
