
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_email character varying(255) NOT NULL UNIQUE,
    user_password character varying(255) NOT NULL,
    user_first_name character varying(255) NOT NULL,
    user_last_name character varying(255) NOT NULL,
    user_role character varying(255) NOT NULL,
    user_org int NOT NULL,
    approved boolean NOT NULL
);

CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    org_name character varying(255) NOT NULL UNIQUE,
    org_product character varying(255) NOT NULL,
    org_email character varying(255) NOT NULL UNIQUE,
    approved boolean NOT NULL
);

INSERT INTO users (user_email, user_password, user_first_name, user_last_name, user_role, user_org, approved) VALUES 
('shilo050@gmail.com', 'Su112233', 'super', 'user', 'admin', 0, 'true');