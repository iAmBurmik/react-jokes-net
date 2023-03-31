import React, { useEffect } from "react";
import { Route, Routes, useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Comments from "../components/comments/Comments"
import HighlightedJoke from "../components/jokes/HighlightedJoke";
import Loader from "../components/UI/Loader";
import useHttp from "../hooks/use-http";
import { getJoke } from "../utils/firebase-api";


const JokeDetails = () => {
    const params = useParams();
    const location = useLocation();
    const {sendHttpRequest, data: joke, error, status} = useHttp(getJoke, true);

    useEffect(() => {
        sendHttpRequest(params.jokeId);
    }, [sendHttpRequest, params.jokeId]);
    // const joke = JOKES_LIST.find((joke) => joke.id === params.jokeId);

    if(status === 'pending') {
        return <div className="centered">
            <Loader/>
        </div>
    }

    if(error) {
        return <p className="centered">{error}</p>
    }

    if(!joke.text) {
        return <h1 className="centered">Joke not found</h1>
    }

    return (
        <React.Fragment>
            <HighlightedJoke text={joke.text} topic={joke.topic}/>
            <Routes> 
                <Route path={'/'} exact element={<div className="centered">
                    <Link className="btn--empty" to={`${location.pathname}/comments`}>Show Comments</Link>
                </div>} />
                <Route path={"/comments"} element={<Comments/>}/>
            </Routes>
        </React.Fragment>
    )

}

export default JokeDetails;