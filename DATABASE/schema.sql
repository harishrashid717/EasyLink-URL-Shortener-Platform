
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(200) NOT NULL UNIQUE,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL
);

CREATE TABLE short_url_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_url VARCHAR(2048) NOT NULL,
    short_code VARCHAR(300) NOT NULL UNIQUE,
    clicks INT NOT NULL DEFAULT 0,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE visited_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_id INT NOT NULL,
    visited_date DATE DEFAULT (CURDATE()),
    device ENUM('Desktop', 'Mobile', 'Tablet', 'E-Reader', 'Unknown') DEFAULT 'Unknown',

    FOREIGN KEY (url_id) REFERENCES short_url_table(id) ON DELETE CASCADE
);
