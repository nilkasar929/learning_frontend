import { Flex, Text, Button, Image, Box } from "@chakra-ui/react";
import teacher from "../../asset/A.png";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
  const navigate = useNavigate();
  
  return (
    <Flex
      mt={100}
      mb={70}
      gap={50}
      p="15px"
      justify="center"
      bgGradient="linear(to-r, #f5f7fa, #c3cfe2)"  // Gradient background for a modern look
      borderRadius="20px" // Rounded corners for the section
      boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"  // Soft shadow for a floating effect
    >
      <Flex
        direction="column"
        w={{
          base: "100%",
          sm: "60%",
          md: "55%",
          lg: "50%",
        }}
        gap={30}
      >
        <Text
          fontSize={{
            base: "70px",
            sm: "30px",
            md: "60px",
            lg: "80px",
          }}
          fontWeight="bold"
          fontFamily="Poppins"
          lineHeight="1.1"
          textShadow="2px 4px 10px rgba(0, 0, 0, 0.1)"  // Text shadow for added depth
          color="#0D47A1"
          _hover={{
            transform: "scale(1.05)",  // Hover effect for headline text
            transition: "all 0.3s ease-in-out",
          }}
        >
          Learn without limits
        </Text>
        <Text
          fontSize={{
            lg: "18px",
            md: "16px",
            sm: "14px",
            base: "20px",
          }}
          fontWeight="semibold"
          color="gray.700"  // Softer text color for readability
        >
          <Text fontSize="2rem" color="#0056d2" display="inline">SRM</Text> Where Educators and Students Connect Seamlessly Online. Teachers craft personalized courses for various subjects and grades, while students explore and purchase courses tailored to their needs. Empowering both educators and learners, SRM revolutionizes online education.
        </Text>
        <Flex
          gap={30}
          direction={{
            base: "column",
            sm: "column",
            md: "row",
            lg: "row",
          }}
        >
          <Button
            bg="#0056d2"
            color="white"
            size="lg"
            p={{
              lg: "30px 60px",
              md: "25px 50px",
              sm: "20px 40px",
            }}
            border="3px solid #0056d2"
            borderRadius="30px"  // More rounded button for a softer feel
            boxShadow="0px 6px 15px rgba(0, 0, 0, 0.2)"
            _hover={{ 
              background: "#42A5F5", 
              color: "#fff",
              transform: "scale(1.05)",  // Slight scaling on hover
              transition: "all 0.3s ease-in-out",
            }}
            onClick={() => navigate("/signup")}
          >
            Join for Free
          </Button>
          <Button
            variant="outline"
            color="#0056d2"
            border="3px solid #0056d2"
            size="lg"
            p={{
              lg: "30px 60px",
              md: "25px 50px",
              sm: "20px 40px",
            }}
            borderRadius="30px"  // Rounded edges for consistency
            _hover={{
              background: "#0056d2", 
              color: "#fff",
              transform: "scale(1.05)",  // Slight scaling on hover
              transition: "all 0.3s ease-in-out",
            }}
            onClick={() => navigate("/login")}
          >
            Try SRM for Business
          </Button>
        </Flex>
      </Flex>

      {/* Image Section with improved layout */}
      <Box
        display={{ base: "none", sm: "none", md: "flex" }}
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={teacher}
          alt="Teacher Image"
          width={{
            md: "60%",
            lg: "80%",
          }}
          objectFit="contain"
          borderRadius="20px"  // Rounded corners for the image
          boxShadow="0px 6px 15px rgba(0, 0, 0, 0.15)"  // Soft shadow to lift the image
          _hover={{
            transform: "scale(1.05)",  // Slight scaling on hover
            transition: "all 0.3s ease-in-out",
          }}
        />
      </Box>
    </Flex>
  );
};

export default Section1;
