package com.springboot.library1.repositories;

import com.springboot.library1.models.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author,Long> {

    Page<Author> findByNameContainingIgnoreCase(String name, Pageable pageable);

    boolean existsByEmail(String email);

}
