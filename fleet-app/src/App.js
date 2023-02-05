import './App.css';
import {useQuery} from '@apollo/client';
import AddUser from './AddUser';
import AddCar from './AddCar';
import {GET_USERS} from './queries';

function App() {
  const {loading, error, data} = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <div className="App">
      <h1>Users And Cars</h1>
      {data.users.map((user) => (
        <div key={user.id}>
          <h3>
            {user.name}({user.id})
          </h3>
          <ul>
            {user.cars.length !== 0 ? (
              user.cars.map((car) => (
                <li key={car.id}>
                  {car.make} {car.model}
                </li>
              ))
            ) : (
              <p>No cars</p>
            )}
          </ul>
        </div>
      ))}
      <hr />
      <AddUser />
      <hr />
      <AddCar />
    </div>
  );
}

export default App;
