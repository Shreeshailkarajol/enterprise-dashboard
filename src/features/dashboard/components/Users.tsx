import { useEffect, useState } from "react"
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { UserService } from "../services/user.service"


const Users = () => {
    const[page, setPage] = useState<number>(1)
    const[search, setSearch] = useState<string>('')
    const[debounceSearch, setDebounceSearch] = useState<string>('')

    const { data, isLoading, error, isError, isFetching } = useQuery({
        queryKey: ['fetch-users', page, debounceSearch],
        queryFn: () => {
            console.log("🔥 API CALL", {
                data,
                page,
                search,
                isLoading,
                isFetching,
                isError,
                error
            });

            return UserService.getUsers(page, debounceSearch);
            },
        placeholderData: keepPreviousData
    })

        useEffect(() => {
            const timer = setTimeout(() => {
                setDebounceSearch(search)
            }, 5000)

            return () => clearTimeout(timer)
        }, [search])

      if (isLoading) {
            return <div>Loading Users...</div>;
        }

        if (isError) {
            return <div>Failed to load the Users: {error.message}</div>;
        }

        const NextPage = () => {
            setPage(prev => prev + 1)
        }

        const PrevPage = () => {
            setPage(prev => prev - 1)
        }
        const totalPages = Math.ceil(data.total/data.pageSize)

        return(
            <div>
                <h1>Users</h1>
                {isFetching && <div>Refreshing...</div>}
                <input 
                    placeholder="Search User"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {data.users?.map(item => (
                    <div key={item.id}>
                        <div>{item.name}</div>
                        <div>{item.email}</div>
                        <div>{item.role}</div>
                        <div>{item.status}</div>
                    </div>
                ))}
                <button onClick={NextPage} disabled={totalPages === page}>Next</button>
                <button onClick={PrevPage} disabled={page === 1} >Prev</button>
            </div>
        )
}

export default Users