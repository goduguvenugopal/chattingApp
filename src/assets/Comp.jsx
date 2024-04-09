import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'

const Main = () => {
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [pop, setPop] = useState(false);
    const [pop1, setPop1] = useState(false);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([])
    const [login, setLogin] = useState(true)

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
            alert('not fetched')
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


    const loginFunc = (e) => {
        e.preventDefault()
        setUser(name)
        setLogin(false)
    }


    useEffect(()=>{
        console.log(formFunc)
        getFunc()
    },[])
    return (
        <>
            {login ? <div className='logincard'>
 
                <form onSubmit={loginFunc} className='text-center'>
                <h4 className='mb-3 text-white'>Welcome To Chatting App</h4>
                    <input placeholder='Enter Your Name' required value={name} type='text' onChange={(e) => setName(e.target.value)} className='login-text' /><br/>
                    <button type='submit' className='btn bg-primary text-white'>Log in</button>
                </form>
            </div> : ""}

            <div className={login ? " " : "fixed container-fluid"} id='top-card'>
                <h4 className='text-center text-white mt-4'>Chatting App</h4>
                <div className='' style={{ height: '6rem' }}>
                    <div className='mt-3 chatcard'>

                        <form onSubmit={formFunc} className='d-flex '>
                            <input
                                required
                                type='text'
                                placeholder='Send Message'
                                className=' text-card'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <button type='submit' className='text-white fw-bold btn bg-primary'>Send</button>
                        </form>


                    </div>
                    {pop && <h5 className='text-center text-white mt-3'>Message sent</h5>}
                    {pop1 && <h5 className='text-center text-danger mt-3'>Message Not sent</h5>}


                </div>
                <div className='text-center mt-2' style={{ width: '100vw' }}>

                    <button onClick={getFunc} className='btn bg-primary text-white'>Refresh</button>
                </div><hr className='text-white' />
                <h4 className='text-white' >Conversation</h4>

            </div>
            <div className='container chatlist '>

                {loader ? (<div className=' d-flex justify-content-center align-items-center' style={{ height: '20rem' }}><div class=" spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div></div>) : <ul className='mt-5'>


                    {data.map((item, index) => (

                        <li key={index}><b>{user}</b> : {item.text}</li>

                    ))}

                </ul>}
            </div>
        </>
    );
};

export default Main;
