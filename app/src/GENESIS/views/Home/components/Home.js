import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function Home() {
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '2024-01-01',
    endDate: '2100-12-31',
    status: 'Created',
    owner: '1',
    createdBy: '1',
    createdDate: new Date()
    // Adicione aqui outros campos do projeto
  });

  const handleChange = (event) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/projects`, project)
      .then(response => {
        console.log(response.data);
        // Redirecionar para a página de projetos ou limpar o formulário
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formProjectName">
        <Form.Label>Project Name</Form.Label>
        <Form.Control type="text" name="name" value={project.name} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formProjectDescription">
        <Form.Label>Project Description</Form.Label>
        <Form.Control as="textarea" name="description" value={project.description} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formProjectStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" name="startDate" value={project.startDate} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formProjectEndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" name="endDate" value={project.endDate} onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
}

export default Home;