// Подключение основных модулей

import { ChakraProvider } from '@chakra-ui/react'

import { Text, Center, Box } from "@chakra-ui/react"
import { Highlight } from '@chakra-ui/react'

import { HamburgerIcon } from "@chakra-ui/icons"
import { Menu, MenuButton, MenuList, MenuItem, Link, IconButton } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react";

import theme from "./Font.jsx"

import Notes from "./Get_notes.jsx"


export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <Box display={"flexbox"}>
                <Menu>
                    <MenuButton mt={"1rem"} ml={"1rem"} as={ IconButton } icon={<HamburgerIcon />} variant={"outline"}></MenuButton>
                    <MenuList>
                        <Link href={"/"} _hover={{ textDecoration: "none" }}>
                            <MenuItem>
                                <Highlight query='Все заметки' styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100'}}>
                                    Все заметки
                                </Highlight>
                            </MenuItem>
                        </Link>
                        <Link href={"/note"} _hover={{ textDecoration: "none" }}>
                            <MenuItem>Написать заметку</MenuItem>
                        </Link>
                        <Link href={"login"} _hover={{ textDecoration: "none" }}>
                            <MenuItem>Войти</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
                <Link _hover={{ textDecoration: "none" }} href={"/note"}>
                    <Button mt={"1rem"} mr={"1rem"} float={"right"}>Новая заметка</Button>
                </Link>
            </Box>
            <Center>
                <Text fontSize={"4xl"}>
                    Главная
                </Text>
            </Center>
            
            <Box ml={"4rem"} mt={"2rem"}>
                <Text fontSize={"2xl"}>Все заметки</Text>
                <Box mt={"1rem"} display={"flex"} flex-direction={"row"}>
                    <Notes display={"flex"} />
                </Box>
            </Box>
        </ChakraProvider>
        )
}