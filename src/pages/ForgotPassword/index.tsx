import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn,  FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationsErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import logo from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  login: string;
  password: string;
}

export default function ForgotPassword(){
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          login: Yup.string()
            .required('Login obrigatório!')
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', { ...data });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado!',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha!',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="InDrive" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input name="login" placeholder="Login" icon={FiUser} />

            <Button type="submit" loading={loading}>
              Recuperar senha
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}