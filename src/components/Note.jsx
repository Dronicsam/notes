import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Text, Textarea, Center } from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Link } from "@chakra-ui/react";


export default function App() {
  return (
    <ChakraProvider>
      <Menu>
        <MenuButton as={IconButton} icon={<HamburgerIcon />} variant={"outline"}></MenuButton>
        <MenuList>
          <Link href={"/"} _hover={{ textDecoration: "none" }}>
            <MenuItem>Вcе заметки</MenuItem>
          </Link>
          <Link href={"/note"} _hover={{ textDecoration: "none" }}>
            <MenuItem>Написать заметку</MenuItem>
          </Link>
          <Link href={"login"} _hover={{ textDecoration: "none" }}>
            <MenuItem>Войти</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      
      <Center mt="20px">
        <Text fontSize={"xl"} mb={"2px"}>
          Новая заметка
        </Text>
      </Center>
      <Center>
        <Textarea w="3xl" h="sm"/>
      </Center>
      
    </ChakraProvider>
    )
}