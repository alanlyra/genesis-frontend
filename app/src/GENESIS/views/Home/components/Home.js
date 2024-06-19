import { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import ReactTags from 'react-tag-autocomplete';
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

  const [defaultSwitch, setDefaultSwitch] = useState(true);

  const toggleHandler = () => {
    setDefaultSwitch(prevState => !prevState);
  };

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

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Automated Modules</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xl={3} md={6}>
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0">Bibliometrics</h5>
                    <div className="switch d-inline m-r-10 ml-3">
                      <Form.Control type="checkbox" id="check-bibliometrics" defaultChecked={!defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-bibliometrics" className="cr" style={{marginTop: "-10px"}}/>
                    </div>
                  </div>
                  <hr />
                  <Form.Group>
                    <div className="switch d-inline m-r-10">
                      <Form.Control type="checkbox" id="check-bibliometrics-scopus" defaultChecked={defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-bibliometrics-scopus" className="cr" />
                    </div>
                    <Form.Label>Scopus</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <div className="switch d-inline m-r-10">
                      <Form.Control type="checkbox" id="check-bibliometrics-pubmed" defaultChecked={!defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-bibliometrics-pubmed" className="cr" />
                    </div>
                    <Form.Label>Pubmed</Form.Label>
                  </Form.Group>
                </Col>
                <Col xl={3} md={6}>
                <div className="d-flex align-items-center">
                    <h5 className="mb-0">Roadmap</h5>
                    <div className="switch switch-warning d-inline m-r-10 ml-3">
                      <Form.Control type="checkbox" id="check-roadmap" disabled defaultChecked={defaultSwitch} />
                      <Form.Label htmlFor="check-roadmap" className="cr" style={{marginTop: "-10px"}}/>
                    </div>
                  </div>
                  <hr />
                  <Form.Group>
                    <div className="switch switch-warning d-inline m-r-10">
                      <Form.Control type="checkbox" id="check-roadmap-generative-ai" defaultChecked={defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-roadmap-generative-ai" className="cr" />
                    </div>
                    <Form.Label>Generative AI</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <div className="switch switch-warning d-inline m-r-10">
                      <Form.Control type="checkbox" id="check-roadmap-ner" defaultChecked={!defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-roadmap-ner" className="cr" />
                    </div>
                    <Form.Label>NER</Form.Label>
                  </Form.Group>
                </Col>
                <Col xl={3} md={6}>
                <div className="d-flex align-items-center">
                    <h5 className="mb-0">Scenarios</h5>
                    <div className="switch switch-alternative d-inline m-r-10 ml-3">
                      <Form.Control type="checkbox" id="check-scenarios" defaultChecked={!defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-scenarios" className="cr" style={{marginTop: "-10px"}}/>
                    </div>
                  </div>
                  <hr />
                  <Form.Group>
                    <div className="switch switch-alternative d-inline m-r-10">
                      <Form.Control type="checkbox" id="check-scenario-optimistic" defaultChecked={defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-scenario-optimistic" className="cr" />
                    </div>
                    <Form.Label>Optimistic</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <div className="switch switch-alternative d-inline m-r-10">
                      <Form.Control type="checkbox" id="check-scenario-pessimistic" defaultChecked={defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-scenario-pessimistic" className="cr" />
                    </div>
                    <Form.Label>Pessimistic</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <div className="switch switch-alternative d-inline m-r-10">
                      <Form.Control type="checkbox" id="check-scenario-neutral" defaultChecked={defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-scenario-neutral" className="cr" />
                    </div>
                    <Form.Label>Neutral</Form.Label>
                  </Form.Group>
                </Col>
                <Col xl={3} md={6}>
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0">Report</h5>
                    <div className="switch switch-primary d-inline m-r-10 ml-3">
                      <Form.Control type="checkbox" id="check-report" defaultChecked={!defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-report" className="cr" style={{marginTop: "-10px"}}/>
                    </div>
                  </div>
                  <hr />
                  <Form.Group>
                    <div className="switch switch-primary d-inline m-r-10">
                      <Form.Control type="checkbox" id="check-report-full" defaultChecked={defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-report-full" className="cr" />
                    </div>
                    <Form.Label>Full</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <div className="switch switch-primary d-inline m-r-10">
                      <Form.Control type="checkbox" id="check-report-short" defaultChecked={!defaultSwitch} onChange={() => toggleHandler} />
                      <Form.Label htmlFor="check-report-short" className="cr" />
                    </div>
                    <Form.Label>Short</Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
}

export default Home;