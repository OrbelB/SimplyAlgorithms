-- USE simplyalgos;

CREATE TABLE simplyalgos.chatty_settings (
	chatty_id VARCHAR(36) NOT NULL,
    chatty_desc VARCHAR(512) NOT NULL,
	max_input_token INT NOT NULL DEFAULT 400,
    max_output_token INT NOT NULL DEFAULT 400,
    delay_setting INT NOT NULL DEFAULT 4,
    remaining_delays INT NOT NULL,
    max_replies INT NOT NULL DEFAULT 10,
    profile_enabled TINYINT NOT NULL DEFAULT 0,
    model VARCHAR(128) NOT NULL,
    temperature DOUBLE NOT NULL DEFAULT .70,
    api_url VARCHAR(256) NOT NULL,
    PRIMARY KEY (chatty_id)
    );

INSERT INTO simplyalgos.chatty_settings (chatty_id, chatty_desc, max_input_token, max_output_token, delay_setting, remaining_delays, max_replies, profile_enabled, model, temperature, api_url)
VALUES ('chatty001', 'A chatbot for customer service', 500, 500, 2, 10, 20, 1, 'gpt-3.5-turbo', 0.7, 'https://api.openai.com/v1/chat/completions');
