-- use simplyalgos;
CREATE TABLE user_notes (
note_id VARCHAR(36) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
user_id VARCHAR(36) NOT NULL,
created_date TIMESTAMP NOT NULL DEFAULT now(), 
last_updated TIMESTAMP DEFAULT NULL,
note_title VARCHAR(48) NOT NULL DEFAULT 'defaut note',
is_public TINYINT NOT NULL DEFAULT 0,
note_body	JSON NOT NULL,
PRIMARY KEY (note_id),
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- share notes between students
-- permissions ALL
CREATE TABLE note_share (
share_id VARCHAR(36) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
note_id VARCHAR(36) NOT NULL,
user_id VARCHAR(36) NOT NULL,
share_date TIMESTAMP NOT NULL DEFAULT now(),
share_length TIMESTAMP DEFAULT NULL, -- expire date or set null to mean inf
can_edit TINYINT NOT NULL DEFAULT 0, -- 0 cannot edit, 1 can edit`
PRIMARY KEY (share_id),
FOREIGN KEY (note_id) REFERENCES user_notes(note_id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- if is_public is true then create a public_notes entry
-- share to all of userbase
-- permission Teachers & admins 
CREATE TABLE public_notes(
public_share_id VARCHAR(36) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
note_id VARCHAR(36) NOT NULL,
share_description VARCHAR(256) DEFAULT 'one for all notes',
shared_date TIMESTAMP,
PRIMARY KEY (public_share_id),
FOREIGN KEY (note_id) REFERENCES user_notes(note_id) ON DELETE CASCADE
);