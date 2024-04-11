import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'

const Main = () => {
    const [del, setDel] = useState(false);
    const [dark, setDark] = useState(false);
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
            await axios.post("https://vkzomato-server.onrender.com/employees/add-user", { text });

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

    //  delete data method 

    const deleteFunc = async () => {
        setDel(true)
        try {
            await axios.delete("https://vkzomato-server.onrender.com/employees/delete-user")

            setDel(false)
            getFunc()

        } catch (error) {
            console.log(error)
            alert('Try again or Check internet Connection')

        }
    }

    // localStorage function 
    useEffect(() => {
        const text1 = localStorage.getItem("text");

        if (text1) {
            const parsedText = JSON.parse(text1);
            setName(parsedText.name)
            setPassword(parsedText.password)
            setText(`${parsedText.name} : `);
        }
    }, [data])


    // login code 
    const loginFunc = (e) => {
        e.preventDefault()
        localStorage.setItem("text", JSON.stringify({ name: name, password: password }))


        const defaultPass = "asdfgh"
        if (password === defaultPass) {
            setLogin(false)
        }
        else {
            alert('You Have Entered Wrong code')
        }
    }
    //   theme change function 
    const themefunc1 = () => {
        document.body.style.backgroundColor = "white"
        document.body.style.color = "black"
        setDark(false)
    }
    const themefunc2 = () => {
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
        setDark(true)
    }
    // delete chat function 

    const alertFunc = () => {
        const promptData = prompt("Enter The Password to Delete Chat")
        const DelKey = "1862004"
        if (promptData === DelKey) {
            deleteFunc()
        }
        else {
            alert("You have Entered Wrong Password")
        }
    }


    useEffect(() => {

        getFunc()
    }, [])
    return (
        <>
            {login ? <div className='logincard'>

                <form onSubmit={loginFunc} className='text-cente' id='login-cont'>
                    <h4 className='mb-3 text-dark'>Welcome To Chatting App</h4><hr />
                    <h5 className='text-dark'>Name</h5>
                    <input placeholder='Enter Your Name' required value={name} type='text' onChange={(e) => setName(e.target.value)} className='login-text' /><br />
                    <h5 className='text-dark'>Password</h5>
                    <input type='password' name='password' placeholder='Enter Code' value={password} required maxLength="6" onChange={(e) => setPassword(e.target.value)} className='login-text' /><br />
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

            <div className='theme-card'>
                {dark ? <span onClick={themefunc1} class="material-symbols-outlined">
                    wb_sunny
                </span> : <span onClick={themefunc2} class="material-symbols-outlined">
                    dark_mode
                </span>}

            </div>

            <div className='del-card'>
                {del ? <button class="text-white btn bg-primary" type="button" disabled>
                    <span style={{ marginRight: '5px' }} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Deleting...
                </button> : <button ton className='text-white btn bg-primary' onClick={alertFunc}>Delete</button>
                }


            </div>

            <div className=' chatlist '>

                {loader ? (<div className=' bg-white  d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100vw' }}><div class=" spinner-border text-primary" role="status">
                    <span class="visually-hidden ">Loading...</span>
                </div></div>) : <ul className='container mt-5 ul-card ' >
                    {data.length ? (
                        data.map((item, index) => (
                            <li   className='list-text' key={index}>{item.text} <span style={{cursor:'pointer'}} class="material-symbols-outlined">
                            delete
                            </span></li>
                        ))
                    ) : (
                        <div style={{ height: "50vh" }} className='d-flex justify-content-center align-items-center  mt-5 fs-4'>'Oops' Chat Cleared</div>
                    )}


                </ul>}
            </div>
        </>
    );
};

export default Main;
