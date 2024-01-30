import { useForm } from 'react-hook-form'

import { Input, Textarea } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react"

import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import api from "../api.js"
import { Tooltip } from '@chakra-ui/react'

import User_check from "./User_check.js";
import {v4 as uuidv4} from 'uuid';

export default function Hookform() {
    let UserIn = localStorage.getItem("access_token")
    if (!UserIn) {
        UserIn = false;
        var label_text = "Публикация заметок доступна только пользователям с аккаунтом"
    }
    
    var user_data = User_check(UserIn)
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
                const note_uuid = uuidv4()
                let datalog = {
                    "user_id": user_data.user_id,
                    "note_id": note_uuid,
                    "note_name": data.note_name,
                    "text": String(data.text),
                    "date": String(data.date),
                    "author": user_data.username,
                    "was_checked": false
                }
                console.log(datalog)
                api.post("/upload_note", {
                    "user_id": datalog.user_id,
                    "note_id": datalog.note_id,
                    "note_name": datalog.note_name,
                    "text": datalog.text,
                    "date": datalog.date,
                    "author": datalog.author,
                    "was_checked": datalog.was_checked
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <FormLabel>Название</FormLabel>
                <Input
                    isRequired={true}
                    id={"note_name"}
                    placeholder={"Моя заметка"}
                    {...register('note_name', {
                        required: 'Это поле обязательно!'
                    })}
                />
                <FormLabel mt={"1rem"}>Текст заметки</FormLabel>
                <Textarea
                    isRequired={true}
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
                    width={"min"}
                    isRequired={true}
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
            <Tooltip label={label_text}>
                <Button isDisabled={!UserIn} mt={4} isLoading={isSubmitting} type={"submit"} _hover={{ bg: "green", color: "white"}}> Написать заметку </Button>
            </Tooltip>
        </form>
        )
}