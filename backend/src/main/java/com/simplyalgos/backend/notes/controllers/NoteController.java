package com.simplyalgos.backend.notes.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@CrossOrigin(methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("note")
@Slf4j
@RestController
public class NoteController {

    //for each tab

    //get personal notes
    //get shared notes
    //get public notes


    //Create note
    //update note --> updates the json & other necessary items. Dont user this to make notes public / private
    //delete note --> delete the specified note



    //share Note
    //unshare Note
    //update shared Note --> called when the shared note is updated by the receiver
    //update permission --> toggle if user can edit the notebook or not
    //update share length


    //update public note description
    //Publish Note to user base
    //private public note

//    will notify user of the action
//    admin make note private
//    admin delete public note
}
