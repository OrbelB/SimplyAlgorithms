package com.simplyalgos.backend.tag;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("tags")
@RestController
public class TagController {

    private final TagService tagService;

    @GetMapping("/list")
    public ResponseEntity<?> listTags(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                      @RequestParam(name = "size", defaultValue = "5") Integer size) {
        return ResponseEntity.ok(tagService.listTags(PageRequest.of(page, size)));
    }
}
