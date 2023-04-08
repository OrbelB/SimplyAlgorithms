import parse from 'html-react-parser';
import { nanoid } from '@reduxjs/toolkit';
import draftToHtml from 'draftjs-to-html';
import './Detail.css';

export default function Detail({ pageDescription, references }) {
  const description = parse(draftToHtml(pageDescription));
  return (
    <div className="detail text-center">
      <div className="top p-5">{description}</div>
      <div className="row justify-content-around background mt-auto mt-sm-5   p-2">
        <div className="col-auto col-sm-auto align-self-center">
          <h3 className="m-3 mb-4">FUTURE REFERENCES</h3>
          {references.map((user) => {
            return (
              <div key={nanoid()} className="user-card">
                <h4>
                  <a
                    href={user.externalResourceLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.title}
                  </a>
                </h4>
              </div>
            );
          })}
        </div>
        {/* <div className="col-auto  text-center vid">
            <iframe
              className="rounded-4 "
              width="auto"
              height="auto"
              src="https://www.youtube.com/embed/ovWqEgYYAEQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div> */}
      </div>
    </div>
  );
}
