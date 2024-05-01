import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'

const Main = () => {
    const [fav, setFav] = useState(true);
    const [del, setDel] = useState(false);
    const [dark, setDark] = useState(false);
    const [name, setName] = useState('');
    const [text, setText] = useState("");
    const [pop, setPop] = useState(false);
    const [pop1, setPop1] = useState(false);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([])
    const [login, setLogin] = useState(true)
    const [password, setPassword] = useState('')
    const [favor, setFavor] = useState([])
    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState("")
    const [image, setImage] = useState(null)

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



    const changeFunc = (event) =>{
        setImage(event.target.files[0])
    }

    const formData = new FormData()
    formData.append("image" , image)

    

     
  

    // post data method 
    const formFunc = async (e) => {
        e.preventDefault();

        try {
            await axios.post("https://vkzomato-server.onrender.com/employees/add-user", {text});
          
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


        try{
            await axios.post("https://image-server-hvo6.onrender.com/upload", formData , {
            headers : { "Content-Type" : "multipart/form-data"}
            })
        }catch(error){
            console.log(error)
            alert("try again image Has Not Sent")
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

    //    deletebyiduser medthod 
    const delByIdFunc = async (itemId) => {


        if (confirm('Confirm To Delete The Chat')) {
            try {


                const response = await axios.delete(`https://vkzomato-server.onrender.com/employees/deluserbyid/${itemId}`)
                if (response.status === 200) {
                    setData(data.filter(item => item._id !== itemId))

                }
            }
            catch (error) {
                console.log(error)
                alert('Try again or Check internet Connection')
            }
        }


    }

    const privacyFunc = (itemId) => {
        delByIdFunc(itemId)
    }

    // localStorage function 
    useEffect(() => {

        const text1 = localStorage.getItem("text");

        if (text1) {
            const parsedText = JSON.parse(text1);
            setName(parsedText.name)
            setPassword(parsedText.password)
            setEdit(`${parsedText.name} : `)
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

    const favFunc = () => {
        setFav(!fav)
    }



    // getuserbyid function
    const getUserById = async (userid) => {

        try {
            const response = await axios.get(`https://vkzomato-server.onrender.com/employees/getuserbyid/${userid}`)

            setFavor(response.data)
            console.log(response.data)

            alert("This Message Added In Favorite Messages")

        }
        catch (error) {
            console.log(error)
        }


    }

    // updateuserbyid function 






    const updateById = async (update) => {

        try {
            const response = await axios.put(`https://vkzomato-server.onrender.com/employees/updateuserbyid/${update}`, { text: edit })
            setModal(false)

            getFunc()
            console.log(response.data)

        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {

        getFunc()
    }, [])


    return (
        <>
            {login ? <div className='logincard'>

                <form onSubmit={loginFunc} className='text-cente' id='login-cont'>
                    <h4 className='mb-3 text-dark'>Welcome To Chatting App</h4><hr className='text-dark' />
                    <h5 className='text-dark'>Name</h5>
                    <input placeholder='Enter Your Name' required value={name} type='text' onChange={(e) => setName(e.target.value)} className='login-text' /><br />
                    <h5 className='text-dark'>Password</h5>
                    <input type='password' name='password' placeholder='Enter Code' value={password} required maxLength="6" onChange={(e) => setPassword(e.target.value)} className='login-text' /><br />
                    {/* <h5 className='text-dark'>Privacy code</h5>
                    <input type='password' name='password' placeholder='Create Enter Code' value={priKey} required maxLength="4" onChange={(e) => setPriKey(e.target.value)} className='login-text' /><br /> */}

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

                            <div className='imgFile'>
                                <label htmlFor="file"><span class="material-symbols-outlined text-dark">
                                    photo_camera
                                </span></label>
                                <input type='file' accept='image/*' id='file' className='fileInput'  onChange={changeFunc} />
                            </div>


                            <button type='submit' className='text-white fw-bold btn bg-primary ' style={{ height: "2.8rem", marginTop: '1px' }}>Send</button>
                        </form>


                    </div>
                    {pop && <h6 className='text-center text-white mt-2'>Message sent</h6>}
                    {pop1 && <h6 className='text-center text-white mt-2'>Message Not sent</h6>}


                </div>



            </div>

            <div className='fav-icon-cart' data-bs-toggle="modal" data-bs-target="#exampleModal">
                <span className="material-symbols-outlined fav-icon">
                    favorite
                </span>
            </div>

            <>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="d-flex align-items-center modal-title text-dark" id="exampleModalLabel">
                                    <span style={{ marginRight: '3px' }} className=" material-symbols-outlined fav-icon">
                                        favorite
                                    </span>  Favorite Messages
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body bg-dark">

                                {loader ? (<div className=' bg-white  d-flex justify-content-center align-items-center' style={{ height: '60vh' }} >
                                    <div className=" spinner-border text-primary" role="status">
                                        <span className="visually-hidden ">Loading...</span>
                                    </div></div>) : <ul className='container mt-5 ul-card ' >
                                    {favor.length ? (
                                        favor.map((item, index) => (<>
                                            <div className="favdelthumb-card">
                                                {fav ? "" : <div className="delfav-card">

                                                    <span className="material-symbols-outlined thumb-icon">
                                                        thumb_up
                                                    </span>

                                                    <span style={{ cursor: 'pointer' }} onClick={() => {
                                                        console.log(item)
                                                        privacyFunc(item._id)
                                                    }} className="material-symbols-outlined del-icon">
                                                        delete
                                                    </span>
                                                </div>}
                                            </div>

                                            <li onClick={favFunc} className='list-text' key={index}>{index + 1}. {item.text}

                                            </li>
                                            <h4 className='time'>{item.createdAt}</h4>
                                        </>))
                                    ) : (
                                        <div style={{ height: "50vh" }} className='d-flex justify-content-center align-items-center  mt-5 fs-4'>No Favorite Messages</div>
                                    )}


                                </ul>}

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            <button id='refresh' onClick={getFunc} className='btn bg-primary text-white'>Refresh</button>

            <div className='theme-card'>
                {dark ? <span onClick={themefunc1} className="material-symbols-outlined">
                    wb_sunny
                </span> : <span onClick={themefunc2} className="material-symbols-outlined">
                    dark_mode
                </span>}

            </div>

            <div className='del-card'>
                {del ? <button className="text-white btn bg-primary" type="button" disabled>
                    <span style={{ marginRight: '5px' }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Deleting...
                </button> : <button ton className='text-white btn bg-primary' onClick={alertFunc}>Delete</button>
                }


            </div>

            <div className=' chatlist '>

                {loader ? (<div className=' bg-white  d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100vw' }}>
                    <div className=" spinner-border text-primary" role="status">
                        <span className="visually-hidden ">Loading...</span>
                    </div></div>) : <ul className='container mt-5 ul-card ' >
                    {data.length ? (
                        data.map((item, index) => (<>
                            <div className="favdelthumb-card">
                                {fav ? "" : <div className="delfav-card">
                                    <span onClick={() => getUserById(item._id)} className="material-symbols-outlined fav-icon">
                                        favorite
                                    </span>
                                    <span onClick={() => setModal(true)} class="material-symbols-outlined edit-icon"  >
                                        edit
                                    </span>
                                    <span className="material-symbols-outlined thumb-icon">
                                        thumb_up
                                    </span>
                                    <span style={{ cursor: 'pointer' }} onClick={() => privacyFunc(item._id)
                                    } className="material-symbols-outlined del-icon">
                                        delete
                                    </span>
                                </div>}
                            </div>

                            {/* Modal  */}

                            {modal ? <div className='form-modal'>
                                <div className='container form-modal-card'>
                                    <h5 className=' d-flex align-items-center'> <span class="material-symbols-outlined edit-icon text-white" style={{ marginRight: "3px" }}>
                                        edit
                                    </span>Edit</h5>
                                    <hr className='text-white' />
                                    {/* <input

                                        type="text"
                                        name="edit"
                                        placeholder="Edit Message"

                                        value={upUser.text} className='form-control mb-3'

                                    /> */}
                                    <input
                                        style={{ textTransform: 'capitalize' }}
                                        className='form-control'
                                        type="text"
                                        value={edit}

                                        onChange={(e) => setEdit(e.target.value)}
                                        placeholder="Edit Message"


                                    />
                                    <hr className='text-white' />
                                    <div className="mt-2 d-flex justify-content-end">
                                        <button style={{ marginRight: "7px" }} className="btn bg-white" onClick={() => setModal(false)}>
                                            Close
                                        </button>

                                        <button className="btn btn-primary" onClick={() => { updateById(item._id) }}>
                                            Send
                                        </button>

                                    </div>
                                </div>
                            </div> : ""}


                            <li onClick={favFunc} className='list-text' key={index}>{index + 1}. {item.text}

                            </li>
                            <h4 className='time'>{item.createdAt}</h4>
                        </>))
                    ) : (
                        <div style={{ height: "50vh" }} className='d-flex justify-content-center align-items-center  mt-5 fs-4'>'Oops' Chat Cleared</div>
                    )}


                </ul>}
            </div>
        </>
    );
};

export default Main;
