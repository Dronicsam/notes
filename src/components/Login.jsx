// Основные модули

import * as React from 'react'
import {ChakraProvider} from '@chakra-ui/react'

import { Text, Center, Stack } from "@chakra-ui/react"

import { Input } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react"

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
                    <Text fontSize={"3xl"} align={"center"}>
                        Введите ваши данные
                    </Text>
                    <Input placeholder={"Ваш логин"} width={"30rem"}/>
                    <Input placeholder={"Ваш пароль"} width={"30rem"}/>
                    <Button _hover={{ bg: "green", color: "white"}}> Войти </Button>
                    <Link href={"/register"}>
                        <Text>
                            Нет учётной записи?
                        </Text>
                    </Link>
                </Stack>
            </Center>
        </ChakraProvider>
        )
}