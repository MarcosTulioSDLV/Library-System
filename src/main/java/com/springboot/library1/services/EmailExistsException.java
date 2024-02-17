package com.springboot.library1.services;

public class EmailExistsException extends RuntimeException{

    public EmailExistsException(){
    }

    public EmailExistsException(String message){
        super(message);
    }

}
