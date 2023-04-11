import { memo } from 'react';

function ReferenceForm({
  index,
  handleReferenceChange,
  removeReferences,
  reference,
}) {
  return (
    <div className="mb-4">
      <div className="row mb-4">
        <input
          className="label-topic"
          name="title"
          placeholder="Title"
          value={reference?.title}
          onChange={(e) => handleReferenceChange(index, e)}
        />
      </div>
      <div className="row mb-4">
        <input
          className=" label-topic"
          name="externalResourceLink"
          placeholder="Link"
          value={reference?.externalResourceLink}
          onChange={(e) => handleReferenceChange(index, e)}
        />
      </div>
      <div className="row justify-content-center">
        <button
          type="button"
          className="form-button w-auto p-1"
          onClick={() => removeReferences(index)}
        >
          REMOVE REFERENCE
        </button>
      </div>
    </div>
  );
}

export default memo(ReferenceForm);
