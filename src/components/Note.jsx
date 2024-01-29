// Основные модули

import { ChakraProvider } from '@chakra-ui/react'

import { Text, Center } from "@chakra-ui/react"
import { Highlight } from '@chakra-ui/react'

import {HamburgerIcon} from "@chakra-ui/icons"
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Link } from "@chakra-ui/react"

import theme from "./Font.jsx"

import Hookform from "./Hookform.jsx";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Menu>
        <MenuButton mt={"1rem"} ml={"1rem"} as={IconButton} icon={<HamburgerIcon />} variant={"outline"}></MenuButton>
        <MenuList>
          <Link href={"/"} _hover={{ textDecoration: "none" }}>
            <MenuItem>Вcе заметки</MenuItem>
          </Link>
          <Link href={"/note"} _hover={{ textDecoration: "none" }}>
            <MenuItem>
              <Highlight query='Написать заметку' styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100'}}>
                Написать заметку
              </Highlight>
            </MenuItem>
          </Link>
          <Link href={"login"} _hover={{ textDecoration: "none" }}>
            <MenuItem>Войти</MenuItem>
          </Link>
        </MenuList>
      </Menu>

      <Center mt="20px">
        <Text fontSize={"xl"} mb={"1rem"}>
          Новая заметка
        </Text>
      </Center>
      <Center>
        <Hookform />
      </Center>
    </ChakraProvider>
    )
}