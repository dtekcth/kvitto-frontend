import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';

export function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <Button variant="primary">Primary</Button>
  );
}