import api from "../api.js";
import * as React from 'react';
import { useEffect, useState } from "react";
import "../style/style.css"

export default function GetNotes() {
    const [note, setNotes] = useState([]);
    useEffect(() => {
        getNotes();
        }, []);
    const getNotes = (props="ASC") => {
        api.get("/get_notes").then(
            (res) =>  setNotes(res.data)
            )
    }
    console.log(note)
    return (
        <ul>
            {note.map((item) => (
                <li key={item.user_id}>
                    <br/>Автор - {item.author}
                    <br/>Название: {item.note_name}
                    <br/>Текст:
                    <br/>{item.text}
                    <br/>Дата: {item.date}
                    <br/>Проверена? - {item.was_checked.toString()}
                </li>
                ))}
        </ul>
        );}