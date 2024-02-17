 -- Create table for authors
  CREATE TABLE IF NOT EXISTS tb_author (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE
  );

  -- Crate table for books
  CREATE TABLE IF NOT EXISTS tb_book (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      isbn VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      edition VARCHAR(255) NOT NULL,
      publication_year INT NOT NULL,
      id_author BIGINT,
      FOREIGN KEY (id_author) REFERENCES tb_author(id)
  );
