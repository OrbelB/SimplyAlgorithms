import { nanoid } from '@reduxjs/toolkit';
import 'react-tabs/style/react-tabs.css';
import './CodeSnippet.css';

export default function CodeSnippet({
  snippets,
  snippetIndex,
  setSnippetIndex,
}) {
  return (
    <div className="component">
      <h1>Implementations</h1>
      <div className="container">
        <nav className="bg-secondary rounded-top">
          {snippets.length > 0 && (
            <div
              key={() => nanoid()}
              className="nav navbar-code nav-pills"
              id="nav-tab"
              role="tablist"
            >
              {snippets[snippetIndex]?.languageTitle !== '' &&
                snippets.map(({ languageTitle }, index) => {
                  return (
                    <button
                      key={languageTitle}
                      className={`nav-link ${
                        snippetIndex === index ? 'active' : ''
                      } text-white`}
                      id={languageTitle}
                      onClick={() => {
                        setSnippetIndex(index);
                      }}
                      data-bs-toggle="tab"
                      data-bs-target="#nav-java"
                      type="button"
                      role="tab"
                      aria-controls="nav-java"
                      aria-selected="true"
                    >
                      {languageTitle}
                    </button>
                  );
                })}
            </div>
          )}
        </nav>
        <div
          className="tab-content description rounded-bottom"
          id="nav-tabContent"
        >
          {snippets[snippetIndex]?.codeText !== '' && (
            <div
              key={snippets[snippetIndex]?.codeText}
              className="tab-pane fade active show ws"
              id={snippets[snippetIndex]?.codeText}
              role="tabpanel"
              aria-labelledby="nav-java-tab"
            >
              <code className="code-style">
                {snippets[snippetIndex]?.codeText}
              </code>
            </div>
          )}
        </div>
      </div>
      <div className="bottom" />
    </div>
  );
}
