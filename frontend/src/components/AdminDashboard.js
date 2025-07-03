import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidenav,
  Nav,
  SelectPicker,
  Table,
  Tag,
  Input,
  Button,
} from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import AdminNavBar from "./AdminNavbar";

const { Column, HeaderCell, Cell } = Table;

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.data || null;

  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filterType, setFilterType] = useState(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const ticketTypeOptions = [
    { label: "Todos", value: null },
    { label: "Hardware", value: "HARDWARE" },
    { label: "Software", value: "SOFTWARE" },
    { label: "Email Issues", value: "EMAIL_ISSUES" },
    { label: "Phone Issues", value: "PHONE_ISSUES" },
  ];

  useEffect(() => {
    if (!userData) {
      navigate("/");
      return;
    }
    fetch("http://localhost:8080/ticket-api/all")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setFilteredTickets(data);
      })
      .catch((err) => console.error("Error fetching tickets:", err));
  }, [userData, navigate]);

  useEffect(() => {
    if (filterType) {
      setFilteredTickets(
        tickets.filter((ticket) => ticket.ticketType === filterType)
      );
    } else {
      setFilteredTickets(tickets);
    }
  }, [filterType, tickets]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { from: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        { from: "gemini", text: "Respuesta de Gemini (simulado)" },
      ]);
    }, 1000);
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <AdminNavBar
        firstName={userData.firstName}
        lastName={userData.lastName}
      />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-60 h-screen border-r border-gray-200 bg-white shadow-sm">
          <Sidenav defaultOpenKeys={["3", "4"]} appearance="subtle">
            <Sidenav.Body>
              <Nav activeKey="1" className="pt-4">
                <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<GroupIcon />}>
                  User Group
                </Nav.Item>
                <Nav.Menu eventKey="3" title="Advanced" icon={<MagicIcon />}>
                  <Nav.Item eventKey="3-1">Geo</Nav.Item>
                  <Nav.Item eventKey="3-2">Devices</Nav.Item>
                </Nav.Menu>
                <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
                  <Nav.Item eventKey="4-1">Applications</Nav.Item>
                </Nav.Menu>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>

        {/* Main Content and Chat */}
        <div className="flex-1 p-6 flex gap-6">
          {/* Tickets */}
          <div className="w-3/4">
            <h2 className="text-3xl font-bold text-sky-700 mb-6">
              🎫 Listado de Tickets
            </h2>

            <div className="mb-4 max-w-xs">
              <SelectPicker
                data={ticketTypeOptions}
                placeholder="Filtrar por tipo"
                value={filterType}
                onChange={setFilterType}
                style={{ width: "100%" }}
              />
            </div>

            <div className="bg-white rounded-xl shadow-md p-4">
              <Table
                data={filteredTickets}
                bordered
                hover
                autoHeight
                className="rounded-md"
              >
                <Column width={80} align="center" fixed>
                  <HeaderCell>ID</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column width={160} align="center">
                  <HeaderCell>Nombre</HeaderCell>
                  <Cell>{(row) => `${row.firstName} ${row.lastName}`}</Cell>
                </Column>

                <Column width={200} align="center">
                  <HeaderCell>Email</HeaderCell>
                  <Cell dataKey="email" />
                </Column>

                <Column width={150} align="center">
                  <HeaderCell>Tipo</HeaderCell>
                  <Cell dataKey="ticketType" />
                </Column>

                <Column width={250} align="center">
                  <HeaderCell>Descripción</HeaderCell>
                  <Cell dataKey="description" />
                </Column>

                <Column width={140} align="center">
                  <HeaderCell>Fecha</HeaderCell>
                  <Cell dataKey="submittedDate" />
                </Column>

                <Column width={140} align="center">
                  <HeaderCell>Estado</HeaderCell>
                  <Cell>
                    {(row) =>
                      row.completed ? (
                        <Tag color="green">Completado</Tag>
                      ) : (
                        <Tag color="red">Pendiente</Tag>
                      )
                    }
                  </Cell>
                </Column>
              </Table>
            </div>
          </div>

          {/* Chat con Gemini */}
          <div className="w-1/4 bg-white shadow-lg rounded-xl border border-sky-100 flex flex-col">
            <div className="p-4 border-b border-sky-100 text-sky-700 font-bold text-lg">
              🤖 Chat con Gemini
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-md max-w-xs ${
                    msg.from === "user"
                      ? "bg-blue-100 text-right self-end"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-sky-100 flex gap-2">
              <Input
                value={chatInput}
                onChange={setChatInput}
                placeholder="Escribe tu pregunta..."
              />
              <Button onClick={sendMessage} appearance="primary">
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
