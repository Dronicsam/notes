// Основные модули

import {ChakraProvider, FormControl, FormErrorMessage, FormLabel} from '@chakra-ui/react'

import { Center } from "@chakra-ui/react"
import { Highlight } from "@chakra-ui/react";

import { Input } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react"

import { HamburgerIcon } from "@chakra-ui/icons"
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Link } from "@chakra-ui/react"

import theme from "./Font.jsx"
import api from "../api.js"
import {useForm} from "react-hook-form";

export default function App() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const str_data = JSON.stringify(values, null)
                const data = JSON.parse(str_data)
                const form_data = new FormData()
                form_data.append("username", data.username)
                form_data.append("password", data.password)
                api.post("/token", {
                    "username": data.username,
                    "password": data.password
                },{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
                    window.alert("Вы успешно вошли в сервис!");
                    window.location.href='/';
                }).catch(function (error) {
                    console.log(error);
                    alert("Произошла ошибка")
                });
                resolve();
                }, 1000)
        })
    }
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
                        <MenuItem>
                            <Highlight query='Войти' styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100'}}>
                                Войти
                            </Highlight>
                        </MenuItem>
                    </Link>
                </MenuList>
            </Menu>
            <Center marginTop={"5rem"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel>Логин</FormLabel>
                        <Input
                            isRequired={true}
                            id={"username"}
                            placeholder={"Логин"}
                            {...register('username', {
                                required: 'Это поле обязательно!',
                                minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                            })}
                        />
                        <FormLabel mt={"0.5rem"}>Пароль</FormLabel>
                        <Input
                            isRequired={true}
                            id={"password"}
                            placeholder={"Пароль"}
                            {...register('password', {
                                required: 'Это поле обязательно!',
                                minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button mt={4} isLoading={isSubmitting} type={"submit"} _hover={{ bg: "green", color: "white"}}> Войти </Button>
                </form>
            </Center>
            <Center mt={"1rem"}>
                <Link href={"/register"}>
                    Нет учётной записи?
                </Link>
            </Center>
        </ChakraProvider>
        )
}