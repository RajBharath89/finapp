import {
    Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,Image,
    Title,
    Text,
    Anchor,
    Grid,
  } from '@mantine/core';
  import classes from './Login.module.css';
import Navigation from './navigation';
  
  function Login() {
    return (
      <Grid gutter={0}>
        <Grid.Col span={2}>
            <Navigation/>
        </Grid.Col>
        <Grid.Col span={10}>
            <div style={{backgroundColor:"#FA9014", padding:"25px"}}>

            <Title order={3} c="white">
            Dashboard
            </Title>
            </div>
        </Grid.Col>
      </Grid>
        
    );
  }
  export default Login;