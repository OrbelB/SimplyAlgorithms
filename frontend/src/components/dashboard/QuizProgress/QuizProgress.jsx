import './QuizProgress.css';

export default function QuizProgress() {
  return (
    <div className="something">
      <h5 className="text-left">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem.
      </h5>
      <div className="text-center m-2">
        <button type="button" className="btn btn-secondary" disabled>
          Load More
        </button>
      </div>
    </div>
  );
}
