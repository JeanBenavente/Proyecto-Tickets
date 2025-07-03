import React, { useState } from "react";
import NavBar from "./Navbar";
import {
  Form,
  ButtonToolbar,
  Button,
  Input,
  Notification,
  useToaster,
  SelectPicker,
} from "rsuite";
import { useNavigate } from "react-router-dom";

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

function Submit() {
  const message = (
    <Notification type="success" header="Ticket enviado con éxito">
      <p>Gracias por enviar tu solicitud de soporte.</p>
    </Notification>
  );

  const toaster = useToaster();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    ticketType: "",
    description: "",
  });

  const checkForm = () => {
    const { firstName, lastName, email, ticketType, description } = formData;
    return firstName && lastName && email && ticketType && description;
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const submitTicket = async (event) => {
    event.preventDefault();

    if (!checkForm()) {
      alert("Por favor completa todo el formulario.");
      return;
    }

    try {
      await fetch("http://localhost:8080/ticket-api/create-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toaster.push(message, { duration: 3000 });
      navigate("/");
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <NavBar />
      <div className="flex justify-center py-16 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-sky-100">
          <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
            📝 Enviar Ticket de Soporte
          </h2>
          <Form fluid>
            <div className="grid md:grid-cols-2 gap-4">
              <Form.Group controlId="firstName">
                <Form.ControlLabel className="text-sky-800 font-medium">Nombre</Form.ControlLabel>
                <Form.Control
                  name="firstName"
                  value={formData.firstName}
                  onChange={(value) => handleInputChange("firstName", value)}
                />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.ControlLabel className="text-sky-800 font-medium">Apellido</Form.ControlLabel>
                <Form.Control
                  name="lastName"
                  value={formData.lastName}
                  onChange={(value) => handleInputChange("lastName", value)}
                />
              </Form.Group>
            </div>

            <Form.Group controlId="email" className="mt-4">
              <Form.ControlLabel className="text-sky-800 font-medium">Correo electrónico</Form.ControlLabel>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
              />
              <Form.HelpText tooltip>Es obligatorio</Form.HelpText>
            </Form.Group>

            <Form.Group controlId="ticketType" className="mt-4">
              <Form.ControlLabel className="text-sky-800 font-medium">Tipo de Ticket</Form.ControlLabel>
              <SelectPicker
                data={[
                  { label: "Software", value: "SOFTWARE" },
                  { label: "Hardware", value: "HARDWARE" },
                  { label: "Problemas con Teléfono", value: "PHONE_ISSUES" },
                  { label: "Problemas de Correo", value: "EMAIL_ISSUES" },
                ]}
                value={formData.ticketType}
                onChange={(value) => handleInputChange("ticketType", value)}
                style={{ width: "100%" }}
                placeholder="Selecciona un tipo"
              />
            </Form.Group>

            <Form.Group controlId="description" className="mt-4">
              <Form.ControlLabel className="text-sky-800 font-medium">Descripción</Form.ControlLabel>
              <Form.Control
                rows={5}
                name="description"
                accepter={Textarea}
                value={formData.description}
                onChange={(value) => handleInputChange("description", value)}
              />
            </Form.Group>

            <Form.Group className="mt-6">
              <ButtonToolbar>
                <Button onClick={submitTicket} appearance="primary" className="bg-sky-600 hover:bg-sky-700 text-white font-medium">
                  Enviar
                </Button>
                <Button appearance="ghost">Cancelar</Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Submit;
