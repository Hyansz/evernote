import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const [showAllData, setShowAllData] = useState();

    useEffect(() => {
        fetch(`/api/getData`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setShowAllData(data.data);
            })
            .catch((err) => {
                alert("ERORR");
            });
    }, []);

    const handleEdit = (id) => {
      router.push(`/api/updateData/${id}`)
    }

    const handleDelete = (id) => {
      if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        fetch(`/api/delData?id=${id}`, {
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
          router.reload();
        })
        .catch((err) => {
          alert("ERROR");
        })
      }
    }
    return (
        <div>
            <p className="text-center py-3">Halaman Depan</p>
            <button
                className="bg-green-400 px-3 py-1 rounded-xl text-white flex m-auto"
                onClick={() => {
                  router.push(`/add-data`);
                }}
                >
                Add Data
            </button>
            {showAllData === undefined && <p className="p-3 text-center">Sabar Om...</p>}
            <div>
                {showAllData &&
                    showAllData.map((data, index) => {
                        return (
                            <div key={index} className="w-11/12 m-auto flex justify-between bg-gray-200 p-3 rounded-lg my-3">
                                <div>
                                  {data.id}. {data.title}
                                </div>
                                <div>
                                  <button
                                    className="bg-blue-400 px-3 py-1 rounded-xl text-white mx-1"
                                      onClick={() => 
                                        router.push(`/edit/${data.id}`)
                                      }
                                  >
                                      Edit
                                  </button>
                                  <button
                                    className="bg-red-400 px-3 py-1 rounded-xl text-white mx-1"
                                      onClick={() =>
                                          handleDelete(data.id)
                                      }
                                  >
                                      Delete
                                  </button>
                                  <button
                                    className="bg-orange-400 px-3 py-1 rounded-xl text-white mx-1"
                                      onClick={() =>
                                          router.push(`/detail/${data.id}`)
                                      }
                                  >
                                      Detail
                                  </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
