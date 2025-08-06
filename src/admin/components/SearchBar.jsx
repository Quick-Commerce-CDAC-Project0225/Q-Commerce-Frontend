import React from 'react';
import { FormControl, Form } from 'react-bootstrap';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <Form className="mb-3">
      <FormControl
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </Form>
  );
}