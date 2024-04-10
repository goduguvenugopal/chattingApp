import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'

const Main = () => {

    const [name, setName] = useState('');
    const [text, setText] = useState(" ");
    const [pop, setPop] = useState(false);
    const [pop1, setPop1] = useState(false);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([])
    const [login, setLogin] = useState(true)
    const [password, setPassword] = useState('')
    // get data method 
    const getFunc = async () => {
        setLoader(true)
        try {
            const response = await axios.get("https://vkzomato-server.onrender.com/employees/get-user")
            setData(response.data)

            setLoader(false)
        }
        catch (error) {
            alert('Refresh again or Check internet Connection')
            console.log(error)

        }

    }

    // post data method 
    const formFunc = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://vkzomato-server.onrender.com/employees/add-user", { text });
            console.log(response.data);
            setText("")
            setPop(true)
            getFunc()
            setTimeout(() => {
                setPop(false)
            }, 3000);
        } catch (error) {
            alert('Send again or Check internet Connection')
            setTimeout(() => {
                setPop1(false)
            }, 3000);
            setPop1(true)

            console.error(error);
        }
    };

    useEffect(() => {
        const text1 = localStorage.getItem("text");

        if (text1) {
            const parsedText = JSON.parse(text1);
            setName(parsedText.name)
            setPassword(parsedText.password)
            setText(`${parsedText.name} : `);
        }
    }, [data])

    const loginFunc = (e) => {
        e.preventDefault()
        localStorage.setItem("text", JSON.stringify({ name: name , password : password }))

         
        const defaultPass = "asdfgh" 
        if(password === defaultPass){
            setLogin(false)
        }
        else{
            alert('You Have Entered Wrong code')
        }
    }


    useEffect(() => {
        console.log(formFunc)
        getFunc()
    }, [])
    return (
        <>
            {login ? <div className='logincard'>

                <form onSubmit={loginFunc} className='text-cente' id='login-cont'>
                    <h4 className='mb-3 text-dark'>Welcome To Chatting App</h4><hr/>
                    <h5 className=''>Name</h5>
                    <input placeholder='Enter Your Name' required value={name} type='text' onChange={(e) => setName(e.target.value)} className='login-text' /><br />
                    <h5 className=''>Password</h5>
                   <input type='password' name='password' placeholder='Enter Code' value={password} required maxLength="6" onChange={(e)=>setPassword(e.target.value)} className='login-text'/><br/>
                    <button type='submit' className='btn bg-primary text-white'>Log in</button>
                </form>
            </div> : ""}

            <div className={login ? " " : "fixed container-fluid "} id='top-card'>
                <h4 className='text-center text-white mt-4'>Chatting App</h4>

                <div className='' style={{ height: '5rem' }}>
                    <div className='mt-3 chatcard'>

                        <form onSubmit={formFunc} className='d-flex ' style={{ marginRight: '1rem' }}>
                            <input
                                required
                                type='text'
                                placeholder='Send Message'
                                className=' text-card'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <button type='submit' className='text-white fw-bold btn bg-primary ' style={{ height: "2.8rem", marginTop: '1px' }}>Send</button>
                        </form>


                    </div>
                    {pop && <h6 className='text-center text-white mt-2'>Message sent</h6>}
                    {pop1 && <h6 className='text-center text-white mt-2'>Message Not sent</h6>}


                </div>



            </div>
            <button id='refresh' onClick={getFunc} className='btn bg-primary text-white'>Refresh</button>


            <div className=' chatlist '>

                {loader ? (<div className=' bg-white  d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100vw' }}><div class=" spinner-border text-primary" role="status">
                    <span class="visually-hidden ">Loading...</span>
                </div></div>) : <ul className='container mt-5 ul-card ' >


                    {data.map((item, index) => (

                        <li className='list-text' key={index}>{item.text}</li>

                    ))}

                </ul>}
            </div>
        </>
    );
};

export default Main;
