package com.springboot.library1.repositories;

import com.springboot.library1.models.Author;
import com.springboot.library1.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {

    Page<Book> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Book> findByAuthor(Author author, Pageable pageable);

    boolean existsByIsbn(String isbn);

}
