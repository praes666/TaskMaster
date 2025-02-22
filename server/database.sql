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
    person_id INTEGER NOT NULL REFERENCES "person" (id) ON DELETE CASCADE,
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

CREATE TABLE kanban_board (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INTEGER NOT NULL REFERENCES person(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kanban_state (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    color VARCHAR(6) NOT NULL,  -- HEX-код цвета (например, #FF5733)
    kanban_id INTEGER NOT NULL REFERENCES kanban_board(id) ON DELETE CASCADE,
    author_id INTEGER NOT NULL REFERENCES person(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kanban_task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    kanban_id INTEGER NOT NULL REFERENCES kanban_board(id) ON DELETE CASCADE,
    state_id INTEGER NOT NULL REFERENCES kanban_state(id) ON DELETE SET NULL,
    author_id INTEGER NOT NULL REFERENCES person(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TABLE kanban_person_admission (
    id SERIAL PRIMARY KEY,
    kanban_id INTEGER NOT NULL REFERENCES kanban_board(id) ON DELETE CASCADE,
    grantee_id INTEGER NOT NULL REFERENCES person(id) ON DELETE CASCADE,
    trustee_id INTEGER NOT NULL REFERENCES person(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


