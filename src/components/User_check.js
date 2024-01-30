import api from "../api.js"
import { useState, useEffect } from "react"

export default function User_check(token) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
        }, []);
    const getData = (props="ASC") => {
        api.get("/users/me", {
            headers: {
                'Authorization': 'Bearer ' + token 
            }}, )
        .then(
            (res) =>  setData(res.data)
            )
        .catch(
            (error) => setData(error["message"])
        )
    }
}
