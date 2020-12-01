CREATE TABLE items (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    info json NOT NULL,
    success boolean NOT NULL DEFAULT false
)