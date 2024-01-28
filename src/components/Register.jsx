// Основные модули

import * as React from 'react'
import {ChakraProvider} from '@chakra-ui/react'

import { Center, Stack } from "@chakra-ui/react"

import RegisterHook from "./RegisterHook.jsx";

import { HamburgerIcon } from "@chakra-ui/icons"
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Link } from "@chakra-ui/react"

import theme from "./Font.jsx"

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <Menu>
                <MenuButton mt={"1rem"} ml={"1rem"} as={ IconButton } icon={<HamburgerIcon />} variant={"outline"}></MenuButton>
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
            <Center marginTop={"5rem"}>
                <Stack>
                    <RegisterHook />
                </Stack>
            </Center>
        </ChakraProvider>
        )
}
