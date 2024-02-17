package com.springboot.library1.services;

public class BookNotFoundException extends RuntimeException{

    public BookNotFoundException(){
    }

    public BookNotFoundException(String message){
        super(message);
    }

}
