// Подключение основных модулей

import { ChakraProvider } from '@chakra-ui/react'

import { Text, Center, Box } from "@chakra-ui/react"

import { Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Menu from "./Menu.jsx"

import theme from "./Font.jsx"

import Notes from "./Get_notes.jsx"


export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <Box display={"flexbox"}>
                
                <Menu />
                
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