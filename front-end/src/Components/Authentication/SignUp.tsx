import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

import axios from "axios";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import { register } from "../../Services/AdminServices";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState<any>([]);
    const toast = useToast()

    const submitHandler = async () => {
        setLoading(true);
  if(!name || !email|| !password || !confirmpassword){
    toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
    })
    setLoading(false);
    return;
  }
  if(password !== confirmpassword){
    toast({
        title: "Please fill all the fields>>>pass",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
    })

    return;

  }

  try {
    const config = {
        headers:{
            "Content-Type":"application/json"
        },
    };

    const userData = {name, email, password, pic }
    const {data} = await register(userData, config)
    
    toast({
        title: 'Registration successful',
        // description: "We've created your account for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "bottom",
    });
   
    localStorage.setItem('userInfo', JSON.stringify(data));
    setLoading(false);
    navigate('/chats');
  
  }catch(error: any){
    toast({
        title: 'Error occured',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom",
    });
  }
}
    const postDetails = (pics: any) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: 'Please select an image!',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dxi0xz2a2")
            fetch("https://api.cloudinary.com/v1_1/dxi0xz2a2/image/upload", {
                method: "post",
                body: data,

            }).then((res) => res.json()).then((data) => {
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });

        }
        else {
            toast({
                title: 'Please select an image!',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };




    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    onChange={(e: any) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e: any) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={(e: any) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
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
                    onChange={(e: any) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}

            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default SignUp;