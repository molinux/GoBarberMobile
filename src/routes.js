import React from 'react';
// SwitchNavigator não produz histórico. Toda a pilha de rotas é resetada
// Usado para rota de login e cadastro
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
  })
);
