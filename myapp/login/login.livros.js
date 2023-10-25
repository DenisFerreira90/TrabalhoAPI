const express = require("express");
const credentiaciais = {
  username: 'usuario',
  password: 'senha',
};

// Rota para autenticar e gerar um token
app.post('./login/login.livros', (req, res) => {
    // Autentique o usuário (verifique as credenciais)
    const { username, password } = req.body;
  
    // Verifique as credenciais (substitua isso pela sua lógica de autenticação)
    if (username === 'seu-usuario' && password === 'sua-senha') {
      // Crie um token
      const token = jwt.sign({ username }, 'sua-chave-secreta', { expiresIn: '1h' });
  
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });