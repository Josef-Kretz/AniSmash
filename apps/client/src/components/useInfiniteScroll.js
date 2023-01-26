import {useState, useEffect} from 'react'

const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false)
    useEffect(() => {
        //debounce scroll listener afterwards
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if(!isFetching) return

        callback()
    }, [isFetching])

    function handleScroll() {
        //look at location detection over this hack
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return

        setIsFetching(true)
    }

    return [isFetching, setIsFetching]
}

export default useInfiniteScroll