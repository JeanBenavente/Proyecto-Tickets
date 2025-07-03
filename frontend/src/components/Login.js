import React, { useState } from "react";
import NavBar from "./Navbar";
import {
  Form,
  Button,
  Panel,
  Stack,
  Input,
  InputGroup,
} from "rsuite";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Password = React.forwardRef(({ value, onChange, ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <InputGroup inside {...props}>
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(value, event) => onChange(value)}
      />
      <InputGroup.Button onClick={handleToggleVisibility}>
        {visible ? <FaRegEye /> : <FaRegEyeSlash />}
      </InputGroup.Button>
    </InputGroup>
  );
});

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const checkInputs = () => username !== "" && password !== "";

  const login = async () => {
    if (!checkInputs()) {
      alert("Por favor completa ambos campos.");
      return;
    }

    const payload = { username, password };

    try {
      const response = await fetch(
        "http://localhost:8080/user-api/find-user-by-username",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        navigate("/admin-dashboard", {
          state: { data: await response.json() },
        });
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200">
      <NavBar />
      <div className="flex justify-center items-center pt-12 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-sky-100">
          <h2 className="text-3xl font-bold text-sky-700 text-center mb-6">
            Bienvenido a TicketPro 🎟️
          </h2>
          <Stack
            alignItems="center"
            justifyContent="center"
            style={{ height: "100%" }}
          >
            <Panel
              bordered
              style={{ width: "100%", backgroundColor: "transparent", border: "none" }}
            >
              <Form fluid>
                <Form.Group>
                  <Form.ControlLabel className="text-sky-800 font-medium">
                    Usuario
                  </Form.ControlLabel>
                  <Form.Control
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel className="text-sky-800 font-medium">
                    Contraseña
                  </Form.ControlLabel>
                  <Form.Control
                    name="password"
                    accepter={Password}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Button
                  appearance="primary"
                  block
                  onClick={login}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold mt-4 rounded-md"
                >
                  Iniciar sesión
                </Button>
              </Form>
            </Panel>
          </Stack>
          <p className="text-gray-500 text-sm text-center mt-4">
            ¿Olvidaste tu contraseña?{" "}
            <span className="text-sky-600 underline hover:text-sky-800 cursor-pointer">
              Contacta al administrador
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
