import * as React from 'react'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import { Text, Center } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Link } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        brand: {
            50: "#44337A",
            100: "#B794F4",
            500: "#B794F4", // you need this
        }
    }
});


export default function App() {
    return (
        <ChakraProvider theme={theme}>
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
            <Center margin={2}>
                <Text fontSize={"3xl"}>
                    Войти
                </Text>
            </Center>
            <Center>
                <Input placeholder={"Ваш логин"} width={"30rem"}/>
            </Center>
            <Center mt={"1rem"}>
                <Input placeholder={"Ваш пароль"} width={"30rem"}/>
            </Center>
            <Center mt={"1rem"}>
                <Button _hover={{ bg: "green", color: "white"}}> Войти </Button>
            </Center>
        </ChakraProvider>
        )
}