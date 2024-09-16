import React, { useEffect, useRef, useState } from "react";
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
  keyframes,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginFetch } from "../Redux/UserReducer/action";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "./SignUp";

const Login = () => {
  const emailInput = useRef(null);
  const backgroundRef = useRef(null);
  const emailbox = useRef(null);
  const passwordInput = useRef(null);
  const passwordbox = useRef(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // Animation for fading in the input boxes smoothly
  const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

  function showInput(e) {
    const ele = e.target.id;
    if (ele === "email") {
      emailInput.current.style.display = "block";
      emailInput.current.style.animation = `${fadeIn} 0.5s ease-in-out`; // Add fade-in animation
      emailInput.current.focus();
      emailbox.current.style.padding = "5px 20px";
    } else if (ele === "password") {
      passwordInput.current.style.display = "block";
      passwordInput.current.style.animation = `${fadeIn} 0.5s ease-in-out`; // Add fade-in animation
      passwordInput.current.focus();
      passwordbox.current.style.padding = "5px 20px";
    }
  }

  function blockInput(event) {
    if (event.target === backgroundRef.current && !form.email) {
      emailInput.current.style.display = "none";
      emailbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.password) {
      passwordInput.current.style.display = "none";
      passwordbox.current.style.padding = "20px";
    }
  }

  function handleInput(e) {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleLogin() {
    dispatch(loginFetch(form)).then((res) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.message) {
        showToast({ toast, message: "Login Successful", color: "green" });
        setForm({ email: "", password: "" });
      } else {
        showToast({ toast, message: userStore?.isError, color: "red" });
      }
    });
  }

  useEffect(() => {
    if (userStore.isAuth) {
      if (userStore?.role === "user") {
        navigate("/home");
      } else if (userStore?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userStore?.role === "teacher") {
        navigate("/TeacherDashboard");
      }
    }
  }, [userStore?.isAuth, userStore?.role]);

  return (
    <Box pb="2rem">
      <Box>
        <Navbar />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgGradient="linear(to-r, #edf2f7, #cfe1f5)" // Subtle gradient background
        pt="100px"
        onClick={blockInput}
        ref={backgroundRef}
      >
        <Box
          w={{ base: "90%", sm: "80%", md: "40%", lg: "30%" }}
          p="2rem"
          bg="white"
          borderRadius="10px"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        >
          <Heading size="md" textAlign="center" mb="1.5rem">
            Log in to your eLearning Account
          </Heading>

          <Box mt="35px">
            <Box
              border="1px solid #e2e8f0"
              p="20px"
              borderRadius="10px"
              m="5px 0"
              onClick={showInput}
              ref={emailbox}
              _hover={{ borderColor: "#3182ce" }} // Add hover effect to input box
            >
              <Heading id="email" size="xs" color="gray.500">
                Email
              </Heading>
              <Input
                type="email"
                display="none"
                ref={emailInput}
                border="none"
                p="0px"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="email"
                value={form.email}
                onChange={handleInput}
              />
            </Box>

            <Box
              border="1px solid #e2e8f0"
              p="20px"
              borderRadius="10px"
              m="5px 0"
              onClick={showInput}
              ref={passwordbox}
              _hover={{ borderColor: "#3182ce" }} // Add hover effect to input box
            >
              <Heading id="password" size="xs" color="gray.500">
                Password
              </Heading>
              <Input
                type="password"
                display="none"
                ref={passwordInput}
                border="none"
                size="sm"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="password"
                value={form.password}
                onChange={handleInput}
              />
            </Box>

            <Flex justify="space-between" mt="1rem">
              <Text fontSize="0.8rem" color="gray.500">
                Don't have an account?
              </Text>
              <Link to="/signup">
                <Text fontWeight="500" color="#3182ce" fontSize="0.8rem">
                  Sign up
                </Text>
              </Link>
            </Flex>

            <Button
              w="100%"
              mt="2rem"
              color="white"
              bgGradient="linear(to-r, #0056D2, #1E88E5)" // Gradient button
              _hover={{ bgGradient: "linear(to-r, #1E88E5, #42A5F5)", color: "#fff" }} // Hover effect
              borderRadius="5px"
              textAlign="center"
              onClick={handleLogin}
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            >
              <Heading size="xs">
                {userStore.loading ? <Spinner color="white" /> : "Log in"}
              </Heading>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
