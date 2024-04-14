import { gql, useQuery } from '@apollo/client';

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
        email
      }
    }
  }
`

function App() {
  const {loading, error, data} = useQuery(query);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="App">
      <h1>Todo List</h1>
      {data.getTodos.map(todo => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
          <p>User: {todo?.user?.name} ({todo.user.email})</p>
        </div>
      ))}
    </div>
  );
}

export default App;
