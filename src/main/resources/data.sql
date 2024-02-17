
-- Add authors
  INSERT INTO tb_author (name, last_name, email) VALUES
    ('Gabriel', 'Garcia Marquez', 'e1@gmail.com'),
    ('Dante', 'Alighieri', 'e2@gmail.com'),
    ('Stephen', 'King', 'e3@gmail.com');

  -- Add books
  INSERT INTO tb_book (isbn, name, edition, publication_year, id_author) VALUES
    ('978-0-13-235088-4', 'El coronel no tiene quien le escriba', '1', 1961, 1),
    ('978-0-306-40615-7', 'Cronica de una muerte anunciada', '1', 1981, 1),
    ('978-0-672-31614-8', 'La divina comedia', '1', 1472, 2),
    ('978-0-13-609181-6', 'El resplandor', '2', 1977, 3);
