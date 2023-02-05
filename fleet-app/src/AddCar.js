import React from 'react';
import {useMutation} from '@apollo/client';
import {ADD_CAR} from './queries';

function AddCar() {
  let make, model, color, userId;
  const [addCar, {data, loading, error}] = useMutation(ADD_CAR);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCar({
            variables: {
              make: make.value,
              model: model.value,
              color: color.value,
              userId: userId.value,
            },
          });
          make.value = '';
          model.value = '';
          color.value = '';
          userId.value = '';
        }}
      >
        <input
          ref={(node) => {
            make = node;
          }}
          placeholder="Make"
        />
        <input
          ref={(node) => {
            model = node;
          }}
          placeholder="Model"
        />
        <input
          ref={(node) => {
            color = node;
          }}
          placeholder="Color"
        />
        <input
          ref={(node) => {
            userId = node;
          }}
          placeholder="User ID"
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default AddCar;
