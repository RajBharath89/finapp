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

        <TextInput label="Username" placeholder="hello@gmail.com" size="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
        {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
        <Button mt="xl" size="md" color='#FA9014'>
          Login
        </Button>

        {/* <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text> */}
      </Paper>
    </div>
  );
}
export default Login;