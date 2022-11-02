import React from 'react'
import {RiQuestionnaireFill} from 'react-icons/ri'


export default function Post(){

    return (
    <>
    {/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-outline-secondary btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  <div>
    Ask A Question
    <RiQuestionnaireFill/>
  </div>
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="staticBackdropLabel">My Forum Post</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-0">
            <label for="quetion_title" class="col-form-label">Title:</label>
            <input type="text" class="form-control" id="forum_post_title"/>
        </div>
        <div class="mb-0">
            <label for="quetion_categories" class="col-form-label">Category:</label>
            <input type="text" class="form-control" id="forum_post_title"/>
        </div>
        <div class="mb-3">
            <label for="question_text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="forum_post_question"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Post</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
