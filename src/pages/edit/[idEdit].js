import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const [dataDetail, setDetail] = useState();

    const { idEdit } = router.query;

    useEffect(() => {
        if (!idEdit) return;

        fetch(`/api/getDataDetail?id=${idEdit}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDetail(data.data ? data.data : null);
                console.log(data.data);
            });
    }, [idEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const contain = event.target.contain.value;
        const upload_at = new Date();

        fetch(`/api/updateData`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                contain: contain,
                upload_at: upload_at,
                id: idEdit,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                router.push(`/`);
            })
            .catch((data) => {
                alert("error: ", data.message);
            });
    };

    return (
        <div className="w-10/12 m-auto">
            <p className="p-3 text-center">Halaman Edit</p>
            {dataDetail === undefined && <p className="p-3 text-center">Sabar Om...</p>}
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail && (
                <div className="bg-slate-100 p-2 pt-3 rounded-lg border-2 border-blue-400">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-around">
                            <div>
                                <label htmlFor="title">Title: </label>
                                <input
                                    name="title"
                                    className="pl-2 border-2 border-blue-400 rounded-lg"
                                    defaultValue={dataDetail.title}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="title">Contain: </label>
                                <input
                                    name="contain"
                                    className="pl-2 border-2 border-blue-400 rounded-lg"
                                    defaultValue={dataDetail.contain}
                                ></input>
                            </div>
                        </div>
                        <div className="flex justify-around gap-2">
                            <div className="bg-blue-400 text-white py-2 px-3 w-full rounded-lg text-center mt-5">
                                <button type="submit">Update Data</button>
                            </div>
                            <div className="bg-red-400 text-white py-2 px-3 w-full rounded-lg text-center mt-5">
                                <button
                                    onClick={() => {
                                        router.push(`/`);
                                    }}
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
