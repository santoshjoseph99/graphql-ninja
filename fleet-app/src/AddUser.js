import React from 'react';
import {useMutation} from '@apollo/client';
import {ADD_USER, GET_USERS} from './queries';

function AddUser() {
  let name;
  const [makeUser, {data, loading, error}] = useMutation(ADD_USER, {
    refetchQueries: [{query: GET_USERS}, 'Users'],
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          makeUser({variables: {name: name.value}});
          name.value = '';
        }}
      >
        <input
          ref={(node) => {
            name = node;
          }}
          placeholder="Name"
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
