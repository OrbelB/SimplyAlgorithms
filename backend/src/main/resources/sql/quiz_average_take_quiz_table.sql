use simplyalgos;
CREATE TABLE take_quiz_average(
	avg_take_quiz_id VARCHAR(36) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
	quiz_id	 VARCHAR(36) NOT NULL,
	user_id	 VARCHAR(36) NOT NULL,
	average_score DECIMAL NOT NULL, 
	lowest_score DECIMAL NOT NULL,
	highest_score DECIMAL NOT NULL,
	best_time DECIMAL NOT NULL,
	worst_time DECIMAL NOT NULL,    
	avgrage_time DECIMAL NOT NULL,
	attempts INT NOT NULL DEFAULT 0,
    PRIMARY KEY (avg_take_quiz_id),
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
