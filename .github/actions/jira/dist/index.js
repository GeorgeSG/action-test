const github = require('@actions/github');
const core = require('@actions/core');

const Action = require('./action');

const ALLOWED_PROJECT_KEYS = ['COL'];

async function exec() {
  try {
    const message = github.event.head_commit.message;
    console.log('received message', message);

    const expectedKey = message.split('_'[0]);
    if (!ALLOWED_PROJECT_KEYS.includes(expecte)) {
      core.setFailed(`Key: ${expectedKey} unrecognized or unsupported`);
      return;
    }

    const action = await new Action(
      {
        projectKey: expectedKey,
        summary: github.event.head_commit.message,
        description: github.event.head_commit.description,
        ...parseArgs(),
      },
      {
        baseUrl: 'testurl',
        token: 'myfaketoken',
      }
    );


    action.execute();

    core.setOutput('response', 'this is a response')

    // const time = new Date().toTimeString();
    // core.setOutput('time', time);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

function parseArgs() {
  return {
    issueType: core.getInput('issuetype'),
  };
}

exec();
