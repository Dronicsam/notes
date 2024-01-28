import { useForm } from 'react-hook-form'

import { Input, Textarea } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react"

import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import api from "../api.js"



export default function Hookform() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const str_data = JSON.stringify(values, null)
                const data = JSON.parse(str_data)
                api.post("/upload_note", {
                    "user_id": getRandomInt(1, 999999),
                    "note_name": data.note_name,
                    "text": String(data.text),
                    "date": String(data.date),
                    "author": data.note_name,
                    "was_checked": true
                }).then(function (response) {
//                    const cur_res = response.data
//                    console.log(cur_res);
//                    if (cur_res == "User exists") {
//                        alert("Пользователь уже существует :(")
//                    }else {
                        window.alert("Заметка опубликована");
                        window.location.href='/';
                    
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
                <FormLabel>Название</FormLabel>
                <Input
                    id={"note_name"}
                    placeholder={"Моя заметка"}
                    {...register('note_name', {
                        required: 'Это поле обязательно!'
                    })}
                />
                <FormLabel mt={"1rem"}>Текст заметки</FormLabel>
                <Textarea
                    w="2xl" h="xs"
                    id={'text'}
                    placeholder='Текст вашей заметки будет написан тут :^)'
                    {...register('text', {
                        required: 'Это поле обязательно!',
                        minLength: { value: 2, message: 'Минимальная длина заметки - 2' },
                    })}
                
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel mt={"1rem"}>Дата</FormLabel>
                <Input
                    id={"date"}
                    type={"date"}
                    {...register('date', {
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} isLoading={isSubmitting} type={"submit"} _hover={{ bg: "green", color: "white"}}> Написать заметку </Button>
        </form>
        )
}