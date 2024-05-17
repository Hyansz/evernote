import { useRouter } from "next/router";
import { useState } from "react";

export default function Handler() {
    const [inputValueTitle, setInputValueTitle] = useState("");
    const [inputValueContain, setInputValueContain] = useState("");
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`/api/insertData`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title: inputValueTitle,
                contain: inputValueContain,
            }),
        })
            .then((response) => {
                if (!response) {
                    throw new Error("Gagal menambah data");
                }
                return response.json();
            })
            .then((json) => {
                console.log(json);
                alert("Data berhasil ditambah");
                router.push("/");
            })
            .catch((err) => {
                console.error("Error saat menambah data", err.message);
                alert("EROR");
            });
    };

    const handleChangeTitle = (event) => {
        setInputValueTitle(event.target.value);
    };

    const handleChangeContain = (event) => {
        setInputValueContain(event.target.value);
    };

    return (
        <div className="w-11/12 m-auto">
            <h1 className="text-center p-4 font-bold">Tambah Data</h1>

            <form onSubmit={handleSubmit} className="bg-green-100 w-10/12 m-auto rounded-xl border-2 border-green-400 p-2">
                <div className="flex justify-around p-2">
                    <div>
                        Title: <input type="text" className=" border-2 rounded-lg border-green-400 my-1 px-2" onChange={handleChangeTitle}></input>{" "}
                    </div>
                    <div>
                        Contain: <input type="text" className=" border-2 rounded-lg border-green-400 my-1 px-2" onChange={handleChangeContain}></input>{" "}
                    </div>
                </div>
                <button type="submit" className="w-full m-auto flex bg-green-400 justify-center mt-1 p-2 rounded-lg text-white font-bold">Add Data</button>
            </form>
        </div>
    );
}
