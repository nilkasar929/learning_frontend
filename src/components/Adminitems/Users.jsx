import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUser } from "../../Redux/AdminReducer/action";
import Pagination from "./Pagination";
import AdminNavTop from "../AdminNavTop";

const Users = () => {
  const store = useSelector((store) => store.AdminReducer.users);
  
  const user = store.length;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const limit = 4;

  const handleSearch = (e) => setSearch(e.target.value);

  const handleSelect = (e) => setOrder(e.target.value);

  useEffect(() => {
    dispatch(getUser(page, limit));
  }, [page]);

  const handleDelete = (id, name) => {
    dispatch(deleteUsers(id));
    alert(`${name} has been deleted.`);
  };

  const handlePageChange = (page) => setPage(page);

  const handlePageButton = (val) => setPage((prev) => prev + val);

  const count = 2;

  return (
    <Box className="Nav" h="99vh" w="100%" p={5} mt="80px">
      <AdminNavTop handleSearch={handleSearch} />
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={5}
        mt={5}
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        p={4}
        bg="white"
        boxShadow="md"
      >
        <Text fontSize="2xl" fontWeight="bold">
          User Details
        </Text>
        <Select placeholder="Sort by age" onChange={handleSelect} maxW="300px">
          <option value="asc">Age: Low to High</option>
          <option value="desc">Age: High to Low</option>
        </Select>
        <Box>
          <Link to="/admin/users/add">
            <Button colorScheme="blue" leftIcon={<AddIcon />}>
              Create User
            </Button>
          </Link>
        </Box>
      </Grid>
      <Box
        overflowX="auto"
        mt={5}
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        p={4}
        bg="white"
        boxShadow="md"
      >
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Email</Th>
              <Th>City</Th>
              <Th>Age</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {user > 0 ? (
              store.map((el) => (
                <Tr key={el._id}>
                  <Td>{el.name}</Td>
                  <Td>{el.role}</Td>
                  <Td>{el.email}</Td>
                  <Td>{el.city}</Td>
                  <Td>{el.age}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(el.id, el.name)}
                      mr={2}
                    >
                      Delete
                    </Button>
                    <Link to={`/admin/users/edit/${el._id}`}>
                      <ButtonGroup size="sm" isAttached variant="outline">
                        <Button>Edit</Button>
                        <IconButton
                          aria-label="Edit user"
                          icon={<EditIcon />}
                        />
                      </ButtonGroup>
                    </Link>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="8">No users found.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Flex justify="space-between" align="center" mt={5}>
        <Button
          colorScheme="blue"
          onClick={() => handlePageButton(-1)}
          isDisabled={page <= 1}
        >
          Prev
        </Button>
        <Pagination
          totalCount={count}
          current_page={page}
          handlePageChange={handlePageChange}
        />
        <Button
          colorScheme="blue"
          onClick={() => handlePageButton(1)}
          isDisabled={page >= count}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default Users;
