import { useForm } from 'react-hook-form'

import { Input } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react"

import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import api from "../api.js"



export default function RegisterHook() {
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
                api.post("/register_complete", {
                    "user_id": data.phonenumber-10,
                    "name": data.name,
                    "second_name": data.second_name,
                    "third_name": data.third_name,
                    "phonenumber": data.phonenumber,
                    "position": data.position
                }).then(function (response) {
                    const cur_res = response.data.detail
                    console.log(cur_res);
                    if (cur_res == "User exists") {
                        alert("Пользователь уже существует :(")
                    }else {
                        window.alert("Вы успешно зарегистрованы! Теперь вы можете войти в сервис.");
                        window.location.href='/login';
                    }
                }).catch(function (error) {
                    console.log(error);
                });
                resolve();``
            }, 1000)
        })
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <FormLabel>Фамилия</FormLabel>
                <Input
                    id={"second_name"}
                    placeholder={"Петров"}
                    {...register('second_name', {
                        required: 'Это поле обязательно!',
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormLabel mt={"1rem"}>Имя</FormLabel>
                <Input
                    id='name'
                    placeholder='Петр'
                    {...register('name', {
                        required: 'Это поле обязательно!',
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel mt={"1rem"}>Отчество</FormLabel>
                <Input
                    id={"third_name"}
                    placeholder={"Петрович"}
                    {...register('third_name', {
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel mt={"1rem"}>Номер телефона</FormLabel>
                <Input
                    type={"tel"}
                    id={"phone"}
                    placeholder={"8 999 555 33 22"}
                    {...register('phonenumber', {
                        required: 'Это поле обязательно!',
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel mt={"1rem"}>Должность</FormLabel>
                <Input
                    id={"spec"}
                    placeholder={"Инженер"}
                    {...register('position', {
                        required: 'Это поле обязательно!',
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} isLoading={isSubmitting} type={"submit"} _hover={{ bg: "green", color: "white"}}> Зарегистрироваться </Button>
        </form>
        )
}