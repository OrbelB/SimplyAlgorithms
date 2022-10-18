export default function OptionMenu({
                                       handleDeleteMessage, handleIsEditCommentOpen, handleCancelComment = () => {}, canReply = true
                                   }) {

    const onDeleteMessage = () => {
        handleDeleteMessage();
    }

    const onEditMessage = () => {
        handleIsEditCommentOpen();
    }

    const onReplyMessage = () => {
        handleCancelComment();
    }
    return (
        <div className="btn-group dropup-center">
            <i role={"button"} className={"dropdown-toggle-split bi bi-three-dots-vertical"}
               data-bs-toggle="dropdown" aria-expanded="false"></i>
            <div className="dropdown-menu">
                <i role={"button"} className={"dropdown-item bi bi-trash text-danger"}
                   onClick={onDeleteMessage}> Delete
                </i>
                <i className={"dropdown-item bi bi-pencil-fill"}
                   onClick={onEditMessage} role={"button"}> Edit
                </i>
                {canReply && <i role={"button"}
                    className={"dropdown-item bi bi-arrow-return-left text-info"}
                    onClick={onReplyMessage}
                > Reply
                </i>
                }
            </div>
        </div>
    )
}