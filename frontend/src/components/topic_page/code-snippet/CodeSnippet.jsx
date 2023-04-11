import { nanoid } from '@reduxjs/toolkit';
import 'react-tabs/style/react-tabs.css';
import './CodeSnippet.css';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  backgroundColor: '#f5f5f5',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
});

const CodeBlock = styled(Box)({
  backgroundColor: '#e9e9e9',
  borderRadius: '4px',
  padding: '8px',
  marginBottom: '16px',
});

const Comment = styled(Typography)({
  color: '#6a9955',
  fontStyle: 'italic',
  marginBottom: '0px',
  paddingBottom: '0px',
});

export default function CodeSnippet({
  snippets,
  snippetIndex,
  setSnippetIndex,
}) {
  return (
    <div className="component ">
      <h1>Implementations</h1>
      <Container>
        <Tabs
          value={snippetIndex}
          onChange={(_, value) => {
            setSnippetIndex(value);
          }}
        >
          {snippets.map((codeBlock, index) => (
            <Tab
              key={nanoid()}
              label={codeBlock?.languageTitle}
              value={index}
            />
          ))}
        </Tabs>
        <CodeBlock variant="div">
          <Typography
            component="pre"
            variant="body2"
            whiteSpace="pre-wrap"
            sx={{ overflowX: 'auto' }}
          >
            {snippets[snippetIndex]?.codeText.split('\n').map((line) => {
              const trimmedLine = line?.trim();
              if (
                trimmedLine.startsWith('#') ||
                trimmedLine.startsWith('//') ||
                trimmedLine.startsWith('/*')
              ) {
                return <Comment key={nanoid()}>{line}</Comment>;
              }
              if (trimmedLine === '') return <br key={nanoid()} />;
              return (
                <Typography key={nanoid()} variant="body1">
                  {line}
                </Typography>
              );
            })}
          </Typography>
        </CodeBlock>
      </Container>
      {/* <div className="container">
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
      </div> */}
      <div className="bottom" />
    </div>
  );
}
