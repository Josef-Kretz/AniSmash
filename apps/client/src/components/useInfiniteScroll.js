import {useState, useEffect} from 'react'

function debounce(fn, ms) {
    let timer;
    return _ => {
      clearTimeout(timer);
      timer = setTimeout(_ => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false)
    useEffect(() => {
        const debouncedHandleScroll = debounce( () => {
            handleScroll()
        }, 100) //debounces by 100ms
        window.addEventListener('scroll', debouncedHandleScroll)
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