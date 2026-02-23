import {baseURL} from './config'


export const checklogin = async () => {
    try {
        const response = await fetch(`${baseURL}/checkloggin`, {credentials: 'include'});
        const data = await response.json()
        return data
    } catch (err) {
        throw err
    }
};

export const postLogin = async (username, password) => {
    try {
        const email = username.toLowerCase()
        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email, 
                password: password
            }),
        })

        if (response.ok) {
            const userData = await response.json();
            return userData
        } else {
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message}`);
            return {user: null}
        }
    } catch (err) {
        console.error("Network error:", err);
        return {user: null}
    }
};

export const PostSignUP = async (email, password, FirstName, LastName, phone, dob) => {
    try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!emailRegex.test(email)){
            return {user: null, message: "invalid email"}
        }
        const userExistsResponse = await fetch(`${baseURL}/users/check/${email}`)
        const userExists = await userExistsResponse.json()
        if (userExists.user){
            return {user: null, message: "Email Already Exists"}
        }
        if (password.length < 9 || !passwordRegex.test(password)) {
            return {user: null, message: "Password must be greater than 8 characters include a number and uppercase letter"}
        }
        if (!/^[A-Za-z]+$/.test(FirstName) || !/^[A-Za-z]+$/.test(LastName)){
            console.log(FirstName, LastName)
            return {user: null, message: "Name must only inlcude letters"}
        }
        if (!/^\+[1-9]\d{1,14}$/.test(phone)) {
            return {user: null, message: "Enter International phone number example +14155552671"}
        }
        const response = await fetch(`${baseURL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email, 
                password: password,
                first_name: FirstName,
                last_name: LastName,
                phone: phone,
                DOB: dob,
            }),
        })

        if (response.ok) {
            const userData = await response.json();
            userData.user = true
            return userData
        } else {
            const errorData = await response.json();
            console.log(`Sign failed: ${errorData.message}`);
            return {user: null}
        }
    } catch (err) {
        console.error("Network error:", err);
        console.log("fail")
        return {user: null}
    }
};

export const getCurrentUser = async () => {
    try {
        const Response = await fetch(`${baseURL}/returnUser`, {
            credentials: 'include'
        })
        const Data = await Response.json()
        return Data
    } catch (e) {
        throw (e)
    }
};

export const indexUsersOrders = async () => {
    try {
        const response = await fetch(`${baseURL}/usersOrders`, {
            credentials: 'include'
        });
        const data = await response.json()
        return data
    } catch (err) {
        throw (err)
    }
};