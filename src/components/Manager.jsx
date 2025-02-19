import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const [inf, setinf] = useState([])
    const ref = useRef()
    const passinput = useRef()
    const userinput = useRef()
    const siteinput = useRef()
    const [passvisible, setpassvisible] = useState(false)


    useEffect(() => {
        const storedPasswords = localStorage.getItem('passwords');
        if (storedPasswords) {
            setinf(JSON.parse(storedPasswords));  // Set passwords to state
        }
    }, []);

    const { register, handleSubmit, reset, setValue, formState: { errors }
    } = useForm();


    const Pass = () => {
        if (ref.current.innerHTML == `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.874 3.222-4.372 7-9.542 7-5.17 0-8.668-3.778-9.542-7z"></path>
</svg>
`) {
            ref.current.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`

        } else {
            ref.current.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.874 3.222-4.372 7-9.542 7-5.17 0-8.668-3.778-9.542-7z" />
</svg>
`
        }
        console.log(ref.current.innerHTML)
        setpassvisible(!passvisible)
    }

    const onSubmit = (data) => {
        // Use the current input values if the fields are left unchanged
        if (data.url != "" || data.username != "" || data.password != "") {
            const newItem = {
                site: data.url || siteinput.current.value,
                username: data.username || userinput.current.value,
                password: data.password || passinput.current.value,
                index: uuidv4(),
            };

            const updatedInf = [...inf, newItem];
            setinf(updatedInf);  // Update state

            // Store updated data in localStorage
            localStorage.setItem('passwords', JSON.stringify(updatedInf));

            // Reset the form
            reset();
            toast.success('Password saved successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handledelete = (e, c = false) => {
        // Get the array of passwords from localStorage
        if (!c) {
            if (confirm("Do you want to delete ?")) {
                const info = JSON.parse(localStorage.getItem("passwords")) || [];

                // Find and remove the item with a matching index
                const updatedInfo = info.filter((item) => item.index != e.target.id);

                // Update localStorage
                localStorage.setItem("passwords", JSON.stringify(updatedInfo));
                setinf(updatedInfo);
                toast.success('Deleted successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } else {
            const info = JSON.parse(localStorage.getItem("passwords")) || [];

            // Find and remove the item with a matching index
            const updatedInfo = info.filter((item) => item.index != e.target.id);

            // Update localStorage
            localStorage.setItem("passwords", JSON.stringify(updatedInfo));
            setinf(updatedInfo);

        }

    };

    const handleedit = (e) => {
        const info = JSON.parse(localStorage.getItem("passwords")) || [];
        const itemToEdit = info.find((item) => item.index === e.target.id);

        if (itemToEdit) {
            // Use setValue to populate form fields
            setValue("url", itemToEdit.site);
            setValue("username", itemToEdit.username);
            setValue("password", itemToEdit.password);
            handledelete(e, true)
        } else {
            console.error("No matching password found to edit.");
        }
    };
    const handlecopy = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className=" p-3 container min-h-[88.2vh] m-auto">
                <div className='flex flex-col gap-2 justify-center items-center w-[100%]'>
                    <div className="logo text-3xl font-bold  text-green-500">
                        &lt;<span className="text-black">Pass</span><span >OP</span>/&gt;
                    </div>
                    <div className='text-lg font-sans font-semibold'>Your Own Password Manager</div>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] flex flex-col  gap-3'>
                        <input {...register("url")} ref={(e) => { register("url").ref(e); siteinput.current = e; }} className='w-[100%] h-[35px] my-2 border border-[#bcffbc] outline-none focus:border-[#225322] rounded-full pl-3 bg-[#f9fff9]' type="url" placeholder='Enter Website URL' />
                        <div className='relative  flex sm:flex-row flex-col  justify-between gap-4 '>
                            <input {...register("username")} ref={(e) => { register("username").ref(e); userinput.current = e; }} className='h-[35px] w-100% sm:w-[63%] border border-[#bcffbc] outline-none focus:border-[#225322] rounded-full pl-3 bg-[#f9fff9]' type="text" placeholder='Enter UserName' />
                            <input {...register("password")} ref={(e) => { register("password").ref(e); passinput.current = e; }} className='h-[35px] border w-100% sm:w-[35%] border-[#bcffbc] outline-none focus:border-[#225322] rounded-full pl-3 bg-[#f9fff9]' type={passvisible ? "text" : "password"} placeholder='Enter Password' />
                            <div ref={ref} onClick={Pass} className='cursor-pointer absolute sm:right-2 sm:top-1 right-[7px] top-[54px] w-[25px] h-[25px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>

                        </div>
                        <button type="submit" className='px-3 my-3 max-w-[100px] m-auto font-semibold text-base flex items-center gap-2 bg-green-300 p-[6px] rounded-full border border-1'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>
                            Save
                        </button>
                    </form>
                    {(() => {
                        const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || []; // Parse localStorage data or fallback to an empty array\
                        return storedPasswords.length === 0 ? (
                            <div>No Passwords to Show</div>
                        ) : (<div className='w-[90%] font-bold text-3xl'>
                            <div className="text-3xl w-[100%] m-auto font-bold">Your Passwords</div>
                            <div className="mt-2 w-[100%] h-[60%]  m-auto">
                                <div className="header h-[40px] bg-[#002c00] sm:text-base items-center flex text-xs   font-semibold text-white">
                                    <div className="w-[40%]  sm:w-[52%] text-center h-full flex justify-center items-center border-r ">Site</div>
                                    <div className="w-[20%] sm:w-[16%]  text-center h-full flex justify-center items-center border-r ">Username</div>
                                    <div className="w-[20%] sm:w-[16%]  text-center h-full flex justify-center items-center border-r ">Password</div>
                                    <div className="w-[20%] sm:w-[16%]  text-center ">Actions</div>
                                </div>
                                <ul>
                                    {storedPasswords.map((item, id) => (
                                        <li
                                            key={id} // Use `id` as the unique key
                                            className="header h-[40px] bg-[#bcffbc] text-xs sm:text-base items-center flex  font-semibold text-[#333333]"
                                        >
                                            <div className="w-[40%]  sm:w-[52%] border-r border-green-900 h-full flex items-center ">
                                                <a className='text-sm  px-2 whitespace-nowrap overflow-x-hidden text-ellipsis' href={item.site} target="_blank" rel="noopener noreferrer">
                                                    {item.site}
                                                </a>
                                            </div>
                                            <div className="w-[20%] sm:w-[16%]  border-r border-green-900 h-full  cursor-pointer text-sm flex justify-center items-center gap-1 text-center ">root<span><img src="assets/copy.svg" onClick={() => { handlecopy(item.username) }} alt="" /></span></div>
                                            <div className="w-[20%] sm:w-[16%]  border-r border-green-900 h-full  cursor-pointer text-sm flex justify-center items-center gap-1 text-center ">admin <span><img src="assets/copy.svg" onClick={() => { handlecopy(item.password) }} alt="" /></span></div>
                                            <div className="w-[20%] sm:w-[16%]  flex justify-center items-center  text-sm text-center ">
                                                <span className='lg:scale-[0.85] sm:ml-2 ml-[3px] scale-75  cursor-pointer'><lord-icon src="https://cdn.lordicon.com/exymduqj.json" trigger="hover" id={item.index} onClick={handleedit}></lord-icon></span>
                                                <span className='lg:scale-[0.85] sm:ml-2 ml-[3px] scale-75  cursor-pointer'><lord-icon src="https://cdn.lordicon.com/hwjcdycb.json" trigger="hover" id={item.index} onClick={handledelete}></lord-icon></span>

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        );
                    })()}

                </div>
            </div>

        </>
    )
}

export default Manager
