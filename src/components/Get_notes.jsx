import api from "../api.js";
import { useEffect, useState } from "react";
import "../style/style.css"

export default function GetNotes() {
    const [note, setNotes] = useState([]);
    useEffect(() => {
        getNotes();
        }, []);
    const getNotes = (props="ASC") => {
        api.get("/get_notes")
        .then(
            (res) =>  setNotes(res.data)
            )
    }
    return (
        <ul className={"flexed"}>
            {note.map((item) => (
                <li className={"list_el"} key={item.user_id}>
                    <br/>Автор - {item.author}
                    <br/>Название: {item.note_name}
                    <br/>Текст:
                    <br/>&emsp; {item.text}
                    <br/>Дата: {item.date}
                    <br/>Проверена? - {item.was_checked.toString()}
                </li>
                ))}
        </ul>
        );}