import React, { useState, useEffect } from 'react'
import axios from '../config/axios';

export default  (): boolean | null => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        axios.get("/auth/status").then(res => {
            if (res.status === 200) setIsLoggedIn(true);

        })
            .catch(err => {
                console.log(err);
                setIsLoggedIn(false)
            })
    }, [])

    return isLoggedIn
}