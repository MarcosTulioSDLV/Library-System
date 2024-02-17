package com.springboot.library1.services;

public class IsbnExistsException extends RuntimeException{

    public IsbnExistsException(){
    }

    public IsbnExistsException(String message){
        super(message);
    }

}
