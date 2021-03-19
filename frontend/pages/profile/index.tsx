/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserData } from '../../utils/Interfaces';

import { useToast } from '../../context/toast';
import { useUser } from '../../context/user';
import api from '../../utils/api';
import Button from '../../components/LoginButton';
import {
  Container,
  Form,
  GoBack,
  ProfileSection,
  ButtonSection,
  ModalContainer,
  ModalButton,
} from './styles';

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(0);
  const [modal, setModal] = useState(0);

  const router = useRouter();
  const { toast } = useToast();
  const { user, jwt, setUser, clearLocalStorage } = useUser();

  const handleLogout = useCallback(() => {
    clearLocalStorage();
    router.push('/');
  }, [clearLocalStorage, router]);

  const handleDeleteAccount = useCallback(() => {
    const inputs = document.getElementsByTagName('input');

    api
      .delete('/user', {
        headers: { Authorization: `Bearer ${jwt}` },
        data: { password: inputs[0].value },
      })
      .then(() => {
        clearLocalStorage();
        setModal(0);
        setLoading(0);
        toast('Account deleted successfully', 'success');
        router.push('/');
      })
      .catch((err) => {
        if (err.response.data.error.status === 401) {
          clearLocalStorage();
          toast('Your session has expired, please login again', 'warning');
          router.push('/login');
        } else {
          toast(
            err.response?.data?.error || 'Your request could not be completed',
            'error',
          );
        }
        setLoading(0);
        setModal(0);
      });
  }, [clearLocalStorage, router, jwt, toast]);

  const onHandleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const inputs = document.getElementsByTagName('input');

      if (inputs[1].value === '' && inputs[2].value === '') {
        toast('You must provide a new name or password', 'warning');
        return;
      }

      if (inputs[3].value === '') {
        toast('The "password" field is required', 'warning');
        return;
      }

      setLoading(1);

      let requestBody = {};
      if (inputs[1].value === '') {
        requestBody = {
          newPassword: inputs[2].value,
          password: inputs[3].value,
        };
      } else if (inputs[2].value === '') {
        requestBody = {
          name: inputs[1].value,
          password: inputs[3].value,
        };
      } else {
        requestBody = {
          name: inputs[1].value,
          newPassword: inputs[2].value,
          password: inputs[3].value,
        };
      }

      api
        .put<UserData>('/user', requestBody, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          toast('User updated successfully', 'success');
          setUser(res.data);
          inputs[0].value = '';
          inputs[1].value = '';
          inputs[2].value = '';
          inputs[3].value = '';
          setLoading(0);
        })
        .catch((err) => {
          if (err.response.data.error.status === 401) {
            clearLocalStorage();
            toast('Your session has expired, please login again', 'warning');
            router.push('/login');
          } else {
            toast(
              err.response?.data?.error ||
                'Your request could not be completed',
              'error',
            );
          }

          setLoading(0);
        });
    },
    [toast, jwt, setUser, router, clearLocalStorage],
  );

  return (
    <>
      <ModalContainer isModalOpen={modal}>
        <button type="button" onClick={(): void => setModal(0)}>
          <img src='/x.svg' alt="" />
        </button>
        <h2>Confirm password to delete account</h2>
        <input type="password" name="password" placeholder="password" />
        <ModalButton>
          <div onClick={handleDeleteAccount}>
            <Button color="#CC4C4C" hover="#F95E5A" loading={loading}>
              Delete
            </Button>
          </div>
        </ModalButton>
      </ModalContainer>
      <Container isModalOpen={modal}>
        <Link href="/main">
          <GoBack>
            <img src='/back.svg' alt="Go back to the app" />
            <p>App</p>
          </GoBack>
        </Link>
        <ProfileSection>
          <img src='/bossabox.svg' alt="Logo bossabox" />
          <h1>{user.name}</h1>
        </ProfileSection>
        <Form onSubmit={onHandleSubmit}>
          <input name="newname" placeholder="New name" />
          <br />
          <input
            type="password"
            name="newpassword"
            placeholder="New password"
          />
          <br />
          <input type="password" name="password" placeholder="Password" />
          <br />
          <Button color="#10B26C" hover="#12DB89" loading={loading}>
            Update profile
          </Button>
        </Form>
        <ButtonSection>
          <div onClick={handleLogout}>
            <Button>Logout</Button>
          </div>
          <div onClick={(): void => setModal(1)}>
            <Button
              id="delete"
              color="#CC4C4C"
              hover="#F95E5A"
              loading={loading}
            >
              Delete account
            </Button>
          </div>
        </ButtonSection>
      </Container>
    </>
  );
};

export default Profile;