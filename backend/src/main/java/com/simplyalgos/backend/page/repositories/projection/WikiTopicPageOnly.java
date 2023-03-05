package com.simplyalgos.backend.page.repositories.projection;

import org.springframework.beans.factory.annotation.Value;

public interface WikiTopicPageOnly {
    @Value("#{target.topicPage}")
    TopicNameAndIDOnly getTopicPage();


}
