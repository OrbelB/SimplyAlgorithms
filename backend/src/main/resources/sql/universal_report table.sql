-- use simplyalgos;

CREATE TABLE universal_report(
report_id VARCHAR(36) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
forign_id VARCHAR(36) NOT NULL, -- the id of the item that was reported
type_of_id VARCHAR(256) NOT NULL, -- to define what table the forign id belongs too.
culprit_user_id VARCHAR(36) DEFAULT NULL, -- the owner of the thing that was reported
victim_user_id VARCHAR(36) NOT NULL,
catagory VARCHAR(256) NOT NULL,	-- the type of report bug, hurmfull content, incorrect info, offensive language, etc. auto_increment
report VARCHAR(512) NOT NULL, -- the description
report_date TIMESTAMP NOT NULL DEFAULT now(),
resolve_date TIMESTAMP DEFAULT NULL,
resolved VARCHAR(12) NOT NULL DEFAULT("NO"), -- a flag to set if this report was resolved or not (NO, IN PROGRESS, YES)
resolved_by_user_Id VARCHAR(36) DEFAULT NULL, -- which admin was this solved by?
resolved_notes VARCHAR(512),
PRIMARY KEY(report_id),
FOREIGN KEY (culprit_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
FOREIGN KEY (victim_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
FOREIGN KEY (resolved_by_user_Id) REFERENCES users(user_id) ON DELETE CASCADE
);