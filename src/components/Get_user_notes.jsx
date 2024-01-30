import api from "../api.js";
import { useEffect, useState } from "react";
import "../style/style.css"

export default function GetUserNotes() {
    const [note, setNotes] = useState([]);
    let token = localStorage.getItem("access_token")
    useEffect(() => {
        getNotes();
        }, []);
    const getNotes = (props="ASC") => {
        api.get("/users/me/items/", {
            headers: {
                'Authorization': 'Bearer ' + token 
            }}, )
        .then(
            (res) =>  setNotes(res.data)
            )
    }
    
    return (
        <ul className={"flexed"}>
            {note.map((item) => (
                <li className={"list_el"} key={item.user_id}>
                    <br/>Название: {item.note_name}
                    <br/>Текст:
                    <br/>&emsp; {item.text}
                    <br/>Дата: {item.date}
                    <br/>Проверена? - {item.was_checked.toString()}
                </li>
                ))}
        </ul>
        );
}