CREATE TABLE "person" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "eisenhower_item" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_important BOOLEAN NOT NULL,
    is_urgent BOOLEAN NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    user_id INTEGER NOT NULL REFERENCES "person" (id) ON DELETE CASCADE,
    priority_level INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN is_important AND is_urgent THEN 1
            WHEN is_important AND NOT is_urgent THEN 2
            WHEN NOT is_important AND is_urgent THEN 3
            ELSE 4
        END
    ) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline_at TIMESTAMP,
    completed_at TIMESTAMP,
    reminder_at TIMESTAMP
);
