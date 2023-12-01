import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,Image,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import classes from './Login.module.css';


function Login() {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      // Send a POST request to your server for authentication
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
      if (response.status === 200) {
        // Successful login, redirect to a success page

        console.log(result)
        router.push('/admin/dashboard');
      } else {
        // Login failed, display an error message
        console.log(result)

        // alert('Login failed');
      }
    };


  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
      <Image
          radius="md"
          src="./logo-red.svg"
          w={250}
        />
        
        <Title order={4} className={classes.title} ta="left" mt={50} mb="lg"> 
          Admin Login
        </Title>

        {/* <TextInput label="Username" placeholder="hello@gmail.com" size="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
        <Button mt="xl" size="md" color='#FA9014' >
          Login
        </Button> */}

        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

        
      </Paper>
    </div>
  );
}
export default Login;