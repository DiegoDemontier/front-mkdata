import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function FormGroup() {
  let navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    if (user === "admin" && password === "admin") {
      navigate("/admin");
    }
  }

  return (
    <div className="form-group">
      <h1>Login</h1>
      <TextField
        id="outlined-basic"
        label="Usuário"
        variant="outlined"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <TextField 
        id="outlined-basic"
        label="Senha"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="outlined"
        size="large"
        onClick={ handleSubmit }
      >
        Entrar
      </Button>
    </div>
  );
}