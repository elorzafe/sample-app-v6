import logo from './logo.svg';
import './App.css';
import { Amplify } from 'aws-amplify';
import { signInWithRedirect } from 'aws-amplify/auth';
// import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Todo } from './models';
import { DataStore } from 'aws-amplify/datastore';
import { generateClient } from 'aws-amplify/api';
// import { createTodo } from './graphql/mutations';
// import { onCreateTodo } from './graphql/subscriptions';
// import { ConsoleLogger } from '@aws-amplify/core/internals/utils'

// ConsoleLogger.LOG_LEVEL = 'DEBUG';
// DataStore.configure({
//   // maxRecordsToSync: 100000,
//   // errorHandler: (_error: any) => {}
// });
Amplify.configure(awsconfig);
// DataStore.configure({});
// Amplify.configure(awsconfig);
const client = generateClient();

function App() {
  async function invokeAPI() {
    const result = await DataStore.query(Todo);

    console.log(JSON.stringify(result, null, 2))
  }

  function subscribe() {
    // client.graphql({
    //   query: onCreateTodo
    // }).subscribe(data => {
    //   console.log("got data", JSON.stringify(data, null, 2))
    // })
  }

  function createTodoFunc() {
    DataStore.save(new Todo({ name: 'test1', description: 'this is a description'}));
    // client.graphql({
    //   query: createTodo,
    //   variables: {
    //     "input": { "name": "test1", "description": "this is a description" }
    //   }
    // })
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => { signInWithRedirect()}}>Sign In</button>
        <button onClick={invokeAPI}>Invoke API</button>
        <button onClick={createTodoFunc}>Create Todo</button>
        <button onClick={subscribe}>Subscribe</button>
      </header>
    </div>
  );
}

export default App;
