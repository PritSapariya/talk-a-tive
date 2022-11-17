import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import {
  MUST_BE_EMAIL,
  PASSWORD_VALIDATION,
  REQUIRED_FIELD,
} from '../../utilities/messages';

const Login = () => {
  const [show, setShow] = useBoolean();

  const loginSchema = yup.object().shape({
    email: yup.string().email(MUST_BE_EMAIL).required(REQUIRED_FIELD),
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        PASSWORD_VALIDATION
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const submitHandler = () => {};

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <VStack spacing="10px">
        <FormControl id="email-login" isInvalid={errors.email}>
          <FormLabel>Email Address</FormLabel>
          <Input
            {...register('email')}
            type="email"
            placeholder="Enter Your Email Address"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="password-login" isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              {...register('password')}
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={setShow.toggle}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
        >
          Login
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          onClick={() => {
            setValue('email', 'guest@example.com');
            setValue('password', '123456');
          }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
