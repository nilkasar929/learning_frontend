import React, { useRef, useState } from "react";
import Navbar from "../Pages/Navbar";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpFetch } from "../Redux/UserReducer/action";
import { actionsingUpError } from "../Redux/UserReducer/actionType";

// Success Toast
export const showToast = ({ toast, message, color }) => {
  toast({
    position: "top-right",
    top: "100px",
    duration: 3000,
    render: () => (
      <Box color="white" p={3} bg={color}>
        {message || "Something went wrong. Please refresh."}
      </Box>
    ),
  });
};

const SignUp = () => {
  const emailInput = useRef(null);
  const backgroundRef = useRef(null);
  const emailbox = useRef(null);
  const passwordInput = useRef(null);
  const passwordbox = useRef(null);
  const nameInput = useRef(null);
  const namebox = useRef(null);
  const confirmPasswordInput = useRef(null);
  const confirmPasswordbox = useRef(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    isPromotion: false,
  });

  const navigate = useNavigate();
  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [eyeclose, seteyeMoment] = useState(false);
  const toast = useToast();

  // Show input fields on click
  function showInput(e) {
    const ele = e.target.id;
    if (ele === "email") {
      emailInput.current.style.display = "block";
      emailInput.current.focus();
      emailbox.current.style.padding = "5px 20px";
    } else if (ele === "password") {
      passwordInput.current.style.display = "block";
      passwordInput.current.focus();
      passwordbox.current.style.padding = "5px 20px";
    } else if (ele === "name") {
      nameInput.current.style.display = "block";
      nameInput.current.focus();
      namebox.current.style.padding = "5px 20px";
    } else if (ele === "confirmPassword") {
      confirmPasswordInput.current.style.display = "block";
      confirmPasswordInput.current.focus();
      confirmPasswordbox.current.style.padding = "5px 20px";
    }
  }

  // Block input field on background click
  function blockInput(event) {
    if (event.target === backgroundRef.current && !form.email) {
      emailInput.current.style.display = "none";
      emailbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.password) {
      passwordInput.current.style.display = "none";
      passwordbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.confirmPassword) {
      confirmPasswordInput.current.style.display = "none";
      confirmPasswordbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.name) {
      nameInput.current.style.display = "none";
      namebox.current.style.padding = "20px";
    }
  }

  // Form input management
  function handleInput(e) {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  }

  // Toggle password visibility
  function showPassword() {
    seteyeMoment(!eyeclose);
    passwordInput.current.type === "password"
      ? (passwordInput.current.type = "text")
      : (passwordInput.current.type = "password");
  }

  // Handle promotion checkbox
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setForm({ ...form, isPromotion: !isChecked });
  };

  // SignUp function
  async function handleSignUp() {
    const { email, password, confirmPassword, name } = form;
    if (!email || !password || !confirmPassword || !name) {
      dispatch(actionsingUpError("All fields are required"));
      return;
    }

    if (confirmPassword !== password) {
      dispatch(actionsingUpError("Password does not match"));
      return;
    }

    if (password.length < 8) {
      dispatch(
        actionsingUpError("Password should be at least 8 characters long")
      );
      return;
    }

    dispatch(signUpFetch(form)).then((res) => {
      if (!userStore?.isError) {
        setForm({ email: "", password: "", confirmPassword: "", name: "" });
        showToast({ toast, message: "SignUp Successful", color: "green" });
        navigate("/login");
      } else {
        showToast({ toast, message: userStore?.isError, color: "red" });
      }
    });
  }

  return (
    <Box pb="2rem">
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        onClick={blockInput}
        ref={backgroundRef}
        pt="100px"
        px={{ base: "1rem", md: "2rem" }}
      >
        <Box
          w={{ base: "90%", sm: "80%", md: "40%", lg: "30%" }}
          boxShadow="lg"
          p="2rem"
          bg="white"
          borderRadius="md"
        >
          <Box mb="1rem">
            <Heading size="lg">Sign up and start learning</Heading>
          </Box>
          <Box mt="1rem">
            {/* Name */}
            <Box
              border="1px solid"
              p="1rem"
              mb="0.75rem"
              id="name"
              onClick={showInput}
              ref={namebox}
              borderRadius="md"
            >
              <Heading size="xs" id="name">
                Name
              </Heading>
              <Input
                type="text"
                display="none"
                ref={nameInput}
                border="none"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="name"
                value={form.name}
                onChange={handleInput}
              />
            </Box>
            {/* Email */}
            <Box
              border="1px solid"
              p="1rem"
              mb="0.75rem"
              id="email"
              onClick={showInput}
              ref={emailbox}
              borderRadius="md"
            >
              <Heading size="xs" id="email">
                Email
              </Heading>
              <Input
                display="none"
                ref={emailInput}
                border="none"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="email"
                value={form.email}
                onChange={handleInput}
              />
            </Box>
            {/* Password */}
            <Box
              border="1px solid"
              p="1rem"
              mb="0.75rem"
              id="password"
              onClick={showInput}
              ref={passwordbox}
              borderRadius="md"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="xs" id="password">
                  Password
                </Heading>
                <Box onClick={showPassword}>
                  {eyeclose ? (
                    <AiFillEye size="20px" />
                  ) : (
                    <AiOutlineEyeInvisible size="20px" />
                  )}
                </Box>
              </Flex>
              <Input
                type="password"
                display="none"
                ref={passwordInput}
                border="none"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="password"
                value={form.password}
                onChange={handleInput}
              />
            </Box>
            {/* Confirm Password */}
            <Box
              border="1px solid"
              p="1rem"
              mb="0.75rem"
              id="confirmPassword"
              onClick={showInput}
              ref={confirmPasswordbox}
              borderRadius="md"
            >
              <Heading size="xs" id="confirmPassword">
                Confirm Password
              </Heading>
              <Input
                type="password"
                display="none"
                ref={confirmPasswordInput}
                border="none"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleInput}
              />
            </Box>
            {/* Checkbox */}
            <Flex alignItems="center" mt="1rem">
              <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
              <Text ml="0.5rem">
                Send me special offers, personalized recommendations, and
                learning tips.
              </Text>
            </Flex>
            {/* Button */}
            <Box mt="1.5rem">
              <Button
                w="100%"
                colorScheme="blue"
                borderRadius="md"
                onClick={handleSignUp}
                isLoading={userStore.loading}
              >
                Sign Up
              </Button>
            </Box>
            <Flex mt="1rem" justifyContent="center" fontSize="0.875rem">
              <Text>Already have an account?</Text>
              <Link to="/login">
                <Text fontWeight="500" ml="0.5rem" color="blue.500">
                  Login
                </Text>
              </Link>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
