import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const LangSelect = () => {
  // const [] = useState();
  return (
    <Form>
      <Form.Group controlId='exampleForm.SelectCustom'>
        <Form.Label>Custom select</Form.Label>
        <Form.Control as='select' custom>
          <option>1</option>
          <option>2</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default LangSelect;
