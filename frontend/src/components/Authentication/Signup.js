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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CONFIRM_PASSWORD_VALIDATION,
  MUST_BE_CHARACTER,
  MUST_BE_EMAIL,
  MUST_BE_IMAGE,
  PASSWORD_VALIDATION,
  REQUIRED_FIELD,
} from '../../utilities/messages';
import { SUPPORTED_FILE_FORMATS } from '../../utilities/constants';
import { uploadImageToStorage } from '../../utilities/helper';
import useMessageToast from '../../hooks/useMessageToast';

const Signup = () => {
  const [show, setShow] = useBoolean();
  const { errorToast } = useMessageToast();

  const signupSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z ]*$/, MUST_BE_CHARACTER)
      .required(REQUIRED_FIELD),
    email: yup.string().email(MUST_BE_EMAIL).required(REQUIRED_FIELD),
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        PASSWORD_VALIDATION
      ),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref('password')], CONFIRM_PASSWORD_VALIDATION)
      .required(REQUIRED_FIELD),
    pic: yup
      .mixed()
      .test(
        'fileType',
        MUST_BE_IMAGE,
        (values) =>
          values.length > 0 && SUPPORTED_FILE_FORMATS.includes(values[0].type)
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const submitHandler = async (data) => {
    try {
      const fileURL = await uploadImageToStorage(data.pic[0]);
      console.log(fileURL);
    } catch (error) {
      errorToast('Network Error');
    }
    // handle the form submisssion logic
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <VStack spacing="5px">
        <FormControl id="firstName" isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            {...register('name')}
            placeholder="Enter Your Name"
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="email-signup" isInvalid={errors.email}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            {...register('email')}
            placeholder="Enter Your Email Address"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="password-signup" isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? 'text' : 'password'}
              {...register('password')}
              placeholder="Enter Password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={setShow.toggle}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="confirmPassword" isInvalid={errors.confirmpassword}>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? 'text' : 'password'}
              {...register('confirmpassword')}
              placeholder="Enter Confirm Password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={setShow.toggle}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.confirmpassword?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="pic-signup" isInvalid={errors.pic}>
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            name="pic"
            p={1.5}
            accept="image/*"
            {...register('pic')}
          />
          <FormErrorMessage>{errors.pic?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default Signup;
