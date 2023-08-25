import { useRef , useEffect, useState} from "react"
import axios from "axios"
import config from "../../../config"

export default ({ fn, getAll }) => {
    const [students, setStudents] = useState([])
    let inp1 = useRef(null)
    let inp2 = useRef(null)
    let inp3 = useRef(null)
    let inp4 = useRef(null)
    let inp5 = useRef(null)
    let inp6 = useRef(null)
    let inp7 = useRef(null)

    const checkInp = async ()=>{
        if(inp1.current.value === "" || inp2.current.value === "" || inp3.current.value === "" || inp4.current.value === "" || inp5.current.value === "" || inp6.current.value === "" || inp7.current.value === ""){
             alert("All fields are required")
        }else{
            let user ={
                firstName: inp1.current.value,
                lastName: inp2.current.value,
                email: inp3.current.value,
                phone: +inp4.current.value,
                password: inp5.current.value,
                parentsPhone: {
                    mother: +inp6.current.value,
                    father: +inp7.current.value,
                },
                role: "student"
            }
            let axiosConfig ={
                headers: {
                    'Content-Type': 'application/json',
                    authorization: window.localStorage.getItem('token'),

                  }
            }
           let res= await axios.post(`${config.backApi}/teacher/student`, user, axiosConfig)
        }
        // data()
        fn()
        getAll()
        inp1.current.value = ""
        inp2.current.value = ""
        inp3.current.value = ""
        inp4.current.value = ""
        inp5.current.value = ""
        inp6.current.value = ""
        inp7.current.value = ""
    }

    useEffect(()=>{
        data()
    }, [])

    async function data() {
        let tokenDate = window.localStorage.getItem('tokenDate')
        if(new Date(tokenDate) < new Date() )
        {
            window.location.replace('/')
        }else{
        const DATA = await axios(`${config.backApi}/teacher/getStudents`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: window.localStorage.getItem('token'),
            }
        })
        if (DATA.data.message == "Token wrong") {
            window.location.replace('/')
        }else if (DATA.data.message == "Token is not defined") {
            window.location.replace('/')
        }else{
            setStudents(DATA.data.data)
        }
    }
    }
    return (
        <div tabIndex="-1" aria-modal="true" role="dialog"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex">
            <div className="relative w-10/12 max-h-full">
                {/* <!-- Modal content --> */}
                <div className="w-full relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" onClick={fn}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="w-full px-6 py-6 lg:px-8 flex flex-col ">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Post</h3>
                        <form className="flex items-center gap-10 flex-wrap">
                            <label htmlFor="simple-search" className="sr-only">Ism</label>
                    <div className="w-full px-6 py-6 lg:px-8 flex flex-row">
                            <div className="w-full">
                                <input ref={inp1} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" required />
                            </div>
                            <div className="w-full">
                                <input ref={inp2} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" required />
                            </div>
                            <div className="w-full">
                                <input ref={inp3} type="email" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
                            </div>
                        </div>

                        <div className="w-full px-6 py-6 lg:px-8 flex flex-row">
                            <div className="w-full">
                                <input ref={inp4} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" required />
                            </div>
                            <div className="w-full">
                                <input ref={inp5} type="password" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                            </div>
                            <div className="w-full">
                                <input ref={inp6} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mother's phone" required />
                            </div>
                            <div className="w-full">
                                <input ref={inp7} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Father's phone" required />
                            </div>
                        </div>
                        <button onClick={checkInp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}