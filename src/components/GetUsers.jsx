import api from "../api.js";
import { useEffect, useState } from "react";
import { ChakraProvider, UnorderedList, ListItem, Link } from "@chakra-ui/react"
import "../style/style.css"
export default function GetUsers() {
    const [user, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
        }, []);
    const getUsers = (props="DSC") => {
        api.get("/get_users")
        .then(
            (res) =>  setUsers(res.data)
            )
    }
    return (
        <ChakraProvider>
            <UnorderedList>
                {user.map((item) => (
                    <ListItem mr={"5rem"} padding={"1rem"} pt={"1rem"} minW={"200px"} maxW={"700px"}
                        key={item.user_id} border={"1px"} borderColor={"gray.300"} mb={"0.5rem"} rounded="md">
                        Аккаунт: {item.username}
                        <br/>Фамилия: {item.second_name}
                        <br/>Имя: {item.name}
                        <br/>Отчество: {item.third_name}
                        <Link href={item.phonenumber}>
                            <br/>Телефон: {String(item.phonenumber).slice(4)}
                        </Link>
                        <br/>Должность: {item.position}
                    </ListItem>
                    ) )}
            </UnorderedList>
        </ChakraProvider>
        )
}
        