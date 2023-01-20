import './CommentsPreview.css';

const commentPreviews = [
  {
    id: 1,
    category: 'Splay Tree',
    comment:
      'Nulla mauris elit, iaculis sit amet imperdiet dapibus, interdum sit amet mauris.',
  },
  {
    id: 2,
    category: 'Splay Tree',
    comment:
      'Phasellus ut varius nisl. Phasellus vulputate neque sed neque consectetur, non aliquam risus condimentum.',
  },
  {
    id: 3,
    category: 'Splay Tree',
    comment:
      ' Etiam eros lorem, commodo pulvinar tincidunt a, ullamcorper sit amet neque.',
  },
];

export default function CommentsPreview() {
  return (
    <div>
      {commentPreviews.map(({ id, category, comment }) => {
        return (
          <>
            <div key={id} className="preview-sect m-2">
              <div className="first-line">
                <h4 className="preview-category">{category}</h4>
              </div>
              <p className="preview-comment">{comment}</p>
            </div>
            <br />
          </>
        );
      })}
    </div>
  );
}
