import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Handler() {
    const router = useRouter()
    const {idDetail} = router.query
    const [showData,setShowData] = useState();

    useEffect(() => {
        if(!idDetail) return;
        fetch(`/api/getDataDetail?id=${idDetail}`)
        .then((res) => res.json())
        .then((data) => {
            setShowData(data.data)
        })
    },[idDetail])

    return(
        <div className="w-10/12 m-auto text-center">
            <p className="p-3">Ini ID : {idDetail}</p>
            {showData === undefined && <p className="p-3 text-center">Sabar Om...</p>}
            {showData && (
                <div className="border-2 border-orange-400 rounded-xl p-2">
                    <div className="text-left">
                        <div className="border-b-2 border-orange-400">Id: {idDetail}</div>
                        <div className="border-b-2 border-orange-400">Title: {showData.title}</div>
                        <div className="border-b-2 border-orange-400">Contain: {showData.contain}</div>
                        <div className="border-b-2 border-orange-400">Upload_at: {showData.upload_at}</div>
                        <div className="border-b-2 border-orange-400">Created_at: {showData.created_at}</div>
                    </div>
                    <button onClick={() => {
                        router.push('/')
                    }} className="bg-red-400 w-full p-2 text-white font-bold rounded-lg mt-2">Kembali</button>
                </div>
            )}
        </div>
    )
}