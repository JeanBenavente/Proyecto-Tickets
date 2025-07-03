import React from 'react';
import { Navbar, Nav } from 'rsuite';
import { useNavigate } from 'react-router-dom';

function AdminNavBar(props) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <Navbar
      style={{
        backgroundColor: 'white',
        padding: '0.8rem 2rem',
        borderBottom: '1px solid #e0f2fe',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        zIndex: 20
      }}
    >
      <Navbar.Brand
        onClick={handleHomeClick}
        style={{
          fontSize: '1.4rem',
          fontWeight: 'bold',
          color: '#0284c7',
          cursor: 'pointer'
        }}
      >
        IT Ticketing System
      </Navbar.Brand>

      <Nav pullRight>
        <Nav.Item
          style={{
            fontWeight: '600',
            color: '#0f172a',
            backgroundColor: '#f0f9ff',
            padding: '0.5rem 1rem',
            borderRadius: '9999px'
          }}
        >
          {props.firstName} {props.lastName}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default AdminNavBar;
