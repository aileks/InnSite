import './ReviewForm.css';
// import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ReviewForm() {
  const user = useSelector(state => state.session.user);

  console.log(user);

  return (
    <div>
      <form action=""></form>
    </div>
  )
}

