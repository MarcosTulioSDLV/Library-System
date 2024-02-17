package com.springboot.library1.services;

public class AuthorNotFoundException extends RuntimeException{

    public AuthorNotFoundException(){
    }

    public AuthorNotFoundException(String message){
        super(message);
    }

}
