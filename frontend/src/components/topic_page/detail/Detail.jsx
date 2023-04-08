import parse from 'html-react-parser';
import { nanoid } from '@reduxjs/toolkit';
import draftToHtml from 'draftjs-to-html';
import './Detail.css';

export default function Detail({ pageDescription, references }) {
  const description = parse(draftToHtml(pageDescription));
  return (
    <>
      <div className="detail container-fluid g-0 text-center">
        <div className="row" style={{ wordWrap: 'break-word' }}>
          {description}
        </div>
      </div>
      <div className="container-fluid background text-center">
        <div className="row">
          <div className="col-12 col-md-12 border-4 border-bottom">
            <h3 className="text-center mt-4 mb-4 p-0 reference-heading">
              FUTURE REFERENCES
            </h3>
          </div>
          <div className="col-12 table-responsive">
            <table className="table table-borderless">
              <tbody>
                {references?.map((reference, index) => {
                  return (
                    <tr key={() => nanoid()} className="border-bottom">
                      <td className="p-0 m-0">{index + 1}</td>
                      <td className="py-3 text-start">
                        <a
                          href={reference.externalResourceLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {reference.title}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
