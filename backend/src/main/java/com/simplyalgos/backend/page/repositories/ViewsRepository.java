package com.simplyalgos.backend.page.repositories;


import com.simplyalgos.backend.page.domains.Views;
import com.simplyalgos.backend.page.domains.ViewsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Set;
import java.util.UUID;

public interface ViewsRepository extends JpaRepository<Views, ViewsId> {

    Set<Views> findAllByUserReferenceView_UserIdOrderByVisitedDateAsc(UUID viewsId_userId);


    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO views (page_id, user_id) values(:page_id, :user_id)")
    void addUserView(@Param("page_id") String pageId, @Param("user_id") String userId);
}
