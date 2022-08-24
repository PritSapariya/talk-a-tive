import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../../config/firebaseConfig';

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [progress, setProgress] = useState(0);

  const toast = useToast();

  const imageErrorToast = (title = 'Please select an Image!') =>
    toast({
      title: title,
      status: 'warning',
      position: 'bottom',
      isClosable: true,
      duration: 5000,
    });

  const postDetails = (pic) => {
    try {
      if (pic === undefined) {
        imageErrorToast();
      }
      if (pic.type === 'image/jpeg' || pic.type == 'image/png') {
        // Uploading Image to firebase storage
        const storageRef = ref(
          storage,
          `${process.env.REACT_APP_FIREBASE_STORAGE_FOLDER_URL}${pic.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, pic, {
          contentType: pic.type,
        });
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const prog =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(prog);
          },
          (err) => console.error(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) =>
              // store this file URL
              console.log(url)
            );
          }
        );
      } else {
        imageErrorToast();
        return;
      }
    } catch (error) {
      imageErrorToast('Network Error');
    } finally {
      return;
    }
  };
  const submitHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="firstName" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email-signup" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password-signup" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        {progress > 0 && (
          <FormHelperText>Uploaded... {progress}%</FormHelperText>
        )}
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
