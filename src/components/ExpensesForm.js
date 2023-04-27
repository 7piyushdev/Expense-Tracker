import React, { useContext } from "react";
import { FormGroup, Label, Input, Form, Button, Col, Row } from "reactstrap";
import ExpenseContext from "../context-store/Expense-Context";

const categories = ["Food", "Petrol", "Salary"];

const ExpensesForm = () => {
  const expCtx = useContext(ExpenseContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    expCtx.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    expCtx.addExpense({
      amount: expCtx.state.amount,
      description: expCtx.state.description,
      category: expCtx.state.category,
    });
    expCtx.setState({
      amount: "",
      description: "",
      category: categories[0],
    });
  };

  return (
    <div className='container card bg-light text-dark'>
      <h3 className='text-center m-2'>Add Expense</h3>
      <Form className='m-5' onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <Label for='amount'>Amount:</Label>
              <Input
                type='number'
                name='amount'
                id='amount'
                placeholder='Enter amount'
                value={expCtx.state.amount}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for='description'>Description:</Label>
              <Input
                type='text'
                name='description'
                id='description'
                placeholder='Enter description'
                value={expCtx.state.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for='category'>Category:</Label>
              <Input
                type='select'
                name='category'
                id='category'
                value={expCtx.state.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button color='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ExpensesForm;
