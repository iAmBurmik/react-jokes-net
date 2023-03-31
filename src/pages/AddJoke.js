import JokeForm from "../components/jokes/JokeForm";
import { useNavigate } from "react-router";
import useHttp from "../hooks/use-http";
import { addJoke } from "../utils/firebase-api";
import { useEffect } from "react";

const AddJoke = () => {
    const navigate = useNavigate();
    const {sendHttpRequest, status} = useHttp(addJoke);

    useEffect(() => {
        if(status === 'completed') {
            navigate("/jokes");
        }
    }, [status, navigate])

    const addJokeHandler = (jokeData) => {
        sendHttpRequest(jokeData);
    }

    return <JokeForm isLoading={status === 'pending'} onAddJoke={addJokeHandler}/>
}

export default AddJoke;