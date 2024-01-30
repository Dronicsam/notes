import api from "../api.js"
import { useState } from "react"

export default function User_check(token) {
    const [user_data, setUserData] = useState([]);
    api.get("/users/me", {
        headers: {
            'Authorization': 'Bearer ' + token 
        }}, )
    .then(function (response) {
        setUserData(response.data)
        return user_data
    }).catch(function (error) {
        console.log(error);
    });

}