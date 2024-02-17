package com.springboot.library1.services;

import com.springboot.library1.models.Author;
import com.springboot.library1.repositories.AuthorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger LOG= LoggerFactory.getLogger(AuthorService.class);


    public Page<Author> getAuthors(Pageable pageable) {
        Page<Author> authorsPage= authorRepository.findAll(pageable);
        return authorsPage;
    }

    public Author getAuthorById(Long id) {
        Author author= authorRepository.findById(id).orElseThrow(()-> new AuthorNotFoundException("Author with id "+id+" not found"));
        return author;
    }

    public Page<Author> getAuthorsByName(String name,Pageable pageable) {
        Page<Author> authorsPage= authorRepository.findByNameContainingIgnoreCase(name,pageable);
        return authorsPage;
    }

    @Transactional
    public Author addAuthor(Author author) {
        if(authorRepository.existsByEmail(author.getEmail())){
            throw new EmailExistsException("Email "+author.getEmail()+" already exists");
        }
        Author addedAuthor= authorRepository.save(author);
        LOG.info("---After add author---");
        return addedAuthor;
    }

    @Transactional
    public Author updateAuthor(Author author) {
        Author recoveredAuthor= authorRepository.findById(author.getId())
                .orElseThrow(()-> new AuthorNotFoundException("Author with id "+author.getId()+" not found"));

        if(emailBelongsToAnotherExistingInstance(author.getEmail(),recoveredAuthor.getEmail())){
            throw new EmailExistsException("Email "+author.getEmail()+" already exists");
        }

        BeanUtils.copyProperties(author,recoveredAuthor,"books");
        LOG.info("---After update---");
        return recoveredAuthor;
    }

    private boolean emailBelongsToAnotherExistingInstance(String email1,String email2) {
        return authorRepository.existsByEmail(email1) && !email1.equals(email2);
    }

    @Transactional
    public Author removeAuthor(Long id) {
        Author author= authorRepository.findById(id).orElseThrow(()-> new AuthorNotFoundException("Author with "+id+" not found"));

        author.getBooks().forEach((book)->entityManager.remove(book));
        LOG.info("---After remove books---");

        authorRepository.delete(author);
        LOG.info("---After remove author---");

        return author;
    }


}
